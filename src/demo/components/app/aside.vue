<template>
  <ui-aside :class="['app__aside', {'app__aside-collapse': uiAsideMenu.collapse}]">
    <div class="app__aside-logo">Vue</div>
    <div class="app__aside-scroller">
      <ui-menu
        default-active="2"
        :mode="uiAsideMenu.mode"
        :collapse="uiAsideMenu.collapse"
        @open="onMenuOpen"
        @close="onMenuClose"
      >
        <menu-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </ui-menu>
    </div>
  </ui-aside>
</template>

<script>
import { mapState } from 'vuex'

import UiAside from '~/lib/ui/components/aside'
import UiMenu from '~/lib/ui/components/menu'
import MenuItem from './menu-item'

export default {
  components: {
    UiAside,
    UiMenu,
    MenuItem
  },
  computed: {
    ...mapState('ui', {
      uiAsideMenu: state => state.asideMenu
    }),
    routes () {
      return this.$router.options.routes
    }
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
  .app {
    &__aside {
      height: 100vh;
      width: $---aside-width !important;
      background: $---aside-background;
      box-shadow: $---aside-box-shadow;
      transition: width 0.28s;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;

      .ui-menu {
        border-right: none;
        background: none;

        .ui-submenu {
          &__title {
            color: $---aside-color;

            &:hover {
              color: $---aside-hover-color;
              background: $---aside-background;
            }
          }
        }

        .ui-menu-item {
          color: $---aside-color;

          &:hover {
            color: $---aside-hover-color;
            background: $---aside-background;
          }

          &.is-active {
            color: $---aside-color;
            background: $---aside-active-background;
          }
        }
      }
    }

    &__aside-collapse {
      width: $---aside-width-collapse !important;
      overflow: initial;

      .app {
        &__aside-scroller {
          overflow-y: initial;
        }
      }

      .ui-submenu {
        .ui-menu {
          background: $---aside-background;
          box-shadow: $---aside-box-shadow;
        }
      }
    }

    &__aside-logo {
      height: 64px;
      line-height: 64px;
      font-size: 32px;
      color: #fff;
      vertical-align: middle;
      text-align: center;
    }

    &__aside-scroller {
      height: calc(100vh - 64px);
      overflow-y: auto;
    }
  }
}
</style>
