<template>
<div id='index'>

</div>
</template>

<script lang='ts'>
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class index extends Vue {
  beforeRouteEnter (to: any, from: any, next: any) {
    // ...
    next('/articles/technology/1')
  }
}
</script>

<style lang='scss'>

</style>