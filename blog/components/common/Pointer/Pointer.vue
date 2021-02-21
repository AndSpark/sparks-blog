<template>
  <div id="Pointer"></div>
</template>

<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
@Component({})
export default class Pointer extends Vue {
  type1 =
    'url(https://andspark.oss-cn-hangzhou.aliyuncs.com/cursor1.png), auto '
  type2 =
    'url(https://andspark.oss-cn-hangzhou.aliyuncs.com/cursor2.png), auto '
  tagsList = []

  get path() {
    return this.$route.path
  }

  get userInfo() {
    return this.$store.state.userInfo
  }

  @Watch('path')
  addPointerM() {
    setTimeout(() => {
      this.addPointer()
    }, 500)
  }
  @Watch('userInfo', { deep: true })
  addPointerM() {
    setTimeout(() => {
      this.addPointer()
    }, 500)
  }

  addPointer() {
    let btns = document.getElementsByTagName('button')
    let as = document.getElementsByTagName('a')
    let btns2 = document.querySelectorAll('[role="button"]')
    let menu = document.querySelectorAll('[role="menuitem"]')
    let list = document.querySelectorAll('[role="listitem"]')
    let tags = [...btns, ...as, ...btns2, ...menu, ...list]
    tags.map((tag) => {
      this.addNodePointer(tag)
    })
  }
  addNodePointer(node) {
    node.style.cursor = this.type1
    node.addEventListener('mousedown', (e) => {
      if (e.which == 2) {
        e.preventDefault()
      }
      node.style.cursor = this.type2
    })
    node.addEventListener('mouseup', (e) => {
      node.style.cursor = this.type1
    })
  }
  mounted() {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
    this.addNodePointer(document.body)
    tsetTimeout(() => {
      this.addPointer()
    }, 500)
  }
}
</script>

<style lang="scss">
body {
  cursor: url(https://andspark.oss-cn-hangzhou.aliyuncs.com/cursor1.png), auto;
}

#__nuxt {
  [role='listitem'],
  [role='button'],
  [role='menuitem'],
  button,
  a {
    cursor: url(https://andspark.oss-cn-hangzhou.aliyuncs.com/cursor1.png), auto;
  }
}
</style>
