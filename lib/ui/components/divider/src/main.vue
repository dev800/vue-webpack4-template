<template functional>
  <div
    v-bind="data.attrs"
    :class="[data.staticClass, 'fm-divider', `fm-divider--${props.direction}`]"
    v-on="listeners"
  >
    <div
      v-if="slots().default && props.direction !== 'vertical'"
      :class="['fm-divider__text', `is-${props.contentPosition}`]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FmDivider',
  props: {
    direction: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1
      }
    },
    contentPosition: {
      type: String,
      default: 'center',
      validator(val) {
        return ['left', 'center', 'right'].indexOf(val) !== -1
      }
    }
  }
}

</script>
