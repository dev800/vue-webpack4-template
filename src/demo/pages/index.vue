<template>
  <div class="u-page page_index">
    <div class="page__title">
      <h1>UI库</h1>
    </div>
    <div class="u-partials">
      <div class="partial__title">
        <h2>组件</h2>
      </div>
      <div class="partial__subtitle">
        <h3>基础组件</h3>
      </div>
      <div class="partial__content">
        <div class="u-buttons-container">
          <ui-button>Layout 布局</ui-button>
          <ui-button>Container 布局容器</ui-button>
          <ui-button>Color 色彩</ui-button>
          <ui-button>Typography 字体</ui-button>
          <ui-button>Border 边框</ui-button>
          <ui-button>Icon 图标</ui-button>
          <ui-button>Button 按钮</ui-button>
          <ui-button>Link 文字链接</ui-button>
        </div>
      </div>
      <div class="partial__subtitle">
        <h3>表单组件</h3>
      </div>
      <div class="partial__content">
        <div class="u-buttons-container">
          <ui-button>Radio 单选框</ui-button>
          <ui-button>Checkbox 多选框</ui-button>
          <ui-button>Input 输入框</ui-button>
          <ui-button>InputNumber 计数器</ui-button>
          <ui-button>Select 选择器</ui-button>
          <ui-button>Cascader 级联选择器</ui-button>
          <ui-button>Switch 开关</ui-button>
          <ui-button>Slider 滑块</ui-button>
          <ui-button>TimePicker 时间选择器</ui-button>
          <ui-button>DatePicker 日期选择器</ui-button>
          <ui-button>DateTimePicker 日期时间选择器</ui-button>
          <ui-button>Upload 上传</ui-button>
          <ui-button>Rate 评分</ui-button>
          <ui-button>ColorPicker 颜色选择器</ui-button>
          <ui-button>Transfer 穿梭框</ui-button>
          <ui-button>Form 表单</ui-button>
        </div>
      </div>
    </div>
    <div>
      <ui-input-number
        v-model="number"
        :step="2"
      ></ui-input-number>
      <ui-rate
        :allow-half="false"
        v-model="rateValue"
        show-text
      />
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

<script lang="js">
import NProgress from 'nprogress'
import UiButton from '~/lib/ui/components/button'
import UiInputNumber from '~/lib/ui/components/input-number'
import UiRate from '~/lib/ui/components/rate'
import UiProgress from '~/lib/ui/components/progress'
import UiPagination from '~/lib/ui/components/pagination'
import UiDatePicker from '~/lib/ui/components/date-picker'

export default {
  components: {
    UiButton,
    UiInputNumber,
    UiRate,
    UiProgress,
    UiPagination,
    UiDatePicker
  },
  data () {
    return {
      number: 0,
      rateValue: 3.5,
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
