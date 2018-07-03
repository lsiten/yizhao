<template>
  <div style="height:100%;">
    <x-input title="标题" v-model="articeTitle" placeholder="请输入文章标题"></x-input>
    <x-input title="作者" v-model="articeAuthor" placeholder="请输入您的名字/笔名"></x-input>
    <x-input title="微信号" v-model="articeWx" placeholder="请输入您的微信号"></x-input>
    <div class="input-title">文章内容：</div>
    <editor :content = 'content' @editorChange = 'editorChange' :placeholder="placeholder"></editor>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import editor from '../../components/com/editor'
import { XInput, Group, Cell } from 'vux'
export default {
  name: 'Home-index',
  computed: {
    ...mapGetters({})
  },
  components: {
    editor,
    XInput,
    Group,
    Cell
  },
  created () {
    this.$store.dispatch('bottom_set_show', false)
    this.$store.dispatch('bottom_set_type', 'submit-artice')
  },
  watch: {
    articeTitle () {
      this.$store.dispatch('home_set_title', this.articeTitle)
    },
    articeAuthor () {
      this.$store.dispatch('home_set_author', this.articeAuthor)
    },
    articeWx () {
      this.$store.dispatch('home_set_wx', this.articeWx)
    }
  },
  data () {
    return {
      content: '请输入内容',
      placeholder: '请输入内容',
      articeTitle: '',
      articeAuthor: '',
      articeWx: ''
    }
  },
  methods: {
    editorChange (content) {
      this.$store.dispatch('home_set_content', content)
    }
  }
}
</script>
<style>
.no-margin-top .weui-cells__title{
  margin-top: 5px;
}
.cate-active {
  background: rgb(251, 249, 254);
}
.no-data-tips {
  text-align: center;
  font-size: 12px;
  color: #b7b7b7;
  padding: 10px 0;
}
.input-title {
  padding-left: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f5e8e8;
  border-top: 1px solid #f5e8e8;
}
</style>

