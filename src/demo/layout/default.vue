<template>
  <default-collection>
    <router-view />
  </default-collection>
</template>

<script lang="ts">
import DefaultCollection from './collections/default-collection.vue'

export default {
  components: {
    DefaultCollection
  },
  computed: {},
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
</style>
