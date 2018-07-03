<template>
  <div style="padding-top: 46px">
    <l-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;"></l-header>
    <msg :title="title" :description="description" :icon="icon"></msg>
    <div class="contact">
      <h3>联系我们：</h3>
      <div class="title"><span>微信：</span> <img src = '../assets/wx.jpg' /></div>
      <div class="phone"><span>电话：</span><span>18565884671</span></div>
    </div>
  </div>
</template>
<script>
import lHeader from '../components/com/header'
import { Msg } from 'vux'
export default {
  name: 'error',
  components: {
    'l-header': lHeader,
    Msg
  },
  created () {
    this.$store.dispatch('header_set_show_center', false)
    let params = this.$route.query
    params.errorMsg && (this.title = params.errorMsg)
  },
  data () {
    return {
      description: '如果我们采用您的文章，将通过微信联系您，并向您支付稿费！',
      title: '投稿成功',
      icon: 'success'
    }
  }
}
</script>
<style scoped>
  .contact {
    padding:  10px;
  }
  .contact h3 {
    font-size: 16px;
    border-top: 1px solid #f2e7e7;
    border-bottom: 1px solid #f2e7e7;
    padding: 5px;
  }

  .contact img{
    width: 200px;
    height: auto;
    margin-left: 0;
    float: left;    
  }

  .contact .title{
    padding: 10px;
    overflow: hidden;
  }

  .contact .title span{
    line-height: 200px;
    height: 200px;
    float: left;
  }

  .contact .phone {
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    border-top: 1px solid #f2e7e7;    
    border-bottom: 1px solid #f2e7e7;
  }
</style>

