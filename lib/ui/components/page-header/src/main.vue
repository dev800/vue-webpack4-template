<template>
  <div class="fm-page-header">
    <div
      class="fm-page-header__left"
      @click="$emit('back')"
    >
      <i class="fm-icon-back" />
      <div class="fm-page-header__title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
    </div>
    <div class="fm-page-header__content">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
  </div>
</template>

<script>
import { t } from '../../../js/locale'
export default {
  name: 'FmPageHeader',

  props: {
    title: {
      type: String,
      default () {
        return t('el.pageHeader.title')
      }
    },
    content: String
  }
}
</script>
