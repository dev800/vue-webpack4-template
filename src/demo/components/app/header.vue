<template>
  <div class="x-header">
    <div class="header__icon-trigger">
      <svg-icon
        @click="onClickCollapseToggle"
        :icon-class="uiAsideMenu.collapse ? 'solid-indent' : 'solid-outdent'"
      ></svg-icon>
    </div>
    <fm-breadcrumb
      separator="/"
      class="header__breadcrumb"
    >
      <fm-breadcrumb-item :to="{ path: '/' }">首页</fm-breadcrumb-item>
      <fm-breadcrumb-item><a href="/">活动管理</a></fm-breadcrumb-item>
      <fm-breadcrumb-item>活动列表</fm-breadcrumb-item>
      <fm-breadcrumb-item>活动详情</fm-breadcrumb-item>
    </fm-breadcrumb>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import FmBreadcrumb from '~/lib/ui/components/breadcrumb'
import FmBreadcrumbItem from '~/lib/ui/components/breadcrumb-item'

export default {
  components: {
    FmBreadcrumb,
    FmBreadcrumbItem
  },
  computed: {
    ...mapState('ui', {
      uiAsideMenu: state => state.asideMenu
    })
  },
  methods: {
    onClickCollapseToggle (e) {
      this.$store.dispatch('ui/asideMenuCollapseToggle')
    }
  }
}
</script>

<style lang="scss" scoped>
.x-header {
  display: flex;
  align-items: center;

  .header_ {
    &_icon-trigger,
    &_breadcrumb {
      line-height: 50px;
    }

    &_icon-trigger {
      padding: 0 16px;
      font-size: 20px;
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    &_breadcrumb {
      padding-left: 8px;
    }
  }
}
</style>
