<template>
  <div class="x-admin-home">
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

export default {
  components: {},
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
