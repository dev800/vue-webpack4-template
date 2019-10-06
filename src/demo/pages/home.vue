<template>
  <div class="x-page-home">
    <div>
      <fm-date-picker
        type="datetime"
        placeholder="选择日期时间"
      >
      </fm-date-picker>
      <fm-button
        size="small"
        type="danger"
        @click="onShowMessage"
      >
        UI测试
      </fm-button>
      <fm-button
        size="small"
        type="danger"
      >
        UI测试
      </fm-button>
      <fm-button type="primary">
        UI大测试
      </fm-button>
      <input
        type="button"
        value="progress start"
        @click="onStartProgress"
      >
      <input
        type="button"
        value="progress stop"
        @click="onStopProgress"
      >

      <fm-button @click="show = !show">
        Toggle render
      </fm-button>
    </div>
    <transition
      enter-active-class="animated slideInDown"
      leave-active-class="animated slideOutUp"
    >
      <img
        src="~/static/img/logo.png"
        v-if="show"
      >
    </transition>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import FmButton from '~/lib/ui/components/button'
import FmDatePicker from '~/lib/ui/components/date-picker'

export default {
  components: {
    FmButton,
    FmDatePicker
  },
  data () {
    return {
      show: true
    }
  },
  beforeCreate () {
    console.log('before create')
  },
  created () {
    console.log('create...')
  },
  beforeMount () {
    console.log('before mount...')
    // NProgress.configure({ showSpinner: false })
  },
  mounted () {
    console.log('mounted...')
    // NProgress.configure({ showSpinner: false })
  },
  methods: {
    onShowMessage (e) {
      this.$message({ message: '你好测试一下错误消息啦啦', type: 'warning', duration: 1500 })
    },
    onStartProgress (e) {
      console.log('onStartProgress', e)
      NProgress.start()
    },
    onStopProgress (e) {
      console.log('onStopProgress', e)
      NProgress.done()
      NProgress.remove()
    }
  }
}
</script>
