
<template>
  <component v-bind="linkProps(to)" :is="'AppLink'">
    <slot />
  </component>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

@Component
export default class Link extends Vue {
  @Prop([String, Object]) to: string | any

  isExternal (path) {
    return /^(https?:|mailto:|tel:)/.test(path)
  }

  linkProps (url) {
    if (this.isExternal(url)) {
      return {
        is: 'a',
        href: url,
        target: '_blank',
        rel: 'noopener'
      }
    } else {
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
