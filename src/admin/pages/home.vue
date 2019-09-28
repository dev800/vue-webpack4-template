<template>
  <div class="x-admin-home">
    <div>
      <FmButton>测试拉拉</FmButton>
      <FmButton type="primary">测试拉拉</FmButton>
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
import Icon from '@/ui/components/icon'
import FmButton from '@/ui/components/button'

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
