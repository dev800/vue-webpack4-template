<template>
  <ui-aside :class="['app__aside', {'app__aside-collapse': uiAsideMenu.collapse}]">
    <div class="app__aside-logo">Vue</div>
    <div class="app__aside-scroller">
      <ui-menu
        default-active="2"
        background-color="#191a23"
        text-color="#fff"
        active-text-color="#ffd04b"
        :mode="uiAsideMenu.mode"
        :collapse="uiAsideMenu.collapse"
        @open="onMenuOpen"
        @close="onMenuClose"
      >
        <ui-submenu index="1">
          <template slot="title">
            <svg-icon icon-class="solid-th-large"></svg-icon>
            <span>组件</span>
          </template>
          <ui-menu-item-group>
            <template slot="title">基础</template>
            <ui-menu-item index="1-1">选项1</ui-menu-item>
            <ui-menu-item index="1-2">选项2</ui-menu-item>
          </ui-menu-item-group>
          <ui-menu-item-group title="表单">
            <ui-menu-item index="1-3">选项3</ui-menu-item>
          </ui-menu-item-group>
          <ui-submenu index="1-4">
            <template slot="title">高级</template>
            <ui-menu-item index="1-4-1">选项1</ui-menu-item>
            <ui-menu-item index="1-4-1">选项1</ui-menu-item>
            <ui-menu-item index="1-4-1">选项1</ui-menu-item>
            <ui-menu-item index="1-4-1">选项1</ui-menu-item>
            <ui-menu-item index="1-4-1">选项1</ui-menu-item>
            <ui-menu-item index="1-4-1">选项1</ui-menu-item>
            <ui-menu-item index="1-4-1">选项1</ui-menu-item>
          </ui-submenu>
          <ui-submenu index="1-5">
            <template slot="title">业务</template>
            <ui-menu-item index="1-5-1">选项1</ui-menu-item>
          </ui-submenu>
        </ui-submenu>
        <ui-menu-item index="2">
          <svg-icon icon-class="solid-snowboarding"></svg-icon>
          <span slot="title">技巧</span>
        </ui-menu-item>
        <ui-menu-item
          index="3"
          disabled
        >
          <svg-icon icon-class="solid-frown"></svg-icon>
          <span slot="title">不可用</span>
        </ui-menu-item>
        <ui-menu-item index="3">
          <svg-icon icon-class="solid-snowflake"></svg-icon>
          <span slot="title">页面</span>
        </ui-menu-item>
        <ui-menu-item index="4">
          <svg-icon icon-class="solid-splotch"></svg-icon>
          <span slot="title">页面</span>
        </ui-menu-item>
      </ui-menu>
    </div>
  </ui-aside>
</template>

<script>
import { mapState } from 'vuex'

import UiAside from '~/lib/ui/components/aside'
import UiMenu from '~/lib/ui/components/menu'
import UiSubmenu from '~/lib/ui/components/submenu'
import UiMenuItem from '~/lib/ui/components/menu-item'
import UiMenuItemGroup from '~/lib/ui/components/menu-item-group'

export default {
  components: {
    UiAside,
    UiMenu,
    UiSubmenu,
    UiMenuItem,
    UiMenuItemGroup
  },
  computed: {
    ...mapState('ui', {
      uiAsideMenu: state => state.asideMenu
    })
  },
  mounted () {
    console.log(this.uiAsideMenu)
  },
  methods: {
    onMenuOpen (e) {
      console.log('menu open', e)
    },
    onMenuClose (e) {
      console.log('menu close', e)
    }
  }
}
</script>

<style lang="scss">
@import '../../css/variables.scss';

.x-app {
  .app_ {
    &_aside {
      height: 100vh;
      width: $---aside-width !important;
      background: #191a23;
      transition: width 0.28s;
      position: fixed;
      top: 0;
      left: 0;

      .ui-menu {
        border-right: none;
        background: none;
      }
    }

    &_aside-collapse {
      width: 64px !important;
      overflow: initial;
    }

    &_aside-logo {
      height: 64px;
      line-height: 64px;
      font-size: 32px;
      color: #fff;
      vertical-align: middle;
      text-align: center;
    }

    &_aside-scroller {
      height: calc(100vh - 64px);
      overflow-y: auto;
    }
  }
}
</style>
