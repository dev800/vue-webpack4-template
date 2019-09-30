<template>
  <fm-container>
    <fm-aside width="200px">
      <x-app-aside />
    </fm-aside>
    <fm-container>
      <fm-header height="52px">
        <x-app-header />
      </fm-header>
      <fm-main>
        <RouterView />
      </fm-main>
      <fm-footer>
        <x-app-footer />
      </fm-footer>
    </fm-container>
  </fm-container>
</template>

<script>
import XAppAside from '@/demo/components/app/aside'
import XAppFooter from '@/demo/components/app/footer'
import XAppHeader from '@/demo/components/app/header'
import FmHeader from '~/lib/ui/components/header'
import FmAside from '~/lib/ui/components/aside'
import FmContainer from '~/lib/ui/components/container'
import FmFooter from '~/lib/ui/components/footer'
import FmMain from '~/lib/ui/components/main'

export default {
  components: {
    'x-app-aside': XAppAside,
    'x-app-footer': XAppFooter,
    'x-app-header': XAppHeader,
    'fm-header': FmHeader,
    'fm-aside': FmAside,
    'fm-container': FmContainer,
    'fm-footer': FmFooter,
    'fm-main': FmMain
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import '~/lib/ui/css/index.scss';
@import './css/index.scss';
</style>
