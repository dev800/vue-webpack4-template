<template>
  <div class="x-header">
    <fm-icon
      class="header__icon-trigger"
      isLink="true"
      @click="onClickCollapseToggle"
      :type="`indent-${uiAsideMenu.collapse ? 'right' : 'left'}`"
    ></fm-icon>
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
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import FmIcon from '~/lib/ui/components/icon'
import FmBreadcrumb from '~/lib/ui/components/breadcrumb'
import FmBreadcrumbItem from '~/lib/ui/components/breadcrumb-item'

export default {
  components: {
    'fm-icon': FmIcon,
    'fm-breadcrumb': FmBreadcrumb,
    'fm-breadcrumb-item': FmBreadcrumbItem
  },
  computed: {
    ...mapState('ui', {
      uiAsideMenu: state => state.asideMenu
    })
  },
  methods: {
    ...mapActions('ui', {
      uiAsideMenuCollapseToggle: 'asideMenuCollapseToggle'
    }),
    onClickCollapseToggle (e) {
      this.uiAsideMenuCollapseToggle()
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
      line-height: 3.8;
    }

    &_icon-trigger {
      padding-right: 16px;
    }
  }
}
</style>
