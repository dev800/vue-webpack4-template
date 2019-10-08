<template>
  <transition name="fm-notification-fade">
    <div
      v-show="visible"
      :class="['fm-notification', customClass, horizontalClass]"
      :style="positionStyle"
      role="alert"
      @mouseenter="clearTimer()"
      @mouseleave="startTimer()"
      @click="click"
    >
      <svg-icon
        v-if="type || iconClass"
        class="fm-notification__icon"
        :class="presentIconTypeClass"
        :icon-class="presentIconClass"
      ></svg-icon>
      <div
        class="fm-notification__group"
        :class="{ 'is-with-icon': !!(typeClass || iconClass) }"
      >
        <h2
          class="fm-notification__title"
          v-text="title"
        />
        <div
          v-show="message"
          class="fm-notification__content"
        >
          <slot>
            <p v-if="!dangerouslyUseHTMLString">
              {{ message }}
            </p>
            <p
              v-else
              v-html="message"
            />
          </slot>
        </div>
        <svg-icon
          v-if="showClose"
          class="fm-notification__close-btn"
          icon-class="solid-times"
          @click.stop="close"
        ></svg-icon>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
const typeMap = {
  success: 'solid-check-circle',
  info: 'solid-info-circle',
  warning: 'solid-exclamation-circle',
  error: 'solid-times-circle'
}

export default {
  data () {
    return {
      visible: false,
      title: '',
      message: '',
      duration: 4500,
      type: '',
      showClose: true,
      customClass: '',
      iconClass: '',
      onClose: null,
      onClick: null,
      closed: false,
      verticalOffset: 0,
      timer: null,
      dangerouslyUseHTMLString: false,
      position: 'top-right'
    }
  },

  computed: {
    presentIconTypeClass () {
      return `icon_type-${this.type}`
    },

    presentIconClass () {
      if (this.typeClass !== '') {
        return this.typeClass
      } else {
        return this.iconClass
      }
    },

    typeClass () {
      return this.type && typeMap[this.type] ? `${typeMap[this.type]}` : ''
    },

    horizontalClass () {
      return this.position.indexOf('right') > -1 ? 'right' : 'left'
    },

    verticalProperty () {
      return /^top-/.test(this.position) ? 'top' : 'bottom'
    },

    positionStyle () {
      return {
        [this.verticalProperty]: `${this.verticalOffset}px`
      }
    }
  },

  watch: {
    closed (newVal) {
      if (newVal) {
        this.visible = false
        this.$el.addEventListener('transitionend', this.destroyFmement)
      }
    }
  },
  mounted () {
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        if (!this.closed) {
          this.close()
        }
      }, this.duration)
    }
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.keydown)
  },

  methods: {
    destroyFmement () {
      this.$el.removeEventListener('transitionend', this.destroyFmement)
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },

    click () {
      if (typeof this.onClick === 'function') {
        this.onClick()
      }
    },

    close () {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose()
      }
    },

    clearTimer () {
      clearTimeout(this.timer)
    },

    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },
    keydown (e) {
      if (e.keyCode === 46 || e.keyCode === 8) {
        this.clearTimer() // detele 取消倒计时
      } else if (e.keyCode === 27) { // esc关闭消息
        if (!this.closed) {
          this.close()
        }
      } else {
        this.startTimer() // 恢复倒计时
      }
    }
  }
}
</script>
