<template>
  <ui-container class="x-app">
    <x-app-aside />
    <ui-container :class="['app__container', {'app__container-collapse': uiAsideMenu.collapse}]">
      <ui-header
        height="52px"
        class="app__header"
      >
        <x-app-header />
      </ui-header>
      <ui-main class="app__main">
        <slot></slot>
      </ui-main>
      <ui-footer class="app__footer">
        <x-app-footer />
      </ui-footer>
    </ui-container>
  </ui-container>
</template>

<script lang="ts">
import { mapState } from 'vuex'

import XAppAside from '../../components/app/aside.vue'
import XAppFooter from '../../components/app/footer.vue'
import XAppHeader from '../../components/app/header.vue'
import UiHeader from '@@/lib/ui/components/header'
import UiContainer from '@@/lib/ui/components/container'
import UiFooter from '@@/lib/ui/components/footer'
import UiMain from '@@/lib/ui/components/main'

export default {
  components: {
    XAppAside,
    XAppFooter,
    XAppHeader,
    UiHeader,
    UiContainer,
    UiFooter,
    UiMain
  },
  computed: {
    ...mapState('ui', {
      uiAsideMenu: state => state.asideMenu
    })
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
@import '~~/lib/ui/css/index.scss';
@import '../../css/variables.scss';
@import '../../css/index.scss';

.x-app {
  .app {
    &__header {
      padding: 0;
    }

    &__main {
      min-height: calc(100vh - 120px);
    }

    &__container {
      margin-left: $---aside-width;
    }

    &__container-collapse {
      margin-left: $---aside-width-collapse;
    }
  }
}
</style>
