<template>
  <fm-container class="x-app">
    <x-app-aside />
    <fm-container>
      <fm-header
        height="52px"
        class="app__header"
      >
        <x-app-header />
      </fm-header>
      <fm-main class="app__main">
        <RouterView />
      </fm-main>
      <fm-footer class="app__footer">
        <x-app-footer />
      </fm-footer>
    </fm-container>
  </fm-container>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

import XAppAside from './components/app/aside'
import XAppFooter from './components/app/footer'
import XAppHeader from './components/app/header'
import FmHeader from '~/lib/ui/components/header'
import FmContainer from '~/lib/ui/components/container'
import FmFooter from '~/lib/ui/components/footer'
import FmMain from '~/lib/ui/components/main'

export default {
  components: {
    XAppAside,
    XAppFooter,
    XAppHeader,
    FmHeader,
    FmContainer,
    FmFooter,
    FmMain
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
@import './css/index.scss';
</style>
