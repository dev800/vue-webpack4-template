<template>
  <div class="x-page-home">
    <div>
      <!-- <div v-loading="true">你好吗？？？</div> -->
      <fm-progress :percentage="50"></fm-progress>
      <fm-progress
        :percentage="100"
        :format="format"
      ></fm-progress>
      <fm-progress
        :percentage="100"
        status="success"
      ></fm-progress>
      <fm-progress
        :percentage="100"
        status="warning"
      ></fm-progress>
      <fm-progress
        :percentage="50"
        status="exception"
      ></fm-progress>
      <fm-button
        plain
        @click="openNotify"
      >
        可自动关闭的通知
      </fm-button>
      <svg-icon
        icon-class="solid-loading"
        class="animated spin infinite"
      />
      <fm-date-picker
        v-model="valueDatatime"
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
      <fm-button
        type="primary"
        :loading="true"
      >
        UI大测试加载中...
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
import FmProgress from '~/lib/ui/components/progress'
import FmDatePicker from '~/lib/ui/components/date-picker'

export default {
  components: {
    FmButton,
    FmProgress,
    FmDatePicker
  },
  data () {
    return {
      fullscreenLoading: false,
      valueDatatime: '',
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
    format (percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    },
    openNotify () {
      const h = this.$createElement

      this.$notify({
        type: 'warning',
        // showClose: false,
        // duration: 1200,
        title: '标题名称',
        message: h('i', { style: 'color: teal' }, '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案')
      })
    },
    openFullScreen () {
      this.fullscreenLoading = true
      setTimeout(() => {
        this.fullscreenLoading = false
      }, 2000)
    },
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
