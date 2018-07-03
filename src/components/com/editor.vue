<template>
  <div class="com-contentEditor">
    <div id ="contentEditor"></div>
  </div>
</template>
<script>
  export default {
    name: 'com-contentEditor',
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
          upload: {
            server: '/',
            // headers: {
            //   'token': '123123'
            // },
            compress: false,
            fileSizeLimit: 2
          },
          /* 初始化完成钩子 */
          mounted: function () {
            /* 以下是扩展插入视频的演示 */
            let _videoUploader = window.WebUploader.create({
              auto: true,
              server: '服务器地址',
              /* 按钮类就是[Eleditor-你的自定义按钮id] */
              pick: window.$('.Eleditor-insertVideo'),
              duplicate: true,
              resize: false,
              accept: {
                title: 'Images',
                extensions: 'mp4',
                mimeTypes: 'video/mp4'
              },
              fileVal: 'video'
            })
            _videoUploader.on('uploadSuccess', function (_file, _call) {
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
  }
</style>
<style>
  .com-contentEditor .Eleditor-mask {
    position: fixed;
  }
</style>


