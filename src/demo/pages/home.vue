<template>
  <div class="x-page-home">
    <div>
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
    </div>
    <img
      src="~/static/img/logo.png"
      class="animated bounceIn infinite"
    >
  </div>
</template>

<script>
import NProgress from 'nprogress'
import FmButton from '~/lib/ui/components/button'

export default {
  components: {
    'fm-button': FmButton
  },
  data() {
    return {
    }
  },
  mounted() {
    console.log('mounted...')
    // NProgress.configure({ showSpinner: false })
  },
  methods: {
    onShowMessage(e) {
      this.$message({ message: '你好测试一下错误消息啦啦', type: 'warning', duration: 1500 })
    },
    onStartProgress(e) {
      console.log('onStartProgress', e)
      NProgress.start()
    },
    onStopProgress(e) {
      console.log('onStopProgress', e)
      NProgress.done()
      NProgress.remove()
    }
  }
}
</script>
