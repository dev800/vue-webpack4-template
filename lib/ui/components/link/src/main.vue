<template>
  <a
    :class="[
      'ui-link',
      type ? `ui-link--${type}` : '',
      disabled && 'is-disabled',
      underline && !disabled && 'is-underline'
    ]"
    :href="disabled ? null : href"
    v-bind="$attrs"
    @click="handleClick"
  >
    <svg-icon
      v-if="icon"
      :icon-class="icon"
    ></svg-icon>
    <span
      v-if="$slots.default"
      class="ui-link--inner"
    >
      <slot />
    </span>
    <template v-if="$slots.icon">
      <slot
        v-if="$slots.icon"
        name="icon"
      /></template>
  </a>
</template>

<script>

export default {
  name: 'UiLink',

  props: {
    type: {
      type: String,
      default: 'default'
    },
    underline: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    href: String,
    icon: String
  },

  methods: {
    handleClick (event) {
      if (!this.disabled) {
        if (!this.href) {
          this.$emit('click', event)
        }
      }
    }
  }
}
</script>
