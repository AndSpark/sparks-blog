<template>
  <div id="ArticleCard">
    <v-card elevation="4" outlined  class="my-5">
      <v-sheet class="d-flex ">
        <v-sheet >
          <v-card-title>{{ title }}</v-card-title>
          <v-card-subtitle>{{ author }}</v-card-subtitle>
          <v-card-text>{{ description }}</v-card-text>
          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text> 查看 </v-btn>
          </v-card-actions>
        </v-sheet>
        <v-spacer></v-spacer>
            <v-sheet  >
              <v-img :src="cover" class="rounded-lg ma-4" height="150"   eager ></v-img>
            </v-sheet>
        </v-sheet>
      
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({})
export default class ArticleCard extends Vue {
  @Prop(String)
  title!: string
  @Prop(String)
  author!: string
  @Prop(String)
  description!: string
  @Prop(String)
  cover!: string
}
</script>

<style lang="scss"></style>
