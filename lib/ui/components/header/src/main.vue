<template>
  <header
    class="fm-header"
    :style="{ height }"
  >
    <slot />
  </header>
</template>

<script>
export default {
  name: 'FmHeader',

  componentName: 'FmHeader',

  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
}
</script>
