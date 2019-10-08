<template>
  <li class="fm-timeline-item">
    <div class="fm-timeline-item__tail" />

    <div
      v-if="!$slots.dot"
      class="fm-timeline-item__node"
      :class="[
        `fm-timeline-item__node--${size || ''}`,
        `fm-timeline-item__node--${type || ''}`
      ]"
      :style="{
        backgroundColor: color
      }"
    >
      <svg-icon
        v-if="icon"
        class="fm-timeline-item__icon"
        :icon-class="icon"
      ></svg-icon>
    </div>
    <div
      v-if="$slots.dot"
      class="fm-timeline-item__dot"
    >
      <slot name="dot" />
    </div>

    <div class="fm-timeline-item__wrapper">
      <div
        v-if="!hideTimestamp && placement === 'top'"
        class="fm-timeline-item__timestamp is-top"
      >
        {{ timestamp }}
      </div>

      <div class="fm-timeline-item__content">
        <slot />
      </div>

      <div
        v-if="!hideTimestamp && placement === 'bottom'"
        class="fm-timeline-item__timestamp is-bottom"
      >
        {{ timestamp }}
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'FmTimelineItem',

  inject: ['timeline'],

  props: {
    timestamp: String,

    hideTimestamp: {
      type: Boolean,
      default: false
    },

    placement: {
      type: String,
      default: 'bottom'
    },

    type: String,

    color: String,

    size: {
      type: String,
      default: 'normal'
    },

    icon: String
  }
}
</script>
