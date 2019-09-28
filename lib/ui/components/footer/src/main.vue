<template>
  <footer
    class="fm-footer"
    :style="{ height }"
  >
    <slot />
  </footer>
</template>

<script>
export default {
  name: 'FmFooter',

  componentName: 'FmFooter',

  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
}
</script>
