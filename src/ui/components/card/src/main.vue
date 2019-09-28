<template>
  <div
    class="fm-card"
    :class="shadow ? 'is-' + shadow + '-shadow' : 'is-always-shadow'"
  >
    <div
      v-if="$slots.header || header"
      class="fm-card__header"
    >
      <slot name="header">
        {{ header }}
      </slot>
    </div>
    <div
      class="fm-card__body"
      :style="bodyStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FmCard',
  props: {
    header: {},
    bodyStyle: {},
    shadow: {
      type: String
    }
  }
}
</script>
