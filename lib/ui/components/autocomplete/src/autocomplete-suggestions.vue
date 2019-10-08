<template>
  <transition
    name="ui-zoom-in-top"
    @after-leave="doDestroy"
  >
    <div
      v-show="showPopper"
      class="ui-autocomplete-suggestion ui-popper"
      :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region"
    >
      <ui-scrollbar
        tag="ul"
        wrap-class="ui-autocomplete-suggestion__wrap"
        view-class="ui-autocomplete-suggestion__list"
      >
        <li v-if="!parent.hideLoading && parent.loading">
          <svg-icon
            icon-class="solid-loading"
            class="animated spin infinite"
          ></svg-icon>
        </li>
        <slot v-else />
      </ui-scrollbar>
    </div>
  </transition>
</template>
<script>
import Popper from '../../../js/utils/vue-popper'
import Emitter from '../../../js/mixins/emitter'
import UiScrollbar from '../../scrollbar'

export default {
  components: { UiScrollbar },
  mixins: [Popper, Emitter],

  componentName: 'UiAutocompleteSuggestions',

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
    this.$parent.popperUim = this.popperUim = this.$el
    this.referenceUim = this.$parent.$refs.input.$refs.input
    this.referenceList = this.$el.querySelector('.ui-autocomplete-suggestion__list')
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
      this.dispatch('UiAutocomplete', 'item-click', item)
    }
  }
}
</script>
