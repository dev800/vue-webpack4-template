<template>
  <div
    class="fm-breadcrumb"
    aria-label="Breadcrumb"
    role="navigation"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: 'FmBreadcrumb',

  props: {
    separator: {
      type: String,
      default: '/'
    },
    separatorClass: {
      type: String,
      default: ''
    }
  },

  provide() {
    return {
      elBreadcrumb: this
    }
  },

  mounted() {
    const items = this.$el.querySelectorAll('.fm-breadcrumb__item')
    if (items.length) {
      items[items.length - 1].setAttribute('aria-current', 'page')
    }
  }
}
</script>
