<template>
  <div
    class="ui-card"
    :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'"
  >
    <div
      v-if="$slots.header || header"
      class="ui-card__header"
    >
      <slot name="header">
        {{ header }}
      </slot>
    </div>
    <div
      class="ui-card__body"
      :style="bodyStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiCard',
  props: {
    header: {},
    bodyStyle: {},
    shadow: {
      type: String
    }
  }
}
</script>
