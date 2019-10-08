<template>
  <aside
    class="ui-aside"
    :style="{ width }"
  >
    <slot />
  </aside>
</template>

<script>
export default {
  name: 'UiAside',

  componentName: 'UiAside',

  props: {
    width: {
      type: String,
      default: '300px'
    }
  }
}
</script>
