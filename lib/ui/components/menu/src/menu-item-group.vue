<template>
  <li class="ui-menu-item-group">
    <div
      class="ui-menu-item-group__title"
      :style="{paddingLeft: levelPadding + 'px'}"
    >
      <template v-if="!$slots.title">
        {{ title }}
      </template>
      <slot
        v-else
        name="title"
      />
    </div>
    <ul>
      <slot />
    </ul>
  </li>
</template>
<script>
export default {
  name: 'UiMenuItemGroup',

  componentName: 'UiMenuItemGroup',

  inject: ['rootMenu'],
  props: {
    title: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      paddingLeft: 20
    }
  },
  computed: {
    levelPadding () {
      let padding = 20
      let parent = this.$parent
      if (this.rootMenu.collapse) return 20
      while (parent && parent.$options.componentName !== 'UiMenu') {
        if (parent.$options.componentName === 'UiSubmenu') {
          padding += 20
        }
        parent = parent.$parent
      }
      return padding
    }
  }
}
</script>
