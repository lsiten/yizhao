<template>
  <div style="height:100%;">
    <vue-html5-editor :content="content" :height="400"  
                          @change="updateData"></vue-html5-editor> 
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home-index',
  computed: {
    ...mapGetters({})
  },
  created () {
    this.$store.dispatch('bottom_set_show', false)
  },
  watch: {
  },
  data () {
    return {
      content: '请输入内容'
    }
  },
  methods: {
    updateData (e) {
      this.content = e
      console.info(e)
    }
  },
  mounted () {
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

