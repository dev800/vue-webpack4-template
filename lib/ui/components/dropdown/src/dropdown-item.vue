<template>
  <li
    class="ui-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'ui-dropdown-menu__item--divided': divided
    }"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
    @click="handleClick"
  >
    <svg-icon
      v-if="icon"
      :icon-class="icon"
    ></svg-icon>
    <slot />
  </li>
</template>
<script>
import Emitter from '../../../js/mixins/emitter'

export default {
  name: 'UiDropdownItem',

  mixins: [Emitter],

  props: {
    command: {},
    disabled: Boolean,
    divided: Boolean,
    icon: String
  },

  methods: {
    handleClick (e) {
      this.dispatch('UiDropdown', 'menu-item-click', [this.command, this])
    }
  }
}
</script>
