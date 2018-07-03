<template>
  <div>
    <div v-show="showBottom" class="com-bottom">
      <div class="shopping-basket">
        <div class="shopping-basket-blue">
          <badge v-show="showBadge" :text="totalNum" class="total-badge"></badge>
          <svg class="icon" aria-hidden="true" @click="showBasketDetail">
              <use xlink:href="#xxn-ai66"></use>
          </svg>
        </div>
      </div>
      <div class="food-price">
        ￥<span>{{foodPrice}}</span>
      </div>

      <div class="right-content" v-show="!showSubmit">
        <p>还差￥<span>{{minPrice}}</span>可以买单</p>
      </div>

      <div class="right-content" v-show="showSubmit">
        <div class="submit-button" @click="submitOrder">
          结算
        </div>
      </div>
      <!-- 购物篮详情 -->
      <div v-transfer-dom>
        <popup v-model="showDetail" position="bottom" max-height="100%" :popup-style="{'bottom': '46px', 'z-index': 10}">
          <div class="food-detail-content">
            <div class="food-detail-header-box">
              <span>已选商品</span>
              <span class="clear-food" @click="clearFood">
                <svg class="icon" aria-hidden="true" @click="showBasketDetail">
                  <use xlink:href="#xxn-lajitong"></use>
              </svg>清空
              </span>
            </div>
            <div class="food-detail-header-food-item">
              <group>
                <x-number :min='0' v-for="(item, index) in foodsTemp" @on-change="change(item)" v-bind:key="index" :title="item.name" v-model="item.num"></x-number>
              </group>
            </div>
          </div>
        </popup>
      </div>
    </div>
    <div v-show="!showBottom">
      <div v-show="bottomType === 'submit'">
        <div :class="'bottom_' + bottomType">
          <div class="food-price margin-left-15">
            ￥<span>{{foodPrice}}</span>
          </div>
          <div class="right-content">
            <div class="submit-button-order" @click="submitOrderCommit">
              下单
            </div>
          </div>
        </div>
      </div>
      <div v-show="bottomType === 'submit-artice'">
        <div v-transfer-dom>
          <popup v-model="showAgreement" height="80%">
            <div class="close" @click="closeWindow">
              X关闭
            </div>
            <div class="popup1">
              <h3>一昭文化传播有限公司投稿协议</h3>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'一个南宁'是一昭文化传播有限公司旗下专注南宁本地资讯的服务平台。涵盖南宁人生活的各个方面，如美食，出行，旅游以及南宁生活的各种攻略。</p>
              <h4>一：投稿约定</h4>
              <p>1、投稿作品内容须符合国家法律法规，不违背善良风俗，同时与任何宗教及民族、种族信仰不相冲突；作品需与南宁生活等内容相关，文章中不得存在广告信息和负面消息。</p>
              <p>2、甲方对投稿作品内容的真实性、合法性、准确性负责，保证其拥有可以在一个南宁发表该投稿作品的权利，并保证不侵犯任何第三方的著作权，否则，因甲方侵权行为产生的法律责任由甲方自行承担；若给乙方造成损失，乙方有权追究甲方的赔偿责任。</p>
              <p>3、乙方无法对甲方是否拥有投稿作品著作权的真实性或投稿作品是否侵犯他人著作权可能性进行实质性审查，对剽窃、抄袭、无权发表作品等侵犯著作权行为的发生不具备充分的监控能力。但是一经发现或者接到著作权人投诉申请并经证实投稿作品确实存在侵权行为的，小昭将立即删除侵权作品以阻止其继续传播。 小昭采取上述措施后不为此向甲方承担违约责任或其他法律责任，包括不承担因侵权指控不成立而给甲方带来损害的赔偿责任</p>
              <p>4、 小昭尊重作者观点和论述的完整性，但对所有投稿作品保留必要的编辑权和谨慎的删改权。若不同意删改，请事先特别声明。小昭对投稿文章的修改将与甲方共同协商取得一致意见。</p>
              <p>5、 投稿文章必须为原创、首发。（注：【原创】即文章中70%的文字都是作者自己编写，互联网不存在内容一致的文章。）</p>
              <p>6、 甲方联系方式如有变更，应及时通知小昭以便小昭对所发布的信息进行更新修改。</p>
              <p>7、 小昭会尽快处理投稿作品，若在乙方收到甲方作品6个工作日之内乙方未予发表投稿作品或未给甲方发送任何通知的情况下，甲方可自行处理投稿作品。无论采用与否，来稿概不退还，甲方需自行留存原稿。</p>
              <h4>二：权属约定</h4>
              <p>1、 一旦甲方投稿作品被乙方采纳，乙方即取得该投稿作品的永久性的、独家的使用权，甲方不得将投稿作品再次投给其他网络服务提供商。</p>
              <p>2、 经乙方采纳的投稿作品，乙方只需向甲方支付投稿作品发布24小时之内依据乙方的标准所计算出的稿费，除此之外，乙方无需再向甲方支付任何费用。</p>
              <h4>三：审稿标准</h4>
              <p>1、投稿作品主题必须十分明确，内容充实，切忌泛而大。主题可以是美食，旅游，政府政策等领域的重要理论或是新的研究发现，理论与实践相结合的文章将被优先考虑。</p>
              <p>2、投稿作品须题材新颖，有一定的创新成分。</p>
              <p>3、观点突出，或带真情实意，思想深刻。</p>
              <h4>四：稿费及其支付方式</h4>
              <p>1、小昭微信订阅号及APP平台文章稿费根据文章当日阅读量和转发次数而定，标准如下：</p>
              <p>1）文章当日阅读量≤5W，赠送小礼品。</p>
              <p>2）文章当日阅读量在5~10W，稿费为300元。</p>
              <p>3）文章当日阅读量≥10W且转发人数＜1K，稿费为400元。</p>
              <p>4）文章当日阅读量≥10W且转发人数≥1K，稿费为500元。</p>
              <p>注：<br/>阅读量确定：文章发布24小时之内，根据前端的阅读次数截图而定。 <br/>转发人数确定：文章发布当天后端的转发人数截图而定。</p>
              <p>2、 每月5号前甲乙双方对上个月发表文章数及稿费进行确认，确认无误之后，乙方将在每月16日前向甲方支付相应稿费。</p>
              <p>3、 劳务所得需要缴纳个人所得税的，所得税由甲方个人承担，乙方可按相关规定代扣代缴所得税，甲方需配合提供相关必要证明文件或资料。</p>
              <h4>五：争议解决方式</h4>
              <p>甲乙双方因本协议的履行产生的争议，双方应首先友好协商解决，协商不成的，任何一方有权向原告方所在地的法院提起诉讼。</p>
              <h4>六：其他</h4>
              <p>1、本协议未尽事宜，双方以平等互利原则另行协商并可签署补充协议。补充协议与本协议具有同等法律效力。</p>
              <p>2、提交即视为同意本协议。</p>
            </div>
          </popup>
        </div>
        <div :class="'bottom_' + bottomType">
          <label class="bottom-agreement"><input type="checkbox" v-model="agreeValue"/><span>已经阅读并同意《一昭文化传播投稿协议》</span></label>
          <div class="right-content">
            <div class="submit-button" @click="submitArtice">
              提交
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Tabbar, TabbarItem, Popup, TransferDom, XNumber, Group, Badge } from 'vux'
import { mapGetters } from 'vuex'
export default {
  name: 'com-bottom',
  directives: {
    TransferDom
  },
  components: {
    Tabbar,
    TabbarItem,
    Popup,
    XNumber,
    Group,
    Badge
  },
  watch: {
    totalNum () {
      if (parseInt(this.totalNum) > 0) {
        this.showBadge = true
      } else {
        this.showBadge = false
      }
    },
    agreeValue () {
      this.$store.dispatch('bottom_set_agreement', (this.agreeValue ? 1 : 0))
      if (this.agreeValue) {
        this.showAgreement = true
      }
    }
  },
  created () {
    if (parseInt(this.totalNum) > 0) {
      this.showBadge = true
    } else {
      this.showBadge = false
    }

    this.agreeValue = this.agreement
  },
  computed: {
    ...mapGetters({
      basket: 'bottom_get_shopping_basket',
      deskid: 'com_get_desk_id',
      deskinfo: 'com_get_desk_info',
      notes: 'bottom_get_notes',
      client_id: 'ws_get_client_id',
      totalNum: 'bottom_get_total',
      foodPrice: 'bottom_get_all_price',
      showBottom: 'bottom_get_show_bottom',
      title: 'home_get_title',
      content: 'home_get_content',
      author: 'home_get_author',
      wx: 'home_get_wx',
      bottomType: 'bottom_get_bottom_type',
      agreement: 'bottom_get_bottom_agreement'
    })
  },
  data () {
    return {
      minPrice: 20,
      showSubmit: true,
      showDetail: false,
      value: 0,
      showBadge: false,
      isChangeBasket: false,
      foodsTemp: [],
      agreeValue: 0,
      showAgreement: false
    }
  },
  methods: {
    showBasketDetail () {
      this.showDetail = !this.showDetail
      if (this.showDetail) {
        this._initBasket()
      }
    },
    // 跳转下单页面
    submitOrder () {
      this.$router.push({
        path: 'order'
      })
    },
    // 确认下单
    submitOrderCommit () {
      let deskinfo = {}
      let _this = this
      if (this.deskinfo) {
        deskinfo = JSON.parse(this.deskinfo)
      }
      if (!deskinfo.id) {
        this.$vux.toast.show({
          text: '桌信息有误，请刷新页面或联系管理员！',
          type: 'warn',
          onHide () {
            _this.$router.push({name: 'error'})
          }
        })
      }
      let data = {
        total: this.foodPrice,
        foods: JSON.stringify(this.basket),
        deskid: this.deskid,
        desknum: deskinfo.num,
        client_id: this.client_id,
        notes: this.notes
      }
      this.$store.dispatch('bottom_submit_order', data).then(data => {
        this.$vux.toast.show({
          text: '订单提交成功！',
          type: 'success',
          onHide () {
            _this.$router.push({name: 'orderlist'})
          }
        })
      }).catch(err => {
        if (err === 60004) {
          this.$vux.toast.show({
            text: '该桌有未支付订单，请联系管理员！',
            type: 'warn'
          })
          _this.$router.push({name: 'orderlist'})
        } else {
          this.$vux.toast.show({
            text: err,
            type: 'warn'
          })
        }
      })
    },
    clearFood () {
      this.$store.dispatch('bottom_clear_basket', {
        deskid: this.deskid
      })
    },
    change (food) {
      this.isChangeBasket = true
      this.$store.dispatch('bottom_add_basket', {
        food: food,
        deskid: this.deskid,
        client_id: this.client_id,
        send: true
      }).then(data => {
        this.$store.dispatch('bottom_set_basket_change', true)
        this._initBasket()
      })
    },
    _initBasket () {
      let fTemp = []
      this.basket.map(item => {
        let temp = JSON.parse(JSON.stringify(item))
        if (temp.num > 0) {
          fTemp.push(temp)
        } else {
          this.$store.dispatch('bottom_add_basket', {
            food: temp,
            deskid: this.deskid,
            client_id: this.client_id,
            send: true
          })
        }
      })
      this.foodsTemp = []
      this.$nextTick(() => {
        this.foodsTemp = fTemp
      })
    },
    submitArtice () {
      if (!this.agreeValue) {
        this.$vux.toast.text('请同意投稿协议！')
        return false
      }
      let params = {
        title: this.title,
        content: this.content,
        author: this.author,
        wx: this.wx
      }
      this.$store.dispatch('home_submit_article', params).then(data => {
        let _this = this
        this.$vux.toast.show({
          text: '投稿成功，如果我们采用您的文章，会通过微信支付给您！',
          onHide () {
            _this.$router.push({
              name: 'tips'
            })
          }
        })
      }).catch(err => {
        this.$vux.toast.text(err)
      })
    },
    closeWindow () {
      this.showAgreement = false
    }
  }
}
</script>
<style scoped>
  .com-bottom {
    position: absolute;
    z-index: 11;
    background: rgba(0, 0, 0, .8);
    height: 46px;
    width: 100%;
    bottom: 0;
    left: 0;
    color: #ffffff;
  }
  .bottom_submit {
    position: absolute;
    z-index: 600;
    background: rgba(0, 0, 0, .8);
    height: 46px;
    width: 100%;
    bottom: 0;
    left: 0;
    color: #ffffff;
  }
  .shopping-basket {
    background: #000;
    position: absolute;
    width:  50px;
    height: 50px;
    top: -15px;
    left: 15px;
    border-radius: 50%;
    text-align: center;
  }
  .shopping-basket-blue {
    width:  40px;
    height: 40px;
    margin: 5px;
    border-radius: 50%;
    background: #1261d6;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon {
     width: 1em; height: 1em;
     vertical-align: -0.15em;
     fill: currentColor;
     overflow: hidden;
     font-size: 20px;
  }

  .food-price {
    margin-left: 80px;
    margin-top: 5px;
    display: inline-block;
  }
  .right-content {
    margin-right: 0px;
    float: right;
  }

  .right-content p {
    margin-top: 5px;
    font-size: 12px;
    margin: 5px 10px;
  }

  .submit-button {
    width: 100px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    background:#2cb909;
    cursor: pointer;
  }

  .submit-button-order {
    width: 100px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    background:#bd0b05;
    cursor: pointer;
  }

  .food-detail-content {
    padding-bottom: 15px;
  }

  .food-detail-header-box {
    background: #dfdbdb;
    padding: 5px 10px;
    color: #333;
  }
  .clear-food {
    float: right;
  }

  .food-detail-header-food-item {
    min-height: 100px;
    max-height: 400px;
    overflow-y: scroll;
    overflow-x: hidden;
  }


  .total-badge {
    top: 0;
    right: 0;
    position: absolute;
  }

  .margin-left-15 {
    margin-left: 15px;
  }

  .bottom_submit-artice {
    position: absolute;
    z-index: 600;
    background: rgba(0, 0, 0, .8);
    height: 46px;
    width: 100%;
    bottom: 0;
    left: 0;
    color: #ffffff;
  }
  .bottom-agreement {
    width: 260px;
    display: inline-block;
    font-size: 12px;
    margin-top: 15px;
    padding-left: 5px;
  }
  .bottom-agreement input[type=checkbox] {
    display: inline-block;
    outline: none;
    border: 1px solid #e8e0e0;
    box-shadow: none;
    line-height: 15px;
  }
  .bottom-agreement span {
    display: inline-block;
  }

  .popup1 h3 {
    text-align: center;
    padding: 5px 0;
    font-size: 14px;
    border-bottom: 1px solid #e6dcdc;
  }
  .popup1 h4 {
    font-size: 14px;
    padding: 5px 0;
  }

  .popup1 p {
    text-indent: 2;
    font-size: 12px;
    line-height: 25px;
  }

  .popup1 {
    padding: 0 5px;
    overflow: hidden;
    overflow-y: scroll;
    padding-bottom: 46px;
    position: relative;
  }

  .vux-popup-dialog .close {
    position: fixed;
    right: 10px;
    bottom: 60px;
    display: inline-block;
    background: rgba(0, 0, 0, .8);
    color: #fff;
    padding: 5px 10px;
    z-index: 600;
    border-radius: 5px;
  }
</style>
<style>
  .food-detail-header-food-item .vux-no-group-title {
    margin-top: 0px;
  }
</style>


