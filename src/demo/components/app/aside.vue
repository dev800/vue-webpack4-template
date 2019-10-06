<template>
  <fm-aside :class="['app__aside', {'app__aside-collapse': uiAsideMenu.collapse}]">
    <div class="app__aside-logo">Vue</div>
    <div class="app__aside-scroller">
      <fm-menu
        default-active="2"
        background-color="#191a23"
        text-color="#fff"
        active-text-color="#ffd04b"
        :mode="uiAsideMenu.mode"
        :collapse="uiAsideMenu.collapse"
        @open="onMenuOpen"
        @close="onMenuClose"
      >
        <fm-submenu index="1">
          <template slot="title">
            <i class="fm-icon-ios-pin"></i>
            <span>组件</span>
          </template>
          <fm-menu-item-group>
            <template slot="title">基础</template>
            <fm-menu-item index="1-1">选项1</fm-menu-item>
            <fm-menu-item index="1-2">选项2</fm-menu-item>
          </fm-menu-item-group>
          <fm-menu-item-group title="表单">
            <fm-menu-item index="1-3">选项3</fm-menu-item>
          </fm-menu-item-group>
          <fm-submenu index="1-4">
            <template slot="title">高级</template>
            <fm-menu-item index="1-4-1">选项1</fm-menu-item>
            <fm-menu-item index="1-4-1">选项1</fm-menu-item>
            <fm-menu-item index="1-4-1">选项1</fm-menu-item>
            <fm-menu-item index="1-4-1">选项1</fm-menu-item>
            <fm-menu-item index="1-4-1">选项1</fm-menu-item>
            <fm-menu-item index="1-4-1">选项1</fm-menu-item>
            <fm-menu-item index="1-4-1">选项1</fm-menu-item>
          </fm-submenu>
          <fm-submenu index="1-5">
            <template slot="title">业务</template>
            <fm-menu-item index="1-5-1">选项1</fm-menu-item>
          </fm-submenu>
        </fm-submenu>
        <fm-menu-item index="2">
          <i class="fm-icon-ios-menu"></i>
          <span slot="title">技巧</span>
        </fm-menu-item>
        <fm-menu-item
          index="3"
          disabled
        >
          <i class="fm-icon-ios-document"></i>
          <span slot="title">不可用</span>
        </fm-menu-item>
        <fm-menu-item index="4">
          <i class="fm-icon-ios-settings"></i>
          <span slot="title">页面</span>
        </fm-menu-item>
      </fm-menu>
    </div>
  </fm-aside>
</template>

<script>
import { mapState } from 'vuex'

import FmAside from '~/lib/ui/components/aside'
import FmMenu from '~/lib/ui/components/menu'
import FmSubmenu from '~/lib/ui/components/submenu'
import FmMenuItem from '~/lib/ui/components/menu-item'
import FmMenuItemGroup from '~/lib/ui/components/menu-item-group'

export default {
  components: {
    FmAside,
    FmMenu,
    FmSubmenu,
    FmMenuItem,
    FmMenuItemGroup
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
.x-app {
  .app_ {
    &_aside {
      height: 100vh;
      background: #191a23;
      width: 200px !important;
      transition: width 0.28s;

      .fm-menu {
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
