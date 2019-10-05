<template>
  <i
    :class="classes"
    :style="styles"
    @click="handleClick"
  />
</template>
<script>
const prefixCls = 'fmfont'

export default {
  name: 'FmIcon',
  props: {
    type: { type: String, default: null },
    size: { type: [Number, String], default: null },
    color: { type: String, default: null },
    isLink: { type: [String, Boolean], default: false }
  },
  computed: {
    classes () {
      const classes = [prefixCls, `fm-icon-${this.type}`]

      if (this.isLink) {
        classes.push('is-link')
      }

      return classes
    },
    styles () {
      const style = {}

      if (this.size) {
        style['font-size'] = `${this.size}px`
      }

      if (this.color) {
        style.color = this.color
      }

      return style
    }
  },
  methods: {
    handleClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>
