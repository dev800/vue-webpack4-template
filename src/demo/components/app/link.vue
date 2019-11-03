
<template>
  <component v-bind="linkProps(to)" :is="'AppLink'">
    <slot />
  </component>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

@Component
export default class Link extends Vue {
  @Prop(String) to: string | undefined

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
    }
    return {
      is: 'router-link',
      to: url
    }
  }
}
</script>
