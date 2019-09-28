<template>
  <transition-group
    tag="ul"
    :class="[
      'fm-upload-list',
      'fm-upload-list--' + listType,
      { 'is-disabled': disabled }
    ]"
    name="fm-list"
  >
    <li
      v-for="file in files"
      :key="file.uid"
      :class="['fm-upload-list__item', 'is-' + file.status, focusing ? 'focusing' : '']"
      tabindex="0"
      @keydown.delete="!disabled && $emit('remove', file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
    >
      <slot :file="file">
        <img
          v-if="file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1"
          class="fm-upload-list__item-thumbnail"
          :src="file.url"
          alt=""
        >
        <a
          class="fm-upload-list__item-name"
          @click="handleClick(file)"
        >
          <i class="fm-icon-document" />{{ file.name }}
        </a>
        <label class="fm-upload-list__item-status-label">
          <i
            :class="{
              'fm-icon-upload-success': true,
              'fm-icon-circle-check': listType === 'text',
              'fm-icon-check': ['picture-card', 'picture'].indexOf(listType) > -1
            }"
          />
        </label>
        <i
          v-if="!disabled"
          class="fm-icon-close"
          @click="$emit('remove', file)"
        />
        <i
          v-if="!disabled"
          class="fm-icon-close-tip"
        >{{ t('el.upload.deleteTip') }}</i> <!--因为close按钮只在li:focus的时候 display, li blur后就不存在了，所以键盘导航时永远无法 focus到 close按钮上-->
        <fm-progress
          v-if="file.status === 'uploading'"
          :type="listType === 'picture-card' ? 'circle' : 'line'"
          :stroke-width="listType === 'picture-card' ? 6 : 2"
          :percentage="parsePercentage(file.percentage)"
        />
        <span
          v-if="listType === 'picture-card'"
          class="fm-upload-list__item-actions"
        >
          <span
            v-if="handlePreview && listType === 'picture-card'"
            class="fm-upload-list__item-preview"
            @click="handlePreview(file)"
          >
            <i class="fm-icon-zoom-in" />
          </span>
          <span
            v-if="!disabled"
            class="fm-upload-list__item-delete"
            @click="$emit('remove', file)"
          >
            <i class="fm-icon-delete" />
          </span>
        </span>
      </slot>
    </li>
  </transition-group>
</template>
<script>
import Locale from '../../../js/mixins/locale'
import FmProgress from 'element-ui/packages/progress'

export default {

  name: 'FmUploadList',
  components: { FmProgress },

  mixins: [Locale],

  props: {
    files: {
      type: Array,
      default() {
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

  data() {
    return {
      focusing: false
    }
  },
  methods: {
    parsePercentage(val) {
      return parseInt(val, 10)
    },
    handleClick(file) {
      this.handlePreview && this.handlePreview(file)
    }
  }
}
</script>
