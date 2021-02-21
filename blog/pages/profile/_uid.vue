<template>
  <div id="profile">
    <v-sheet class="pa-3 d-flex">
      <v-sheet width="200" class="rounded-lg mr-5" elevation="2">
        <v-img min-height="176" class="rounded-lg" :src="profileEdit.avatar">
          <div class="edit-img" v-if="isEditing" @click="uploadImg">
            <v-icon color="white" x-large>mdi-image-edit</v-icon>
          </div>
        </v-img>
      </v-sheet>
      <v-sheet class="d-flex flex-column" max-height="200" width="100%">
        <div class="text-h5 d-flex align-center">
          <p>{{ profile.username }}</p>
          <div class="d-flex align-center flex-grow-1" v-if="isUserSelf">
            <p class="text-caption ml-5">{{ profile.email }}</p>
            <v-spacer></v-spacer>
            <v-btn class="mb-4" v-show="!isEditing" @click="isEditing = true"
              >编辑</v-btn
            >
            <v-btn class="mb-4 mr-2" v-show="isEditing" @click="save"
              >保存</v-btn
            >
            <v-btn class="mb-4" v-show="isEditing" @click="close">取消</v-btn>
          </div>
        </div>
        <v-subheader class="flex-grow-1" v-if="!isEditing">
          {{ profile.bio }}
        </v-subheader>
        <v-textarea
          counter=""
          rows="2"
          v-if="isEditing"
          v-model="profileEdit.bio"
        ></v-textarea>
        <v-row class="flex-grow-0">
          <v-spacer></v-spacer>
          <div class="d-flex">
            <v-sheet
              class="text-center mx-3"
              v-for="subInfo in subInfos"
              :key="subInfo.title"
            >
              <p class="text-caption mb-0 grey--text">{{ subInfo.title }}</p>
              <p class="text-subtitle-2 mb-0">{{ subInfo.count }}</p>
            </v-sheet>
          </div>
        </v-row>
      </v-sheet>
    </v-sheet>
    <v-divider></v-divider>
    <v-snackbar centered v-model="isUpdate" timeout="3000"
      ><v-icon color="green">mdi-check</v-icon> 更新成功</v-snackbar
    >
    <v-snackbar centered v-model="isUpdateError" timeout="3000"
      ><v-icon color="red">mdi-alert-circle</v-icon> 更新失败</v-snackbar
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { setToken, uploadAliOSS } from '@/common/script/common.ts'
import OSS from 'ali-oss'

@Component({})
export default class profile extends Vue {
  profile: any = null
  profileEdit: any = null
  subInfos: Object[] = [
    { title: '粉丝数', count: this.profile ? this.profile.followersCount : 0 },
    { title: '关注数', count: this.profile ? this.profile.followeeCount : 0 },
    { title: '内容数', count: this.profile ? this.profile.articlesCount : 0 },
    {
      title: '阅读数',
      count: this.profile ? this.profile.articlesViewCount : 0,
    },
  ]
  isEditing = false
  isUpdate = false
  isUpdateError = false
  imgFile: File | null = null

  async asyncData({ params, $axios }: any) {
    const { profile } = await $axios.$get(`profiles/${params.uid}`)
    return {
      profile: profile,
      profileEdit: JSON.parse(JSON.stringify(profile)),
    }
  }

  get isUserSelf() {
    let userInfo: userInfo = this.$store.state.userInfo
    if (userInfo.uid === this.profile.uid) {
      return true
    }
    return false
  }

  async save() {
    if (this.profile.avatar !== this.profileEdit.avatar) {
      const { res, client } = await uploadAliOSS(this.imgFile, this.$axios)
      let deleteName = this.profile.avatar.replace(
        process.env.aliOSS_baseUrl,
        ''
      )
      const { res: re } = await client.processObjectSave(
        res.name,
        res.name,
        'image/resize,m_fill,w_200,h_200',
        'andspark'
      )
      const avatar = re.requestUrls[0]
      this.profileEdit.avatar = avatar
      client.delete(deleteName)
    }

    const updateUser = {
      email: this.profileEdit.email,
      avatar: this.profileEdit.avatar,
      bio: this.profileEdit.bio,
    }
    try {
      const { data } = await this.$axios.put('/user', { user: updateUser })
      this.profile = data.user
      this.$store.commit('updateUserInfo', this.profile)
      setToken(data.token.token, data.token.expires, this.$axios)
      this.isEditing = false
      this.isUpdate = true
    } catch (error) {
      this.isUpdateError = true
    }
  }
  close() {
    this.profileEdit = this.profile
    this.isEditing = false
  }

  async uploadImg() {
    let input = document.createElement('input')
    let reader = new FileReader()
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e: any) => {
      let file = e.path[0].files[0]
      this.imgFile = file
      if (!/image\/\w+/.test(file.type)) {
        alert('上传的文件必须为图片')
        return false
      }
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        this.profileEdit.avatar = e.target?.result
      }
    }

    input.click()
  }
}
</script>

<style lang="scss" scoped>
.edit-img {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: rgba(51, 51, 51, 0.7);
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    top: 1rem;
    left: 1rem;
    bottom: 1rem;
    right: 1rem;
    border: 1px solid #fff;
    border-radius: 0.5rem;
  }
}
</style>
