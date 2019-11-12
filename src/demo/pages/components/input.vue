<template>
  <div class="demo">
    <h1 class="demo__title">文本框</h1>
    <h2 class="demo__title">基本用法</h2>
    <div class="demo__block">
      <ui-input
        v-model="inputValue"
        placeholder="请输入内容值"
      />
    </div>
    <h2 class="demo__title">禁用状态</h2>
    <div class="demo__block">
      <ui-input
        v-model="inputValue"
        placeholder="请输入内容值"
        disabled
      />
    </div>
    <h2 class="demo__title">可清空的输入框</h2>
    <div class="demo__block">
      <ui-input
        v-model="inputValue"
        placeholder="请输入内容值"
        clearable
      />
    </div>
    <h2 class="demo__title">密码框</h2>
    <div class="demo__block">
      <ui-input
        v-model="inputPassword"
        placeholder="请输入密码"
        show-password
      />
    </div>
    <h2 class="demo__title">带icon的输入框</h2>
    <div class="demo__intro">带有图标标记输入类型</div>
    <div class="demo__block">
      <div class="demo__row">
        属性方式：
        <ui-input
          placeholder="请选择日期"
          suffix-icon="regular-calendar-alt"
          v-model="inputValue"
        >
        </ui-input>
        <ui-input
          placeholder="请输入内容"
          prefix-icon="solid-search"
          v-model="inputValue"
        >
        </ui-input>
      </div>
      <div class="demo__row">
        slot 方式：
        <ui-input
          placeholder="请选择日期"
          v-model="inputValue"
        >
          <svg-icon
            slot="suffix"
            class="ui-input__icon"
            icon-class="regular-calendar-alt"
          ></svg-icon>
        </ui-input>
        <ui-input
          placeholder="请输入内容"
          v-model="inputValue"
        >
          <svg-icon
            slot="prefix"
            class="ui-input__icon"
            icon-class="solid-search"
          ></svg-icon>
        </ui-input>
      </div>
    </div>
    <h2 class="demo__title">文本域</h2>
    <div class="demo__block">
      <ui-input
        type="textarea"
        v-model="inputValue"
        placeholder="请输入内容值"
      />
    </div>
    <h2 class="demo__title">自适应高度</h2>
    <div class="demo__block">
      <div class="demo__row">
        <ui-input
          type="textarea"
          autosize
          v-model="inputValue"
          placeholder="请输入内容值"
        />
      </div>
      <div class="demo__row">
        <ui-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="inputValue"
          placeholder="请输入内容值"
        />
      </div>
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
  inputValue: string = 'hello world';
  inputPassword: string = null;
}
</script>

<style lang="scss" scoped>
.demo {
  &__block {
    .ui-input,
    .ui-textarea {
      width: 240px;
      margin-right: 12px;
    }
  }
}
</style>
