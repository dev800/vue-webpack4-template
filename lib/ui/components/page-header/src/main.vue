<template>
  <div class="ui-page-header">
    <div
      class="ui-page-header__left"
      @click="$emit('back')"
    >
      <svg-icon icon-class="solid-arrow-left"></svg-icon>
      <div class="ui-page-header__title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
    </div>
    <div class="ui-page-header__content">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
  </div>
</template>

<script>
import { t } from '../../../js/locale'
export default {
  name: 'UiPageHeader',

  props: {
    title: {
      type: String,
      default () {
        return t('ui.pageHeader.title')
      }
    },
    content: String
  }
}
</script>
