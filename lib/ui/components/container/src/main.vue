<template>
  <section
    class="ui-container"
    :class="{ 'is-vertical': isVertical }"
  >
    <slot />
  </section>
</template>

<script>
export default {
  name: 'UiContainer',

  componentName: 'UiContainer',

  props: {
    direction: {
      type: String,
      default: null
    }
  },

  computed: {
    isVertical () {
      if (this.direction === 'vertical') {
        return true
      } else if (this.direction === 'horizontal') {
        return false
      }
      return this.$slots && this.$slots.default
        ? this.$slots.default.some(vnode => {
          const tag = vnode.componentOptions && vnode.componentOptions.tag
          return tag === 'ui-header' || tag === 'ui-footer'
        })
        : false
    }
  }
}
</script>
