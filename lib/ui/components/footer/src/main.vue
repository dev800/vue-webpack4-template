<template>
  <footer
    class="ui-footer"
    :style="{ height }"
  >
    <slot />
  </footer>
</template>

<script>
export default {
  name: 'UiFooter',

  componentName: 'UiFooter',

  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
}
</script>
