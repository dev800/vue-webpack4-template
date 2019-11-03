<template>
  <div class="demo">
    <h1 class="demo__title">复选框</h1>
    <h2 class="demo__title">基本用法</h2>
    <div class="demo__block">
      <ui-checkbox v-model="checkbox1" label="1">备选项</ui-checkbox>
      <ui-checkbox v-model="checkbox2" label="2">备选项</ui-checkbox>
    </div>
    <h2 class="demo__title">禁用用法</h2>
    <div class="demo__block">
      <ui-checkbox v-model="checkbox1" disabled label="1">备选项</ui-checkbox>
      <ui-checkbox v-model="checkbox2" disabled label="2">备选项</ui-checkbox>
    </div>
    <h2 class="demo__title">按钮组</h2>
    <div class="demo__block">
      <ui-checkbox-group v-model="checkboxGroup">
        <ui-checkbox :label="3">备选项</ui-checkbox>
        <ui-checkbox :label="6">备选项</ui-checkbox>
        <ui-checkbox :label="9">备选项</ui-checkbox>
      </ui-checkbox-group>
    </div>
    <h2 class="demo__title">按钮样式</h2>
    <div class="demo__block">
      <div class="demo__row">
        <ui-checkbox-group v-model="checkboxGroup">
          <ui-checkbox-button :label="3">备选项</ui-checkbox-button>
          <ui-checkbox-button :label="6">备选项</ui-checkbox-button>
          <ui-checkbox-button :label="9">备选项</ui-checkbox-button>
        </ui-checkbox-group>
      </div>
      <div class="demo__row">
        <ui-checkbox-group v-model="checkboxGroup" size="medium">
          <ui-checkbox-button :label="3">备选项</ui-checkbox-button>
          <ui-checkbox-button :label="6">备选项</ui-checkbox-button>
          <ui-checkbox-button :label="9">备选项</ui-checkbox-button>
        </ui-checkbox-group>
      </div>
      <div class="demo__row">
        <ui-checkbox-group v-model="checkboxGroup" size="small">
          <ui-checkbox-button :label="3">备选项</ui-checkbox-button>
          <ui-checkbox-button :label="6">备选项</ui-checkbox-button>
          <ui-checkbox-button :label="9">备选项</ui-checkbox-button>
        </ui-checkbox-group>
      </div>
      <div class="demo__row">
        <ui-checkbox-group v-model="checkboxGroup" size="mini">
          <ui-checkbox-button :label="3">备选项</ui-checkbox-button>
          <ui-checkbox-button :label="6">备选项</ui-checkbox-button>
          <ui-checkbox-button :label="9">备选项</ui-checkbox-button>
        </ui-checkbox-group>
      </div>
    </div>
    <h2 class="demo__title">带边框的按钮组</h2>
    <div class="demo__block">
      <div class="demo__row">
        <ui-checkbox-group v-model="checkboxGroup">
          <ui-checkbox :label="3" border>备选项</ui-checkbox>
          <ui-checkbox :label="6" border>备选项</ui-checkbox>
          <ui-checkbox :label="9" border>备选项</ui-checkbox>
        </ui-checkbox-group>
      </div>
      <div class="demo__row">
        <ui-checkbox-group v-model="checkboxGroup" size="medium">
          <ui-checkbox :label="3" border>备选项</ui-checkbox>
          <ui-checkbox :label="6" border>备选项</ui-checkbox>
          <ui-checkbox :label="9" border>备选项</ui-checkbox>
        </ui-checkbox-group>
      </div>
      <div class="demo__row">
        <ui-checkbox-group v-model="checkboxGroup" size="small">
          <ui-checkbox :label="3" border>备选项</ui-checkbox>
          <ui-checkbox :label="6" border>备选项</ui-checkbox>
          <ui-checkbox :label="9" border>备选项</ui-checkbox>
        </ui-checkbox-group>
      </div>
      <div class="demo__row">
        <ui-checkbox-group v-model="checkboxGroup" size="mini">
          <ui-checkbox :label="3" border>备选项</ui-checkbox>
          <ui-checkbox :label="6" border>备选项</ui-checkbox>
          <ui-checkbox :label="9" border>备选项</ui-checkbox>
        </ui-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import UiCheckbox from '~~/lib/ui/components/checkbox'
import UiCheckboxButton from '~~/lib/ui/components/checkbox-button'
import UiCheckboxGroup from '~~/lib/ui/components/checkbox-group'

@Component({
  components: {
    UiCheckbox,
    UiCheckboxButton,
    UiCheckboxGroup
  }
})

export default class Header extends Vue {
  checkbox1: boolean = false
  checkbox2: boolean = true
  checkboxGroup: Array<string> = []
}
</script>

<style lang="scss" scoped>
</style>
