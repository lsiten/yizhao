<template>
  <div style="height:100%;">
    <editor :content = 'content' :placeholder="placeholder"></editor>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import editor from '../../components/com/editor'
export default {
  name: 'Home-index',
  computed: {
    ...mapGetters({})
  },
  components: {
    editor
  },
  created () {
    this.$store.dispatch('bottom_set_show', false)
  },
  watch: {
  },
  data () {
    return {
      content: '请输入内容',
      placeholder: '请输入内容'
    }
  },
  methods: {
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
</style>

