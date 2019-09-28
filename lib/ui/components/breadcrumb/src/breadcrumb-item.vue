<template>
  <span class="fm-breadcrumb__item">
    <span
      ref="link"
      :class="['fm-breadcrumb__inner', to ? 'is-link' : '']"
      role="link"
    >
      <slot />
    </span>
    <i
      v-if="separatorClass"
      class="fm-breadcrumb__separator"
      :class="separatorClass"
    />
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
  data() {
    return {
      separator: '',
      separatorClass: ''
    }
  },

  inject: ['elBreadcrumb'],

  mounted() {
    this.separator = this.elBreadcrumb.separator
    this.separatorClass = this.elBreadcrumb.separatorClass
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
