<template>
  <transition name="fm-alert-fade">
    <div
      v-show="visible"
      class="fm-alert"
      :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]"
      role="alert"
    >
      <i
        v-if="showIcon"
        class="fm-alert__icon"
        :class="[ iconClass, isBigIcon ]"
      />
      <div class="fm-alert__content">
        <span
          v-if="title || $slots.title"
          class="fm-alert__title"
          :class="[ isBoldTitle ]"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p
          v-if="$slots.default && !description"
          class="fm-alert__description"
        >
          <slot />
        </p>
        <p
          v-if="description && !$slots.default"
          class="fm-alert__description"
        >
          {{ description }}
        </p>
        <i
          v-show="closable"
          class="fm-alert__closebtn"
          :class="{ 'is-customed': closeText !== '', 'fm-icon-close': closeText === '' }"
          @click="close()"
        >{{ closeText }}</i>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
const TYPE_CLASSES_MAP = {
  success: 'fm-icon-success',
  warning: 'fm-icon-warning',
  error: 'fm-icon-error'
}
export default {
  name: 'FmAlert',

  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'info'
    },
    closable: {
      type: Boolean,
      default: true
    },
    closeText: {
      type: String,
      default: ''
    },
    showIcon: Boolean,
    center: Boolean,
    effect: {
      type: String,
      default: 'light',
      validator: function(value) {
        return ['light', 'dark'].indexOf(value) !== -1
      }
    }
  },

  data() {
    return {
      visible: true
    }
  },

  computed: {
    typeClass() {
      return `fm-alert--${this.type}`
    },

    iconClass() {
      return TYPE_CLASSES_MAP[this.type] || 'fm-icon-info'
    },

    isBigIcon() {
      return this.description || this.$slots.default ? 'is-big' : ''
    },

    isBoldTitle() {
      return this.description || this.$slots.default ? 'is-bold' : ''
    }
  },

  methods: {
    close() {
      this.visible = false
      this.$emit('close')
    }
  }
}
</script>
