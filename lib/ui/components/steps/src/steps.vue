<template>
  <div
    class="fm-steps"
    :class="[
      !simple && 'fm-steps--' + direction,
      simple && 'fm-steps--simple'
    ]"
  >
    <slot />
  </div>
</template>

<script>
import Migrating from '../../../js/mixins/migrating'

export default {
  name: 'FmSteps',

  mixins: [Migrating],

  props: {
    space: [Number, String],
    active: Number,
    direction: {
      type: String,
      default: 'horizontal'
    },
    alignCenter: Boolean,
    simple: Boolean,
    finishStatus: {
      type: String,
      default: 'finish'
    },
    processStatus: {
      type: String,
      default: 'process'
    }
  },

  data() {
    return {
      steps: [],
      stepOffset: 0
    }
  },

  watch: {
    active(newVal, oldVal) {
      this.$emit('change', newVal, oldVal)
    },

    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index
      })
    }
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          center: 'center is removed.'
        }
      }
    }
  }
}
</script>
