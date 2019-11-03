<template>
  <div class="demo">
    <h1 class="demo__title">文本框</h1>
    <h2 class="demo__title">基本用法</h2>
    <div class="demo__block">
      <ui-input v-model="inputValue" placeholder="请输入内容值" />
    </div>
    <h2 class="demo__title">禁用状态</h2>
    <div class="demo__block">
      <ui-input v-model="inputValue" placeholder="请输入内容值" disabled />
    </div>
    <h2 class="demo__title">可清空的输入框</h2>
    <div class="demo__block">
      <ui-input v-model="inputValue" placeholder="请输入内容值" clearable />
    </div>
    <h2 class="demo__title">密码框</h2>
    <div class="demo__block">
      <ui-input v-model="inputPassword" placeholder="请输入密码" show-password />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import UiInput from '~~/lib/ui/components/input'

@Component({
  components: {
    UiInput
  }
})

export default class Header extends Vue {
  inputValue: string = 'hello world'
  inputPassword: string = null
}
</script>

<style lang="scss" scoped>
</style>
