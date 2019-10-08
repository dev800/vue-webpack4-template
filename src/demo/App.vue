<template>
  <ui-container class="x-app">
    <x-app-aside />
    <ui-container class="app__container">
      <ui-header
        height="52px"
        class="app__header"
      >
        <x-app-header />
      </ui-header>
      <ui-main class="app__main">
        <RouterView />
      </ui-main>
      <ui-footer class="app__footer">
        <x-app-footer />
      </ui-footer>
    </ui-container>
  </ui-container>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import XAppAside from './components/app/aside'
import XAppFooter from './components/app/footer'
import XAppHeader from './components/app/header'
import UiHeader from '~/lib/ui/components/header'
import UiContainer from '~/lib/ui/components/container'
import UiFooter from '~/lib/ui/components/footer'
import UiMain from '~/lib/ui/components/main'

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
@import '~/lib/ui/css/index.scss';
@import './css/variables.scss';
@import './css/index.scss';

.x-app {
  .app_ {
    &_container {
      margin-left: $---aside-width;
    }
  }
}
</style>
