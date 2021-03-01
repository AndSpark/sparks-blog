<template>
  <div id="SideMenu">
    <v-sheet rounded="lg" elevation="1">
      <v-list color="transparent">
        <v-sheet class="px-5">
          <v-sheet
            max-width="200"
            max-height="200"
            class="rounded-circle mx-auto my-5"
            elevation="2"
          >
            <v-img class="rounded-circle" :src="avatar"> </v-img>
          </v-sheet>
        </v-sheet>

        <v-list-item
          :to="isLogin ? `/profile/${userInfo.uid}` : '/'"
          link
          color="white"
        >
          <v-subheader class="mx-auto">
            {{ username }}
          </v-subheader>
        </v-list-item>

        <v-divider class="my-2" v-if="isLogin"></v-divider>
        <v-list-item
          class="pl-8"
          link
          v-for="link in links"
          :key="link.title"
          :to="link.to"
          v-show="!link.show"
        >
          <v-list-item-icon>
            <v-icon v-text="link.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="my-2" v-if="!isLogin"></v-divider>

        <v-list-item
          color="grey lighten-4"
          @click="$emit('update:isShowLoginForm', true)"
          v-if="!isLogin"
        >
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>登录</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          color="grey lighten-4"
          @click="$emit('update:isShowRegisterForm', true)"
          v-if="!isLogin"
        >
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>注册</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
@Component({})
export default class SideMenu extends Vue {
  links = [
    { title: '大厅', icon: 'mdi-home-outline', to: '/' },
    { title: '帖子', icon: 'mdi-text', to: '/articles' },
    { title: '应用', icon: 'mdi-application', to: '/application' },
    {
      title: '分享',
      icon: 'mdi-circle-edit-outline',
      to: '/articleEdit',
      show: false,
    },
    {
      title: '我的',
      icon: 'mdi-account-outline',
      to: '/profile/1',
      show: false,
    },
  ]

  @Prop({ type: Boolean, default: false })
  isShowLoginForm!: boolean
  @Prop({ type: Boolean, default: false })
  isShowRegisterForm!: boolean
  @Prop({ type: Boolean, default: false })
  isLogin!: boolean

  get userInfo(): userInfo {
    return this.$store.state.userInfo
  }

  get username() {
    return this.isLogin ? this.userInfo.username : '请登录'
  }

  get avatar() {
    return this.isLogin ? this.userInfo.avatar : 'https://picsum.photos/200'
  }

  @Watch('userInfo', { deep: true, immediate: true })
  profileLinkChange() {
    if (this.isLogin) {
      this.links[3].show = false
      this.links[4].show = false
      this.links[4].to = `/profile/${this.userInfo.uid}`
    } else {
      this.links[3].show = true
      this.links[4].show = true
    }
  }
}
</script>

<style lang="scss"></style>
