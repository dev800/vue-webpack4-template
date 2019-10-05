<template>
  <div class="x-app-aside">
    <h5>默认颜色</h5>
    <fm-menu
      default-active="2"
      class="fm-menu-vertical-admin"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
    >
      <fm-submenu index="1">
        <template slot="title">
          <i class="fm-icon-ios-pin"></i>
          <span>导航一</span>
        </template>
        <fm-menu-item-group>
          <template slot="title">分组一</template>
          <fm-menu-item index="1-1">选项1</fm-menu-item>
          <fm-menu-item index="1-2">选项2</fm-menu-item>
        </fm-menu-item-group>
        <fm-menu-item-group title="分组2">
          <fm-menu-item index="1-3">选项3</fm-menu-item>
        </fm-menu-item-group>
        <fm-submenu index="1-4">
          <template slot="title">选项4</template>
          <fm-menu-item index="1-4-1">选项1</fm-menu-item>
        </fm-submenu>
      </fm-submenu>
      <fm-menu-item index="2">
        <i class="fm-icon-ios-menu"></i>
        <span slot="title">导航二</span>
      </fm-menu-item>
      <fm-menu-item
        index="3"
        disabled
      >
        <i class="fm-icon-ios-document"></i>
        <span slot="title">导航三</span>
      </fm-menu-item>
      <fm-menu-item index="4">
        <i class="fm-icon-ios-settings"></i>
        <span slot="title">导航四</span>
      </fm-menu-item>
    </fm-menu>
  </div>
</template>

<script>
import FmMenu from '~/lib/ui/components/menu'
import FmSubmenu from '~/lib/ui/components/submenu'
import FmMenuItem from '~/lib/ui/components/menu-item'
import FmMenuItemGroup from '~/lib/ui/components/menu-item-group'

export default {
  components: {
    'fm-menu': FmMenu,
    'fm-submenu': FmSubmenu,
    'fm-menu-item': FmMenuItem,
    'fm-menu-item-group': FmMenuItemGroup
  }
}
</script>

<style lang="scss">
.x-app-aside {
  h5 {
    font-size: 14px;
    color: #8492a6;
    margin-top: 12px;
    margin-bottom: 12px;
    text-align: center;
  }
}
</style>
