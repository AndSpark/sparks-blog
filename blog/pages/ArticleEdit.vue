<template>
  <div id="Article">
    <v-row>
      <v-col cols="8">
        <v-text-field
          label="文章标题"
          v-model="createArticle.title"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-select
          label="分类"
          :items="category"
          v-model="createArticle.category"
        ></v-select>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="文章描述"
          v-model="createArticle.description"
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="d-flex pb-2 pt-6 flex-wrap">
        <v-subheader>标签：</v-subheader>
        <v-chip
          close
          class="my-2 mr-2"
          v-for="tag in createArticle.tagList"
          :key="tag"
          @click:close="removeTag(tag)"
          >{{ tag }}</v-chip
        >
        <v-btn x-small fab elevation="2" class="ma-2" @click="isAddTag = true"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
        <v-sheet width="200" class="mt-n2 d-flex" v-if="isAddTag">
          <v-text-field v-model="currentTag" label="标签"></v-text-field>
          <v-btn small class="mt-4 ml-1" color="success" @click="addTag"
            >增加</v-btn
          >
          <v-btn small class="mt-4 ml-1" color="error" @click="closeTag"
            >取消</v-btn
          >
        </v-sheet>
      </v-col>
    </v-row>
    <tinymceEditor
      @writeContent="getWriteContent"
      v-if="isShowEdit"
      @saveDraft="saveDraft"
    />
    <v-sheet class="d-flex mt-5 pr-5">
      <v-spacer></v-spacer>
      <v-btn color="success" @click="addArticle">发布</v-btn>
    </v-sheet>
    <v-snackbar v-model="showTagSnackbar" :timeout="2000" centered
      >标签已存在!</v-snackbar
    >
    <v-snackbar v-model="showCreateArticleSuccees" :timeout="2000" centered>
      <v-icon color="success">mdi-check</v-icon>
      文章发布成功！
    </v-snackbar>
    <v-snackbar v-model="showCreateArticleError" :timeout="2000" centered>
      <v-icon color="error">mdi-alert-circle</v-icon>
      文章发布失败！
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import tinymceEditor from '~/components/common/tinymce-editor/tinymceEditor.vue'

@Component({
  components: { tinymceEditor },
})
export default class Article extends Vue {
  isShowEdit = true
  isAddTag = false
  showTagSnackbar = false
  showCreateArticleError = false
  showCreateArticleSuccees = false
  articleContent = ''
  category = ['技术', '娱乐']
  currentTag = ''
  createArticle: CreateArticle = {
    title: '',
    body: '',
    description: '',
    category: '',
    tagList: [],
  }

  getWriteContent(content: string) {
    this.articleContent = content
    this.createArticle.body = content
  }
  removeTag(tag: string) {
    this.createArticle.tagList = this.createArticle.tagList.filter(
      (v) => v !== tag
    )
  }
  async addArticle() {
    try {
      let { data } = await this.$axios.post('articles', {
        article: this.createArticle,
      })
      this.showCreateArticleSuccees = true
      // this.$router.push('/')
    } catch (error) {
      this.showCreateArticleError = true
    }
  }
  addTag() {
    if (this.createArticle.tagList.includes(this.currentTag)) {
      this.showTagSnackbar = true
      this.currentTag = ''
      this.isAddTag = false
      return
    }
    this.createArticle.tagList.push(this.currentTag)
    this.currentTag = ''
    this.isAddTag = false
  }
  closeTag() {
    this.currentTag = ''
    this.isAddTag = false
  }
  saveDraft() {
    console.log('保存草稿')
  }
}
</script>

<style lang="scss"></style>
