<template>
  <transition-group
    tag="ul"
    :class="[
      'ui-upload-list',
      'ui-upload-list--' + listType,
      { 'is-disabled': disabled }
    ]"
    name="ui-list"
  >
    <li
      v-for="file in files"
      :key="file.uid"
      :class="['ui-upload-list__item', 'is-' + file.status, focusing ? 'focusing' : '']"
      tabindex="0"
      @keydown.delete="!disabled && $emit('remove', file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
    >
      <slot :file="file">
        <img
          v-if="file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1"
          class="ui-upload-list__item-thumbnail"
          :src="file.url"
          alt=""
        >
        <a
          class="ui-upload-list__item-name"
          @click="handleClick(file)"
        >
          <svg-icon icon-class="regular-file-alt"></svg-icon>{{ file.name }}
        </a>
        <label class="ui-upload-list__item-status-label">
          <svg-icon icon-class="solid-check-circle"></svg-icon>
        </label>
        <svg-icon
          icon-class="regular-times-circle"
          v-if="!disabled"
          @click="$emit('remove', file)"
        ></svg-icon>
        <i
          v-if="!disabled"
          class="solid-times-tip"
        >{{ t('ui.upload.deleteTip') }}</i>
        <!--因为close按钮只在li:focus的时候 display, li blur后就不存在了，所以键盘导航时永远无法 focus到 close按钮上-->
        <ui-progress
          v-if="file.status === 'uploading'"
          :type="listType === 'picture-card' ? 'circle' : 'line'"
          :stroke-width="listType === 'picture-card' ? 6 : 2"
          :percentage="parsePercentage(file.percentage)"
        />
        <span
          v-if="listType === 'picture-card'"
          class="ui-upload-list__item-actions"
        >
          <span
            v-if="handlePreview && listType === 'picture-card'"
            class="ui-upload-list__item-preview"
            @click="handlePreview(file)"
          >
            <svg-icon icon-class="regular-zoom-in"></svg-icon>
          </span>
          <span
            v-if="!disabled"
            class="ui-upload-list__item-delete"
            @click="$emit('remove', file)"
          >
            <svg-icon icon-class="regular-trash-alt"></svg-icon>
          </span>
        </span>
      </slot>
    </li>
  </transition-group>
</template>
<script>
import Locale from '../../../js/mixins/locale'
import UiProgress from '../../progress'

export default {

  name: 'UiUploadList',
  components: { UiProgress },

  mixins: [Locale],

  props: {
    files: {
      type: Array,
      default () {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    handlePreview: Function,
    listType: String
  },

  data () {
    return {
      focusing: false
    }
  },
  methods: {
    parsePercentage (val) {
      return parseInt(val, 10)
    },
    handleClick (file) {
      this.handlePreview && this.handlePreview(file)
    }
  }
}
</script>
