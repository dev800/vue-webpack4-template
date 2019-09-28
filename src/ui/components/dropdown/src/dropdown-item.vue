<template>
  <li
    class="fm-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'fm-dropdown-menu__item--divided': divided
    }"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
    @click="handleClick"
  >
    <i
      v-if="icon"
      :class="icon"
    />
    <slot />
  </li>
</template>
<script>
import Emitter from '../../../js/mixins/emitter'

export default {
  name: 'FmDropdownItem',

  mixins: [Emitter],

  props: {
    command: {},
    disabled: Boolean,
    divided: Boolean,
    icon: String
  },

  methods: {
    handleClick(e) {
      this.dispatch('FmDropdown', 'menu-item-click', [this.command, this])
    }
  }
}
</script>
