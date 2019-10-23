<template>
  <div class="x-header">
    <div class="header__collapse-trigger">
      <svg-icon
        @click.stop="onClickCollapseToggle"
        :icon-class="uiAsideMenu.collapse ? 'solid-indent' : 'solid-outdent'"
      ></svg-icon>
    </div>
    <ui-breadcrumb
      separator="/"
      class="header__breadcrumb"
    >
      <ui-breadcrumb-item :to="{ path: '/' }">首页</ui-breadcrumb-item>
      <ui-breadcrumb-item><a href="/">活动管理</a></ui-breadcrumb-item>
      <ui-breadcrumb-item>活动列表</ui-breadcrumb-item>
      <ui-breadcrumb-item>活动详情</ui-breadcrumb-item>
    </ui-breadcrumb>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import UiBreadcrumb from '~/lib/ui/components/breadcrumb'
import UiBreadcrumbItem from '~/lib/ui/components/breadcrumb-item'

export default {
  components: {
    UiBreadcrumb,
    UiBreadcrumbItem
  },
  computed: {
    ...mapState('ui', {
      uiAsideMenu: state => state.asideMenu
    })
  },
  methods: {
    onClickCollapseToggle (e) {
      console.log('click: onClickCollapseToggle', e)
      this.$store.dispatch('ui/asideMenuCollapseToggle')
    }
  }
}
</script>

<style lang="scss" scoped>
.x-header {
  display: flex;
  align-items: center;

  .header {
    &__collapse-trigger,
    &__breadcrumb {
      line-height: 50px;
    }

    &__collapse-trigger {
      padding: 0 16px;
      font-size: 20px;
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    &__breadcrumb {
      padding-left: 8px;
    }
  }
}
</style>
