<template>
  <div
    v-if="!(item && item.meta && item.meta.menuHide)"
    class="menu-wrapper"
  >
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
      >
        <ui-menu-item
          :route="onlyOneChild"
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown': !isNest}"
        >
          <app-menu-item-inner
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </ui-menu-item>
      </app-link>
    </template>

    <ui-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <app-menu-item-inner
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <menu-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </ui-submenu>
  </div>
</template>

<script>
import path from 'path'
import AppMenuItemInner from './menu-item-inner.vue'
import AppLink from './link'
import UiSubmenu from '~/lib/ui/components/submenu'
import UiMenuItem from '~/lib/ui/components/menu-item'
// import UiMenuItemGroup from '~/lib/ui/components/menu-item-group'

export default {
  name: 'MenuItem',
  components: {
    AppMenuItemInner,
    AppLink,
    UiSubmenu,
    UiMenuItem // ,
    // UiMenuItemGroup
  },
  mixins: [],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item && item.meta && item.meta.menuHide) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath (routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
