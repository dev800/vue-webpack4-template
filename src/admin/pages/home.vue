<template>
  <div class="x-admin-home">
    <Icon type="ios-landline" />
    <img src="~/static/img/logo.png">
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
</template>

<script>
import NProgress from 'nprogress'
import Icon from '@/ui/components/icon'

export default {
  components: {
    Icon: Icon
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
