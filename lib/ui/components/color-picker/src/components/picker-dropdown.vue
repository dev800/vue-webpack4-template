<template>
  <transition
    name="fm-zoom-in-top"
    @after-leave="doDestroy"
  >
    <div
      v-show="showPopper"
      class="fm-color-dropdown"
    >
      <div class="fm-color-dropdown__main-wrapper">
        <hue-slider
          ref="hue"
          :color="color"
          vertical
          style="float: right;"
        />
        <sv-panel
          ref="sl"
          :color="color"
        />
      </div>
      <alpha-slider
        v-if="showAlpha"
        ref="alpha"
        :color="color"
      />
      <predefine
        v-if="predefine"
        :color="color"
        :colors="predefine"
      />
      <div class="fm-color-dropdown__btns">
        <span class="fm-color-dropdown__value">
          <fm-input
            v-model="customInput"
            :validate-event="false"
            size="mini"
            @keyup.native.enter="handleConfirm"
            @blur="handleConfirm"
          />
        </span>
        <fm-button
          size="mini"
          type="text"
          class="fm-color-dropdown__link-btn"
          @click="$emit('clear')"
        >
          {{ t('el.colorpicker.clear') }}
        </fm-button>
        <fm-button
          plain
          size="mini"
          class="fm-color-dropdown__btn"
          @click="confirmValue"
        >
          {{ t('el.colorpicker.confirm') }}
        </fm-button>
      </div>
    </div>
  </transition>
</template>

<script>
import SvPanel from './sv-panel'
import HueSlider from './hue-slider'
import AlphaSlider from './alpha-slider'
import Predefine from './predefine'
import Popper from '../../../js/utils/vue-popper'
import Locale from '../../../js/mixins/locale'
import FmInput from '../../input'
import FmButton from '../../button'

export default {
  name: 'FmColorPickerDropdown',

  components: {
    SvPanel,
    HueSlider,
    AlphaSlider,
    FmInput,
    FmButton,
    Predefine
  },

  mixins: [Popper, Locale],

  props: {
    color: {
      required: true
    },
    showAlpha: Boolean,
    predefine: Array
  },

  data() {
    return {
      customInput: ''
    }
  },

  computed: {
    currentColor() {
      const parent = this.$parent
      return !parent.value && !parent.showPanelColor ? '' : parent.color.value
    }
  },

  watch: {
    showPopper(val) {
      if (val === true) {
        this.$nextTick(() => {
          const { sl, hue, alpha } = this.$refs
          sl && sl.update()
          hue && hue.update()
          alpha && alpha.update()
        })
      }
    },

    currentColor: {
      immediate: true,
      handler(val) {
        this.customInput = val
      }
    }
  },

  mounted() {
    this.$parent.popperFmm = this.popperFmm = this.$el
    this.referenceFmm = this.$parent.$el
  },

  methods: {
    confirmValue() {
      this.$emit('pick')
    },

    handleConfirm() {
      this.color.fromString(this.customInput)
    }
  }
}
</script>
