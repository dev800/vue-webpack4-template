<template>
  <span class="fm-breadcrumb__item">
    <span
      ref="link"
      :class="['fm-breadcrumb__inner', to ? 'is-link' : '']"
      role="link"
    >
      <slot />
    </span>
    <svg-icon
      v-if="separatorClass"
      :icon-class="separatorClass"
      class="fm-breadcrumb__separator"
    ></svg-icon>
    <span
      v-else
      class="fm-breadcrumb__separator"
      role="presentation"
    >{{ separator }}</span>
  </span>
</template>
<script>
export default {
  name: 'FmBreadcrumbItem',
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

  inject: ['fmBreadcrumb'],

  mounted () {
    this.separator = this.fmBreadcrumb.separator
    this.separatorClass = this.fmBreadcrumb.separatorClass
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
