<template>
  <transition
    name="fm-drawer-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <div
      v-show="visible"
      class="fm-dialog__wrapper"
      role="presentation"
    >
      <div
        class="fm-drawer__container"
        :class="visible && 'fm-drawer__open'"
        role="document"
        tabindex="-1"
        @click.self="handleWrapperClick"
      >
        <div
          ref="drawer"
          aria-modal="true"
          aria-labelledby="fm-drawer__title"
          class="fm-drawer"
          :class="[direction, customClass]"
          :style="isHorizontal ? `width: ${size}` : `height: ${size}`"
          role="presentation"
        >
          <header
            id="fm-drawer__title"
            class="fm-drawer__header"
          >
            <slot name="title">
              <span role="heading">{{ title }}</span>
            </slot>
            <button
              v-if="showClose"
              :aria-label="`close ${title || 'drawer'}`"
              class="fm-drawer__close-btn"
              type="button"
              @click="closeDrawer"
            >
              <svg-icon
                icon-class="solid-times"
                class="fm-dialog__close"
              ></svg-icon>
            </button>
          </header>
          <section
            v-if="rendered"
            class="fm-drawer__body"
          >
            <slot />
          </section>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from '../../../js/utils/popup'
import Migrating from '../../../js/mixins/migrating'
import emitter from '../../../js/mixins/emitter'

export default {
  name: 'FmDrawer',
  mixins: [Popup, emitter, Migrating],
  props: {
    appendToBody: {
      type: Boolean,
      default: true
    },
    beforeClose: {
      type: Function
    },
    customClass: {
      type: String,
      default: ''
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'rtl',
      validator (val) {
        return ['ltr', 'rtl', 'ttb', 'btt'].indexOf(val) !== -1
      }
    },
    showClose: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: '30%'
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean
    },
    wrapperClosable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      closed: false
    }
  },
  computed: {
    isHorizontal () {
      return this.direction === 'rtl' || this.direction === 'ltr'
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.closed = false
        this.$emit('open')
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
      } else {
        if (!this.closed) this.$emit('close')
      }
    }
  },
  mounted () {
    if (this.visible) {
      this.rendered = true
      this.open()
    }
  },
  destroyed () {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  methods: {
    afterEnter () {
      this.$emit('opened')
    },
    afterLeave () {
      this.$emit('closed')
    },
    hide (cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        this.$emit('close')
        if (this.destroyOnClose === true) {
          this.rendered = false
        }
        this.closed = true
      }
    },
    handleWrapperClick () {
      if (this.wrapperClosable) {
        this.closeDrawer()
      }
    },
    closeDrawer () {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    }
  }
}
</script>
