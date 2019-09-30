<script>

export default {
  props: {
    isAutoWidth: Boolean,
    updateAll: Boolean
  },

  inject: ['fmForm', 'fmFormItem'],

  data () {
    return {
      computedWidth: 0
    }
  },

  watch: {
    computedWidth (val, oldVal) {
      if (this.updateAll) {
        this.fmForm.registerLabelWidth(val, oldVal)
        this.fmFormItem.updateComputedLabelWidth(val)
      }
    }
  },

  mounted () {
    this.updateLabelWidth('update')
  },

  updated () {
    this.updateLabelWidth('update')
  },

  beforeDestroy () {
    this.updateLabelWidth('remove')
  },

  methods: {
    getLabelWidth () {
      if (this.$el && this.$el.firstFmementChild) {
        const computedWidth = window.getComputedStyle(this.$el.firstFmementChild).width
        return Math.ceil(parseFloat(computedWidth))
      } else {
        return 0
      }
    },
    updateLabelWidth (action = 'update') {
      if (this.$slots.default && this.isAutoWidth && this.$el.firstFmementChild) {
        if (action === 'update') {
          this.computedWidth = this.getLabelWidth()
        } else if (action === 'remove') {
          this.fmForm.deregisterLabelWidth(this.computedWidth)
        }
      }
    }
  },

  render () {
    const slots = this.$slots.default
    if (!slots) return null
    if (this.isAutoWidth) {
      const autoLabelWidth = this.fmForm.autoLabelWidth
      const style = {}
      if (autoLabelWidth && autoLabelWidth !== 'auto') {
        const marginLeft = parseInt(autoLabelWidth, 10) - this.computedWidth
        if (marginLeft) {
          style.marginLeft = marginLeft + 'px'
        }
      }
      return (<div class="fm-form-item__labfm-wrap" style={style}>
        {slots}
      </div>)
    } else {
      return slots[0]
    }
  }
}
</script>
