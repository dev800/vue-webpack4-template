<template>
  <default-collection>
    <router-view />
  </default-collection>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultCollection from '../collections/default-collection.vue'

@Component({
  components: {
    DefaultCollection
  }
})

export default class LayoutDefault extends Vue {

}
</script>

<style lang="scss">
</style>
