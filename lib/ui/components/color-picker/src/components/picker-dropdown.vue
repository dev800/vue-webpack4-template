<template>
  <transition
    name="ui-zoom-in-top"
    @after-leave="doDestroy"
  >
    <div
      v-show="showPopper"
      class="ui-color-dropdown"
    >
      <div class="ui-color-dropdown__main-wrapper">
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
      <div class="ui-color-dropdown__btns">
        <span class="ui-color-dropdown__value">
          <ui-input
            v-model="customInput"
            :validate-event="false"
            size="mini"
            @keyup.native.enter="handleConfirm"
            @blur="handleConfirm"
          />
        </span>
        <ui-button
          size="mini"
          type="text"
          class="ui-color-dropdown__link-btn"
          @click="$emit('clear')"
        >
          {{ t('ui.colorpicker.clear') }}
        </ui-button>
        <ui-button
          plain
          size="mini"
          class="ui-color-dropdown__btn"
          @click="confirmValue"
        >
          {{ t('ui.colorpicker.confirm') }}
        </ui-button>
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
import UiInput from '../../input'
import UiButton from '../../button'

export default {
  name: 'UiColorPickerDropdown',

  components: {
    SvPanel,
    HueSlider,
    AlphaSlider,
    UiInput,
    UiButton,
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

  data () {
    return {
      customInput: ''
    }
  },

  computed: {
    currentColor () {
      const parent = this.$parent
      return !parent.value && !parent.showPanelColor ? '' : parent.color.value
    }
  },

  watch: {
    showPopper (val) {
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
      handler (val) {
        this.customInput = val
      }
    }
  },

  mounted () {
    this.$parent.popperUim = this.popperUim = this.$el
    this.referenceUim = this.$parent.$el
  },

  methods: {
    confirmValue () {
      this.$emit('pick')
    },

    handleConfirm () {
      this.color.fromString(this.customInput)
    }
  }
}
</script>
