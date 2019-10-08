<template>
  <span class="ui-breadcrumb__item">
    <span
      ref="link"
      :class="['ui-breadcrumb__inner', to ? 'is-link' : '']"
      role="link"
    >
      <slot />
    </span>
    <svg-icon
      v-if="separatorClass"
      :icon-class="separatorClass"
      class="ui-breadcrumb__separator"
    ></svg-icon>
    <span
      v-else
      class="ui-breadcrumb__separator"
      role="presentation"
    >{{ separator }}</span>
  </span>
</template>
<script>
export default {
  name: 'UiBreadcrumbItem',
  props: {
    to: {},
    replace: Boolean
  },
  data () {
    return {
      separator: '',
      separatorClass: ''
    }
  },

  inject: ['uiBreadcrumb'],

  mounted () {
    this.separator = this.uiBreadcrumb.separator
    this.separatorClass = this.uiBreadcrumb.separatorClass
    const link = this.$refs.link
    link.setAttribute('role', 'link')
    link.addEventListener('click', _ => {
      const { to, $router } = this
      if (!to || !$router) return
      this.replace ? $router.replace(to) : $router.push(to)
    })
  }
}
</script>
