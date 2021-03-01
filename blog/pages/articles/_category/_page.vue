<template>
<div id='Article'>
  <v-tabs  background-color="gary"
      color="#356859" 
      >
    <v-tab  v-for="tab in categoryList" :key="tab.title" :to="tab.link" nuxt>{{tab.title}}</v-tab>
  </v-tabs>
  <v-divider></v-divider>
  <v-row>
    <v-col cols="12" xl="6" v-for="(article,i) in articleList" :key="i">
      <article-card  :title="article.title" :author="article.author.username" :description="article.description" :cover="article.cover"></article-card>
    </v-col>
  </v-row>
  
</div>
</template>

<script lang='ts'>
import { Vue, Component } from 'nuxt-property-decorator'
import ArticleCard from '~/components/article/ArticleCard.vue'
interface FindFeedQuery {
  limit?: number;
  offset?: number;
  category?: string;
}
@Component({
  components:{ArticleCard}
})
export default class Article extends Vue {
  categoryLink = ''
  currentPage = 1
  totalPage = 0
  limit = 5
  categoryList = [{
    title:'技术',
    link:'/articles/technology/1'
  },{title:'娱乐',link:'/articles/amusement/1'}]
  articleList = []
  articlesCount = 0
  async asyncData({params,$axios}:any){
    let findFeedQuery:FindFeedQuery = {
      limit:5,
      offset:params.page,
      category:params.category
    }
    let {data} = await $axios.get(`articles`,{
      params:findFeedQuery
    })
    return {
      findFeedQuery,
      articleList:data.articles,
      articlesCount:data.articlesCount
    }
  }

  get currentCategory(){
    let category;
    this.categoryLink == 'technology' ? category = '技术' : 0
    this.categoryLink == 'amusement' ? category = '娱乐' : 0
    return category
  }

}
</script>

<style lang='scss'>

</style>