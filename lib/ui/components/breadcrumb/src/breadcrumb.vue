<template>
  <div
    class="ui-breadcrumb"
    aria-label="Breadcrumb"
    role="navigation"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: 'UiBreadcrumb',

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

  provide () {
    return {
      uiBreadcrumb: this
    }
  },

  mounted () {
    const items = this.$el.querySelectorAll('.ui-breadcrumb__item')
    if (items.length) {
      items[items.length - 1].setAttribute('aria-current', 'page')
    }
  }
}
</script>
