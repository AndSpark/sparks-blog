<template>
<div id='ImageUpload'>
  <v-sheet :width="width" class="rounded-lg mr-5" elevation="2">
    <v-img  class="rounded-lg" :src="imageSrc">
      <div class="edit-img" v-if="isEditing" @click="changeImg">
        <v-icon color="white" x-large>mdi-image-edit</v-icon>
      </div>
    </v-img>
  </v-sheet>
</div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import {  uploadAliOSS } from '@/common/script/common.ts'

@Component({})
export default class ImageUpload extends Vue {
  imageFile : null | File = null

  @Prop({ type: String, default: '200'})
  width!:string
  @Prop({ type: String, default: 'https://picsum.photos/200'})
  imageSrc!:string
  @Prop({type: Boolean, default: false})
  isEditing!:Boolean

  changeImg() {
    let input = document.createElement('input')
    let reader = new FileReader()
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e: any) => {
      let file = e.path[0].files[0]
      this.imageFile = file
      if (!/image\/\w+/.test(file.type)) {
        alert('上传的文件必须为图片')
        return false
      }
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        this.$emit('update:imageSrc',e.target?.result)
      }
    }
    input.click()
  }

  async uploadImg(){
      if(!this.imageFile) return this.imageSrc
      const { res, client } = await uploadAliOSS(this.imageFile, this.$axios)
      const { res: re } = await client.processObjectSave(
        res.name,
        res.name,
        'image/resize,m_fill,w_200,h_200',
        'andspark'
      )
      return re.requestUrls[0]
  }
}
</script>

<style lang='scss' scoped>
.edit-img {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: rgba(51, 51, 51, 0.3);
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