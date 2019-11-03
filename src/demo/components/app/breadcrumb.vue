<template>
  <ui-breadcrumb
    class="app-breadcrumb"
    separator="/"
  >
    <ui-breadcrumb-item
      v-for="(item, itemIndex) in levelList"
      :key="item.path"
    >
      <span
        v-if="item.redirect === 'noRedirect' || itemIndex == levelList.length - 1"
        class="no-redirect"
      >{{ item.meta.title }}</span>
      <a
        v-else
        @click.prevent="handleLink(item)"
      >{{ item.meta.title }}</a>
    </ui-breadcrumb-item>
  </ui-breadcrumb>
</template>

<script lang="ts">
import pathToRegexp from 'path-to-regexp'
import UiBreadcrumb from '~~/lib/ui/components/breadcrumb'
import UiBreadcrumbItem from '~~/lib/ui/components/breadcrumb-item'

export default {
  name: 'Breadcrumb',
  components: {
    UiBreadcrumb,
    UiBreadcrumbItem
  },
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route (route) {
      if (route.redirect) {
        return
      }

      this.generateBreadcrumb()
    }
  },
  created () {
    this.generateBreadcrumb()
  },
  methods: {
    generateBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)

      matched = [{ path: '/', meta: { title: '首页' } }].concat(matched)
      this.levelList = matched.filter(item => item.meta && item.meta.title && !item.meta.breadcrumbHide)
    },

    pathCompile (path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },

    handleLink (item) {
      const { redirect, path } = item

      if (redirect) {
        this.$router.push(redirect)
        return
      }

      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  &.ui-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
}
</style>
