<template>
  <div class="com-contentEditor">
    <div id ="contentEditor"></div>
  </div>
</template>
<script>
  import uuid from 'uuid'
  export default {
    name: 'com-contentEditor',
    data () {
      return {
        _imageUploader: null
      }
    },
    props: {
      content: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: '请输入编辑内容'
      }
    },
    methods: {
      _initEditor () {
        let _this = this
        this.editor = new window.Eleditor({
          el: '#contentEditor',
          uploader: function () {
            /* 必须返回一个Promise对象，成功返回url，失败返回错误信息 */
            return new Promise(function (resolve, reject) {
              _this.$store.dispatch('com_get_signature', {name: uuid()}).then(data => {
                _this._imageUploader.on('uploadBeforeSend', function (block, formdata, headers) {
                  formdata.key = data.key
                  formdata.token = data.signature
                })
                _this._imageUploader.upload()
              })
            })
          },
          /* 初始化完成钩子 */
          mounted: function () {
            _this._imageUploader = window.WebUploader.create({
              auto: true,
              server: 'http://up.qiniu.com/',
              /* 按钮类就是[Eleditor-你的自定义按钮id] */
              pick: window.$('.Eleditor-insertImage'),
              duplicate: true,
              resize: false,
              accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
              },
              fileVal: 'file'
            })
            _this._imageUploader.on('uploadSuccess', function (_file, _call) {
              if (_call.error) {
                return window.alert(_call.error)
              }
              /* 保存状态，以便撤销 */
              _this.editor.saveState()
              _this.editor.getEditNode().after(`
                <img src="${_call.key}" style='max-width:100%; height: auto'>
              `)
              _this.editor.hideEditorControllerLayer()
            })
            /* 以下是扩展插入视频的演示 */
            _this._videoUploader = window.WebUploader.create({
              auto: true,
              server: 'http://up.qiniu.com/',
              /* 按钮类就是[Eleditor-你的自定义按钮id] */
              pick: window.$('.Eleditor-insertVideo'),
              duplicate: true,
              resize: false,
              accept: {
                title: 'Images',
                extensions: 'mp4',
                mimeTypes: 'video/mp4'
              },
              fileVal: 'file'
            })
            _this._videoUploader.on('uploadSuccess', function (_file, _call) {
              if (parseInt(_call.status) === 0) {
                return window.alert(_call.msg)
              }
              /* 保存状态，以便撤销 */
              _this.editor.saveState()
              _this.editor.getEditNode().after(`
                <div class='Eleditor-video-area'>
                  <video src="${_call.url}" controls="controls"></video>
                </div>
              `)
              _this.editor.hideEditorControllerLayer()
            })
          },
          changer: function () {
            // _this.content = val
            let content = _this.editor.getContent()
            _this.$emit('editorChange', content)
          },
          /* 自定义按钮的例子 */
          toolbars: [
            'insertText',
            'editText',
            'insertImage',
            'insertLink',
            'insertHr',
            'delete',
            // 自定义一个视频按钮
            {
              id: 'insertVideo',
              // tag: 'p,img', //指定P标签操作，可不填
              name: '插入视频',
              handle: function (select, controll) {
                // 回调返回选择的dom对象和控制按钮对象
                /* 因为上传要提前绑定按钮到webuploader，所以这里不做上传逻辑，写在mounted */
                /* !!!!!!返回false编辑面板不会关掉 */
                _this.$store.dispatch('com_get_signature', {name: uuid() + '.mp4'}).then(data => {
                  _this._videoUploader.on('uploadBeforeSend', function (block, formdata, headers) {
                    formdata.key = data.key
                    formdata.token = data.signature
                  })
                  _this._videoUploader.upload()
                })
                return false
              }
            },
            'undo',
            'cancel'
          ],
          placeHolder: _this.placeholder
        })
      }
    },
    mounted () {
      this._initEditor()
    }
  }
</script>
<style scoped>
  .com-contentEditor {
    padding: 0 15px;
    word-break: break-all;
  }
</style>
<style>
  .com-contentEditor .Eleditor-textEditor, .com-contentEditor .Eleditor-method {
    position: fixed;
    z-index: 999;
  }
  .com-contentEditor .Eleditor-delete-back {
    margin-bottom: 46px;
  }
</style>


