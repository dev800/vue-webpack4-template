<template>
  <div>
    <h3 class="title">
      Hello 3 {{ name }} from my Vue.js page, built with Webpack 4!
    </h3>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  color: #0000f0;
}
</style>
