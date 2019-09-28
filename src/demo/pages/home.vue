<template>
  <div class="x-ui-home">
    <div>
      <FmButton
        size="small"
        type="danger"
        @click="onShowMessage"
      >
        UI测试
      </FmButton>
      <FmButton
        size="small"
        type="danger"
      >
        UI测试
      </FmButton>
      <FmButton type="primary">
        UI大测试
      </FmButton>
      <Icon type="ios-landline" />
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
    <img src="~/static/img/logo.png">
  </div>
</template>

<script>
import NProgress from 'nprogress'
import Icon from '~/lib/ui/components/icon'
import FmButton from '~/lib/ui/components/button'

export default {
  components: {
    Icon: Icon,
    FmButton: FmButton
  },
  mounted() {
    console.log('mounted...')
    // NProgress.configure({ showSpinner: false })
  },
  methods: {
    onShowMessage(e) {
      this.$message('这是一条消息提示')
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
