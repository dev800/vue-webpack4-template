<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import FmBreadcrumb from '~/lib/ui/components/breadcrumb'
import FmBreadcrumbItem from '~/lib/ui/components/breadcrumb-item'

export default {
  components: {
    'el-breadcrumb': FmBreadcrumb,
    'el-breadcrumb-item': FmBreadcrumbItem
  }
}
</script>

<style lang="scss" scoped>
  .fm-breadcrumb {
    line-height: 3.8;
  }
</style>
