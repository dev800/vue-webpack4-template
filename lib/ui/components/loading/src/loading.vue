<template>
  <transition
    name="ui-loading-fade"
    @after-leave="handleAfterLeave"
  >
    <div
      v-show="visible"
      class="ui-loading-mask"
      :style="{ backgroundColor: background || '' }"
      :class="[customClass, { 'is-fullscreen': fullscreen }]"
    >
      <div class="ui-loading-spinner">
        <svg-icon
          class="animated spin infinite"
          :icon-class="spinner ? spinner : 'solid-loading'"
        ></svg-icon>
        <p
          v-if="text"
          class="ui-loading-text"
        >
          {{ text }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      text: null,
      spinner: null,
      background: null,
      fullscreen: true,
      visible: false,
      customClass: ''
    }
  },

  methods: {
    handleAfterLeave () {
      this.$emit('after-leave')
    },
    setText (text) {
      this.text = text
    }
  }
}
</script>
