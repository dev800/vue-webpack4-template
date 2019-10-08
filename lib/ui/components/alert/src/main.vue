<template>
  <transition name="ui-alert-fade">
    <div
      v-show="visible"
      class="ui-alert"
      :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]"
      role="alert"
    >
      <svg-icon
        v-if="showIcon"
        :icon-class="iconClass"
        class="ui-alert__icon"
        :class="[ isBigIcon ]"
      ></svg-icon>
      <div class="ui-alert__content">
        <span
          v-if="title || $slots.title"
          class="ui-alert__title"
          :class="[ isBoldTitle ]"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p
          v-if="$slots.default && !description"
          class="ui-alert__description"
        >
          <slot />
        </p>
        <p
          v-if="description && !$slots.default"
          class="ui-alert__description"
        >
          {{ description }}
        </p>
        <svg-icon
          v-if="closeText === ''"
          v-show="closable"
          class="ui-alert__closebtn"
          icon-class="solid-times"
          @click="close()"
        />
        <i
          v-else
          v-show="closable"
          class="ui-alert__closebtn is-customed"
          @click="close()"
        >{{ closeText }}</i>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
const TYPE_CLASSES_MAP = {
  success: 'solid-check-circle',
  warning: 'solid-exclamation-circle',
  error: 'solid-times-circle'
}
export default {
  name: 'UiAlert',

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
      validator: function (value) {
        return ['light', 'dark'].indexOf(value) !== -1
      }
    }
  },

  data () {
    return {
      visible: true
    }
  },

  computed: {
    typeClass () {
      return `ui-alert--${this.type}`
    },

    iconClass () {
      return TYPE_CLASSES_MAP[this.type] || 'solid-info-circle'
    },

    isBigIcon () {
      return this.description || this.$slots.default ? 'is-big' : ''
    },

    isBoldTitle () {
      return this.description || this.$slots.default ? 'is-bold' : ''
    }
  },

  methods: {
    close () {
      this.visible = false
      this.$emit('close')
    }
  }
}
</script>
