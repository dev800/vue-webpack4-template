<template>
  <transition
    name="fm-zoom-in-top"
    @after-leave="doDestroy"
  >
    <div
      v-show="showPopper"
      class="fm-autocomplete-suggestion fm-popper"
      :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region"
    >
      <fm-scrollbar
        tag="ul"
        wrap-class="fm-autocomplete-suggestion__wrap"
        view-class="fm-autocomplete-suggestion__list"
      >
        <li v-if="!parent.hideLoading && parent.loading">
          <i class="fm-icon-loading" />
        </li>
        <slot v-else />
      </fm-scrollbar>
    </div>
  </transition>
</template>
<script>
import Popper from '../../../js/utils/vue-popper'
import Emitter from '../../../js/mixins/emitter'
import FmScrollbar from '../../scrollbar'

export default {
  components: { FmScrollbar },
  mixins: [Popper, Emitter],

  componentName: 'FmAutocompleteSuggestions',

  props: {
    options: {
      type: Object,
      default () {
        return {
          gpuAcceleration: false
        }
      }
    },
    id: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      parent: this.$parent,
      dropdownWidth: ''
    }
  },

  updated () {
    this.$nextTick(_ => {
      this.popperJS && this.updatePopper()
    })
  },

  mounted () {
    this.$parent.popperFmm = this.popperFmm = this.$el
    this.referenceFmm = this.$parent.$refs.input.$refs.input
    this.referenceList = this.$el.querySelector('.fm-autocomplete-suggestion__list')
    this.referenceList.setAttribute('role', 'listbox')
    this.referenceList.setAttribute('id', this.id)
  },

  created () {
    this.$on('visible', (val, inputWidth) => {
      this.dropdownWidth = inputWidth + 'px'
      this.showPopper = val
    })
  },

  methods: {
    select (item) {
      this.dispatch('FmAutocomplete', 'item-click', item)
    }
  }
}
</script>
