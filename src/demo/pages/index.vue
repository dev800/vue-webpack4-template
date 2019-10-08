<template>
  <div class="x-page-home">
    <div>
      <!-- <div v-loading="true">你好吗？？？</div> -->
      <ui-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000"
      >
      </ui-pagination>
      <ui-progress :percentage="50"></ui-progress>
      <ui-progress
        :percentage="100"
        :format="format"
      ></ui-progress>
      <ui-progress
        :percentage="100"
        status="success"
      ></ui-progress>
      <ui-progress
        :percentage="100"
        status="warning"
      ></ui-progress>
      <ui-progress
        :percentage="50"
        status="exception"
      ></ui-progress>
      <ui-button
        plain
        @click="openNotify"
      >
        可自动关闭的通知
      </ui-button>
      <svg-icon
        icon-class="solid-loading"
        class="animated spin infinite"
      />
      <ui-date-picker
        v-model="valueDatatime"
        type="date"
        placeholder="选择日期"
      >
      </ui-date-picker>
      <ui-date-picker
        v-model="valueDatatime"
        type="datetime"
        placeholder="选择日期时间"
      >
      </ui-date-picker>
      <ui-button
        size="small"
        type="danger"
        @click="onShowMessage"
      >
        UI测试
      </ui-button>
      <ui-button
        size="small"
        type="danger"
      >
        UI测试
      </ui-button>
      <ui-button
        type="primary"
        :loading="true"
      >
        UI大测试加载中...
      </ui-button>
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

      <ui-button @click="show = !show">
        Toggle render
      </ui-button>
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
import UiButton from '~/lib/ui/components/button'
import UiProgress from '~/lib/ui/components/progress'
import UiPagination from '~/lib/ui/components/pagination'
import UiDatePicker from '~/lib/ui/components/date-picker'

export default {
  components: {
    UiButton,
    UiProgress,
    UiPagination,
    UiDatePicker
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
