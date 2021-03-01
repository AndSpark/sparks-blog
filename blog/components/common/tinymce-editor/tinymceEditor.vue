<template>
  <client-only>
    
    <editor id="tinymce" v-model="contents" :init="init"></editor>
  </client-only>
</template>

<script>
import editor from '@tinymce/tinymce-vue'
import { uploadAliOSS } from '@/common/script/common.ts'

let tinymce
// 在客户端环境下引入
if (process.client) {
  tinymce = require('tinymce/tinymce')
  require('tinymce/themes/silver')
  require('tinymce/icons/default')
  require('tinymce/plugins/image') // 插入上传图片插件
  require('tinymce/plugins/media') // 插入视频插件
  require('tinymce/plugins/table') // 插入表格插件
  require('tinymce/plugins/lists') // 列表插件
  require('tinymce/plugins/link') //超链接插件
  require('tinymce/plugins/wordcount') // 字数统计插件
  require('tinymce/plugins/emoticons') // 插入表情插件
  require('tinymce/plugins/fullscreen')
  require('tinymce/plugins/code')
  require('tinymce/plugins/paste')
  require('tinymce/plugins/advlist')
  require('tinymce/plugins/autolink')
  require('tinymce/plugins/autosave')
  require('tinymce/plugins/codesample')
  require('tinymce/plugins/colorpicker')
  require('tinymce/plugins/contextmenu')
  require('tinymce/plugins/directionality')
  require('tinymce/plugins/nonbreaking')
  require('tinymce/plugins/insertdatetime')
  require('tinymce/plugins/preview')
  require('tinymce/plugins/print')
  require('tinymce/plugins/save')
  require('tinymce/plugins/searchreplace')
  require('tinymce/plugins/spellchecker')
  require('tinymce/plugins/tabfocus')
  require('tinymce/plugins/table')
  require('tinymce/plugins/template')
  require('tinymce/plugins/textcolor')
  require('tinymce/plugins/visualblocks')
  require('tinymce/plugins/textpattern')
  require('tinymce/plugins/visualchars')
  require('tinymce/plugins/wordcount')
  require('tinymce/plugins/anchor')
  require('tinymce/plugins/hr')
  require('tinymce/plugins/link')
  require('tinymce/plugins/noneditable')
  require('tinymce/plugins/pagebreak')
}

export default {
  name: 'tinymce-editor',
  components: { editor },
  // 接收引用此组件的值
  props: ['modifyContent'],
  data() {
    return {
      //初始化配置
      init: {
        language_url: '/tinymce/langs/zh_CN.js', // 语言包的路径
        language: 'zh_CN', //语言
        skin_url: '/tinymce/skins/ui/oxide', // skin路径
        height: 500, //编辑器高度
        branding: false, //是否禁用“Powered by TinyMCE”
        menubar: true, //顶部菜单栏显示
        object_resizing: false, // 是否禁用表格图片大小调整
        autosave_ask_before_unload: false, // 去除关闭/刷新网页时弹出对话框
        plugins: 'lists image media table wordcount',
        toolbar:
          'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat',
        body_class: 'panel-body ',
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        // 自定义字体集
        theme_advanced_fonts:
          '宋体=宋体;微软雅黑=微软雅黑;新宋体=新宋体;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n',
        // 自定义字号
        fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
        content_css: '/tinymce/skins/content/default/content.css',
        paste_data_images: true, // 允许粘贴图像
        // 自定义字体
        font_formats: `
            微软雅黑=微软雅黑;
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;
            隶书=隶书;
            幼圆=幼圆;
            思源黑体CN=思源黑体CN;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,
            sans-serif;
            Arial Black=arial black, avant garde;
            Book Antiqua=book antiqua,palatino;
            Comic Sans MS=comic sans ms,sans-serif;
            Courier New=courier new,courier;
            Georgia=georgia,palatino;
            Helvetica=helvetica;
            Impact=impact,chicago;
            Symbol=symbol;
            Tahoma=tahoma,arial,helvetica,sans-serif;
            Terminal=terminal,monaco;
            Times New Roman=times new roman,times;
            Trebuchet MS=trebuchet ms,geneva;
            Verdana=verdana,geneva;
            Webdings=webdings;
            Wingdings=wingdings,zapf dingbats`,
        content_style: `
            *                         { padding:0; margin:0; }
            html, body                { height:100%; }
            img                       { max-width:100%; display:block;height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; font-size: 16px; font-family:微软雅黑}
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
            ul,ol                     { list-style-position:inside; }
            body, td, pre {
            font-family: Verdana, Arial, Helvetica, sans-serif;
            font-size: 12px;
}
          `,
        style_formats: [
          {
            title: '首行缩进',
            block: 'p',
            styles: { 'text-indent': '2em' },
          },
          {
            title: '行高',
            items: [
              { title: '1', styles: { 'line-height': '1' }, inline: 'span' },
              {
                title: '1.5',
                styles: { 'line-height': '1.5' },
                inline: 'span',
              },
              { title: '2', styles: { 'line-height': '2' }, inline: 'span' },
              {
                title: '2.5',
                styles: { 'line-height': '2.5' },
                inline: 'span',
              },
              { title: '3', styles: { 'line-height': '3' }, inline: 'span' },
            ],
          },
        ],
        default_link_target: '_blank',
        link_title: false,
        convert_urls: false, // 图片上传路径为绝对路径
        remove_script_host: false,
        paste_word_valid_elements: '*[*]',
        paste_convert_word_fake_lists: false,
        paste_webkit_styles: 'all',
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,
        forced_root_block: 'p',
        force_p_newlines: true,
        importcss_append: true,
        tabfocus_elements: ':prev,:next',
        // 本地图片上传配置
        images_upload_handler: async (blobInfo, success, failure) => {
          try {
            const { url } = await uploadAliOSS(blobInfo.blob(), this.$axios)
            console.log(url)
            success(url)
          } catch (error) {
            failure('上传失败')
          }
          // let params = new FormData()
          // params.append('image', blobInfo.blob())
          // this.$axios
          //   .post('/upload_image?random=' + Math.random(), params)
          //   .then((res) => {
          //     if (res.data.code == 0) {
          //       success(this.imageHost + res.data.data)
          //     } else {
          //       failure('上传失败')
          //     }
          //   })
          //   .catch(() => {
          //     failure('上传失败')
          //   })
        },
        setup: (editor) => {
          // 监听编辑器失焦事件
          var _this = this
          editor.on('blur', function () {
            _this.$emit('saveDraft')
          })
        },
      },
      // 绑定的内容
      contents: this.modifyContent,
      tinymce:null,
      text:null
    }
  },
  mounted() {
    // 用process.client判断一下环境再执行
    this.$nextTick(() => {
      if (process.client) {
        window.tinymce.init({})
        this.tinymce  = document.getElementById('tinymce_ifr').contentWindow.document.getElementById('tinymce')
      }
    })
  },
  watch: {
    modifyContent(newValue) {
      this.contents = newValue
    },
    contents(newValue) {
      this.text = this.tinymce.innerText
      this.$emit('writeContent', {body:newValue,text:this.text})
    },
  },
}
</script>
