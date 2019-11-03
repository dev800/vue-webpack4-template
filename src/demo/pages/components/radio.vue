<template>
  <div class="demo">
    <h1 class="demo__title">单选框</h1>
    <h2 class="demo__title">基本用法</h2>
    <div class="demo__block">
      <ui-radio v-model="radio" label="1">备选项</ui-radio>
      <ui-radio v-model="radio" label="2">备选项</ui-radio>
    </div>
    <h2 class="demo__title">禁用用法</h2>
    <div class="demo__block">
      <ui-radio v-model="radio" disabled label="1">备选项</ui-radio>
      <ui-radio v-model="radio" disabled label="2">备选项</ui-radio>
    </div>
    <h2 class="demo__title">按钮组</h2>
    <div class="demo__block">
      <ui-radio-group v-model="radio">
        <ui-radio :label="3">备选项</ui-radio>
        <ui-radio :label="6">备选项</ui-radio>
        <ui-radio :label="9">备选项</ui-radio>
      </ui-radio-group>
    </div>
    <h2 class="demo__title">按钮样式</h2>
    <div class="demo__block">
      <div class="demo__row">
        <ui-radio-group v-model="radio">
          <ui-radio-button :label="3">备选项</ui-radio-button>
          <ui-radio-button :label="6">备选项</ui-radio-button>
          <ui-radio-button :label="9">备选项</ui-radio-button>
        </ui-radio-group>
      </div>
      <div class="demo__row">
        <ui-radio-group v-model="radio" size="medium">
          <ui-radio-button :label="3">备选项</ui-radio-button>
          <ui-radio-button :label="6">备选项</ui-radio-button>
          <ui-radio-button :label="9">备选项</ui-radio-button>
        </ui-radio-group>
      </div>
      <div class="demo__row">
        <ui-radio-group v-model="radio" size="small">
          <ui-radio-button :label="3">备选项</ui-radio-button>
          <ui-radio-button :label="6">备选项</ui-radio-button>
          <ui-radio-button :label="9">备选项</ui-radio-button>
        </ui-radio-group>
      </div>
      <div class="demo__row">
        <ui-radio-group v-model="radio" size="mini">
          <ui-radio-button :label="3">备选项</ui-radio-button>
          <ui-radio-button :label="6">备选项</ui-radio-button>
          <ui-radio-button :label="9">备选项</ui-radio-button>
        </ui-radio-group>
      </div>
    </div>
    <h2 class="demo__title">带边框的按钮组</h2>
    <div class="demo__block">
      <div class="demo__row">
        <ui-radio-group v-model="radio">
          <ui-radio :label="3" border>备选项</ui-radio>
          <ui-radio :label="6" border>备选项</ui-radio>
          <ui-radio :label="9" border>备选项</ui-radio>
        </ui-radio-group>
      </div>
      <div class="demo__row">
        <ui-radio-group v-model="radio" size="medium">
          <ui-radio :label="3" border>备选项</ui-radio>
          <ui-radio :label="6" border>备选项</ui-radio>
          <ui-radio :label="9" border>备选项</ui-radio>
        </ui-radio-group>
      </div>
      <div class="demo__row">
        <ui-radio-group v-model="radio" size="small">
          <ui-radio :label="3" border>备选项</ui-radio>
          <ui-radio :label="6" border>备选项</ui-radio>
          <ui-radio :label="9" border>备选项</ui-radio>
        </ui-radio-group>
      </div>
      <div class="demo__row">
        <ui-radio-group v-model="radio" size="mini">
          <ui-radio :label="3" border>备选项</ui-radio>
          <ui-radio :label="6" border>备选项</ui-radio>
          <ui-radio :label="9" border>备选项</ui-radio>
        </ui-radio-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import UiRadio from '~~/lib/ui/components/radio'
import UiRadioButton from '~~/lib/ui/components/radio-button'
import UiRadioGroup from '~~/lib/ui/components/radio-group'

@Component({
  components: {
    UiRadio,
    UiRadioButton,
    UiRadioGroup
  }
})

export default class Header extends Vue {
  radio: string = 'x'
}
</script>

<style lang="scss" scoped>
</style>
