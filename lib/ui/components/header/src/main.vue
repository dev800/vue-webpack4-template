<template>
  <header
    class="ui-header"
    :style="{ height }"
  >
    <slot />
  </header>
</template>

<script>
export default {
  name: 'UiHeader',

  componentName: 'UiHeader',

  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
}
</script>
