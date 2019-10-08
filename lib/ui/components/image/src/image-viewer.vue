<template>
  <transition name="viewer-fade">
    <div
      class="fm-image-viewer__wrapper"
      :style="{ 'z-index': zIndex }"
    >
      <div class="fm-image-viewer__mask" />
      <!-- CLOSE -->
      <span
        class="fm-image-viewer__btn fm-image-viewer__close"
        @click="hide"
      >
        <svg-icon icon-class="solid-times-circle"></svg-icon>
      </span>
      <!-- ARROW -->
      <template v-if="!isSingle">
        <span
          class="fm-image-viewer__btn fm-image-viewer__prev"
          :class="{ 'is-disabled': !infinite && isFirst }"
          @click="prev"
        >
          <svg-icon icon-class="solid-angle-left"></svg-icon>
        </span>
        <span
          class="fm-image-viewer__btn fm-image-viewer__next"
          :class="{ 'is-disabled': !infinite && isLast }"
          @click="next"
        >
          <svg-icon icon-class="solid-angle-right"></svg-icon>
        </span>
        </span>
      </template>
      <!-- ACTIONS -->
      <div class="fm-image-viewer__btn fm-image-viewer__actions">
        <div class="fm-image-viewer__actions__inner">
          <svg-icon
            icon-class="regular-zoom-out"
            @click="handleActions('zoomOut')"
          ></svg-icon>
          <svg-icon
            icon-class="regular-zoom-in"
            @click="handleActions('zoomIn')"
          ></svg-icon>
          <i class="fm-image-viewer__actions__divider" />
          <svg-icon
            :icon-class="mode.icon"
            @click="toggleMode"
          ></svg-icon>
          <i class="fm-image-viewer__actions__divider" />
          <svg-icon
            icon-class="regular-refresh-left"
            @click="handleActions('antiCloceLise')"
          ></svg-icon>
          <svg-icon
            icon-class="regular-refresh-right"
            @click="handleActions('cloceLise')"
          ></svg-icon>
        </div>
      </div>
      <!-- CANVAS -->
      <div class="fm-image-viewer__canvas">
        <img
          v-for="(url, i) in urlList"
          v-if="i === index"
          ref="img"
          :key="url"
          class="fm-image-viewer__img"
          :src="currentImg"
          :style="imgStyle"
          @load="handleImgLoad"
          @error="handleImgError"
          @mousedown="handleMouseDown"
        >
      </div>
    </div>
  </transition>
</template>

<script>
import { on, off } from '../../../js/utils/dom'
import { rafThrottle, isFirefox } from '../../../js/utils/util'

const Mode = {
  CONTAIN: {
    name: 'contain',
    icon: 'fm-icon-full-screen'
  },
  ORIGINAL: {
    name: 'original',
    icon: 'fm-icon-c-scale-to-original'
  }
}

const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel'

export default {
  name: 'FmImageViewer',

  props: {
    urlList: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: 2000
    },
    onSwitch: {
      type: Function,
      default: () => { }
    },
    onClose: {
      type: Function,
      default: () => { }
    }
  },

  data () {
    return {
      index: 0,
      isShow: false,
      infinite: true,
      loading: false,
      mode: Mode.CONTAIN,
      transform: {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      }
    }
  },
  computed: {
    isSingle () {
      return this.urlList.length <= 1
    },
    isFirst () {
      return this.index === 0
    },
    isLast () {
      return this.index === this.urlList.length - 1
    },
    currentImg () {
      return this.urlList[this.index]
    },
    imgStyle () {
      const { scale, deg, offsetX, offsetY, enableTransition } = this.transform
      const style = {
        transform: `scale(${scale}) rotate(${deg}deg)`,
        transition: enableTransition ? 'transform .3s' : '',
        'margin-left': `${offsetX}px`,
        'margin-top': `${offsetY}px`
      }
      if (this.mode === Mode.CONTAIN) {
        style.maxWidth = style.maxHeight = '100%'
      }
      return style
    }
  },
  watch: {
    index: {
      handler: function (val) {
        this.reset()
        this.onSwitch(val)
      }
    },
    currentImg (val) {
      this.$nextTick(_ => {
        const $img = this.$refs.img[0]
        if (!$img.complete) {
          this.loading = true
        }
      })
    }
  },
  mounted () {
    this.deviceSupportInstall()
  },
  methods: {
    hide () {
      this.deviceSupportUninstall()
      this.onClose()
    },
    deviceSupportInstall () {
      this._keyDownHandler = rafThrottle(e => {
        const keyCode = e.keyCode
        switch (keyCode) {
          // ESC
          case 27:
            this.hide()
            break
          // SPACE
          case 32:
            this.toggleMode()
            break
          // LEFT_ARROW
          case 37:
            this.prev()
            break
          // UP_ARROW
          case 38:
            this.handleActions('zoomIn')
            break
          // RIGHT_ARROW
          case 39:
            this.next()
            break
          // DOWN_ARROW
          case 40:
            this.handleActions('zoomOut')
            break
        }
      })
      this._mouseWheelHandler = rafThrottle(e => {
        const delta = e.wheelDelta ? e.wheelDelta : -e.detail
        if (delta > 0) {
          this.handleActions('zoomIn', {
            zoomRate: 0.015,
            enableTransition: false
          })
        } else {
          this.handleActions('zoomOut', {
            zoomRate: 0.015,
            enableTransition: false
          })
        }
      })
      on(document, 'keydown', this._keyDownHandler)
      on(document, mousewheelEventName, this._mouseWheelHandler)
    },
    deviceSupportUninstall () {
      off(document, 'keydown', this._keyDownHandler)
      off(document, mousewheelEventName, this._mouseWheelHandler)
      this._keyDownHandler = null
      this._mouseWheelHandler = null
    },
    handleImgLoad (e) {
      this.loading = false
    },
    handleImgError (e) {
      this.loading = false
      e.target.alt = '加载失败'
    },
    handleMouseDown (e) {
      if (this.loading || e.button !== 0) return

      const { offsetX, offsetY } = this.transform
      const startX = e.pageX
      const startY = e.pageY
      this._dragHandler = rafThrottle(ev => {
        this.transform.offsetX = offsetX + ev.pageX - startX
        this.transform.offsetY = offsetY + ev.pageY - startY
      })
      on(document, 'mousemove', this._dragHandler)
      on(document, 'mouseup', ev => {
        off(document, 'mousemove', this._dragHandler)
      })

      e.preventDefault()
    },
    reset () {
      this.transform = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      }
    },
    toggleMode () {
      if (this.loading) return

      const modeNames = Object.keys(Mode)
      const modeValues = Object.values(Mode)
      const index = modeValues.indexOf(this.mode)
      const nextIndex = (index + 1) % modeNames.length
      this.mode = Mode[modeNames[nextIndex]]
      this.reset()
    },
    prev () {
      if (this.isFirst && !this.infinite) return
      const len = this.urlList.length
      this.index = (this.index - 1 + len) % len
    },
    next () {
      if (this.isLast && !this.infinite) return
      const len = this.urlList.length
      this.index = (this.index + 1) % len
    },
    handleActions (action, options = {}) {
      if (this.loading) return
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: 0.2,
        rotateDeg: 90,
        enableTransition: true,
        ...options
      }
      const { transform } = this
      switch (action) {
        case 'zoomOut':
          if (transform.scale > 0.2) {
            transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3))
          }
          break
        case 'zoomIn':
          transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3))
          break
        case 'cloceLise':
          transform.deg += rotateDeg
          break
        case 'antiCloceLise':
          transform.deg -= rotateDeg
          break
      }
      transform.enableTransition = enableTransition
    }
  }
}
</script>
