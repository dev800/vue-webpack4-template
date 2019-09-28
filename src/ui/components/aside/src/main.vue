<template>
  <aside
    class="fm-aside"
    :style="{ width }"
  >
    <slot />
  </aside>
</template>

<script>
export default {
  name: 'FmAside',

  componentName: 'FmAside',

  props: {
    width: {
      type: String,
      default: '300px'
    }
  }
}
</script>
