<template>
  <div class="x-header">
    <div class="header__collapse-trigger">
      <svg-icon
        @click.stop="onClickCollapseToggle"
        :icon-class="uiAsideMenu.collapse ? 'solid-indent' : 'solid-outdent'"
      ></svg-icon>
    </div>
    <app-breadcrumb />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import AppBreadcrumb from './breadcrumb.vue'

@Component({
  components: {
    AppBreadcrumb
  }
})

export default class Header extends Vue {
  @State(state => state.ui.asideMenu) uiAsideMenu

  onClickCollapseToggle (e) {
    this.$store.dispatch('ui/asideMenuCollapseToggle')
  }
}
</script>

<style lang="scss" scoped>
.x-header {
  display: flex;
  align-items: center;

  .header {
    &__collapse-trigger,
    &__breadcrumb {
      line-height: 50px;
    }

    &__collapse-trigger {
      padding: 0 16px;
      font-size: 20px;
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    &__breadcrumb {
      padding-left: 8px;
    }
  }
}
</style>
