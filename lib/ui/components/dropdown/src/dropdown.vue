<script>
import Clickoutside from '../../../js/utils/clickoutside'
import Emitter from '../../../js/mixins/emitter'
import Migrating from '../../../js/mixins/migrating'
import FmButton from '../../button'
import FmButtonGroup from '../../button-group'
import { generateId } from '../../../js/utils/util'

export default {
  name: 'FmDropdown',

  componentName: 'FmDropdown',

  directives: { Clickoutside },

  components: {
    FmButton,
    FmButtonGroup
  },

  mixins: [Emitter, Migrating],

  provide() {
    return {
      dropdown: this
    }
  },

  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    type: String,
    size: {
      type: String,
      default: ''
    },
    splitButton: Boolean,
    hideOnClick: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'bottom-end'
    },
    visibleArrow: {
      default: true
    },
    showTimeout: {
      type: Number,
      default: 250
    },
    hideTimeout: {
      type: Number,
      default: 150
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      timeout: null,
      visible: false,
      triggerFmm: null,
      menuItems: null,
      menuItemsArray: null,
      dropdownFmm: null,
      focusing: false,
      listId: `dropdown-menu-${generateId()}`
    }
  },

  computed: {
    dropdownSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  },

  watch: {
    visible(val) {
      this.broadcast('FmDropdownMenu', 'visible', val)
      this.$emit('visible-change', val)
    },
    focusing(val) {
      const selfDefine = this.$el.querySelector('.fm-dropdown-selfdefine')
      if (selfDefine) { // 自定义
        if (val) {
          selfDefine.className += ' focusing'
        } else {
          selfDefine.className = selfDefine.className.replace('focusing', '')
        }
      }
    }
  },

  mounted() {
    this.$on('menu-item-click', this.handleMenuItemClick)
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          'menu-align': 'menu-align is renamed to placement.'
        }
      }
    },
    show() {
      if (this.triggerFmm.disabled) return
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.visible = true
      }, this.trigger === 'click' ? 0 : this.showTimeout)
    },
    hide() {
      if (this.triggerFmm.disabled) return
      this.removeTabindex()
      if (this.tabindex >= 0) {
        this.resetTabindex(this.triggerFmm)
      }
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.visible = false
      }, this.trigger === 'click' ? 0 : this.hideTimeout)
    },
    handleClick() {
      if (this.triggerFmm.disabled) return
      if (this.visible) {
        this.hide()
      } else {
        this.show()
      }
    },
    handleTriggerKeyDown(ev) {
      const keyCode = ev.keyCode
      if ([38, 40].indexOf(keyCode) > -1) { // up/down
        this.removeTabindex()
        this.resetTabindex(this.menuItems[0])
        this.menuItems[0].focus()
        ev.preventDefault()
        ev.stopPropagation()
      } else if (keyCode === 13) { // space enter选中
        this.handleClick()
      } else if ([9, 27].indexOf(keyCode) > -1) { // tab || esc
        this.hide()
      }
    },
    handleItemKeyDown(ev) {
      const keyCode = ev.keyCode
      const target = ev.target
      const currentIndex = this.menuItemsArray.indexOf(target)
      const max = this.menuItemsArray.length - 1
      let nextIndex
      if ([38, 40].indexOf(keyCode) > -1) { // up/down
        if (keyCode === 38) { // up
          nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0
        } else { // down
          nextIndex = currentIndex < max ? currentIndex + 1 : max
        }
        this.removeTabindex()
        this.resetTabindex(this.menuItems[nextIndex])
        this.menuItems[nextIndex].focus()
        ev.preventDefault()
        ev.stopPropagation()
      } else if (keyCode === 13) { // enter选中
        this.triggerFmmFocus()
        target.click()
        if (this.hideOnClick) { // click关闭
          this.visible = false
        }
      } else if ([9, 27].indexOf(keyCode) > -1) { // tab // esc
        this.hide()
        this.triggerFmmFocus()
      }
    },
    resetTabindex(ele) { // 下次tab时组件聚焦元素
      this.removeTabindex()
      ele.setAttribute('tabindex', '0') // 下次期望的聚焦元素
    },
    removeTabindex() {
      this.triggerFmm.setAttribute('tabindex', '-1')
      this.menuItemsArray.forEach((item) => {
        item.setAttribute('tabindex', '-1')
      })
    },
    initAria() {
      this.dropdownFmm.setAttribute('id', this.listId)
      this.triggerFmm.setAttribute('aria-haspopup', 'list')
      this.triggerFmm.setAttribute('aria-controls', this.listId)

      if (!this.splitButton) { // 自定义
        this.triggerFmm.setAttribute('role', 'button')
        this.triggerFmm.setAttribute('tabindex', this.tabindex)
        this.triggerFmm.setAttribute('class', (this.triggerFmm.getAttribute('class') || '') + ' fm-dropdown-selfdefine') // 控制
      }
    },
    initEvent() {
      const { trigger, show, hide, handleClick, splitButton, handleTriggerKeyDown, handleItemKeyDown } = this
      this.triggerFmm = splitButton
        ? this.$refs.trigger.$el
        : this.$slots.default[0].elm

      const dropdownFmm = this.dropdownFmm

      this.triggerFmm.addEventListener('keydown', handleTriggerKeyDown) // triggerFmm keydown
      dropdownFmm.addEventListener('keydown', handleItemKeyDown, true) // item keydown
      // 控制自定义元素的样式
      if (!splitButton) {
        this.triggerFmm.addEventListener('focus', () => {
          this.focusing = true
        })
        this.triggerFmm.addEventListener('blur', () => {
          this.focusing = false
        })
        this.triggerFmm.addEventListener('click', () => {
          this.focusing = false
        })
      }
      if (trigger === 'hover') {
        this.triggerFmm.addEventListener('mouseenter', show)
        this.triggerFmm.addEventListener('mouseleave', hide)
        dropdownFmm.addEventListener('mouseenter', show)
        dropdownFmm.addEventListener('mouseleave', hide)
      } else if (trigger === 'click') {
        this.triggerFmm.addEventListener('click', handleClick)
      }
    },
    handleMenuItemClick(command, instance) {
      if (this.hideOnClick) {
        this.visible = false
      }
      this.$emit('command', command, instance)
    },
    triggerFmmFocus() {
      this.triggerFmm.focus && this.triggerFmm.focus()
    },
    initDomOperation() {
      this.dropdownFmm = this.popperFmm
      this.menuItems = this.dropdownFmm.querySelectorAll("[tabindex='-1']")
      this.menuItemsArray = [].slice.call(this.menuItems)

      this.initEvent()
      this.initAria()
    }
  },

  render(h) {
    const { hide, splitButton, type, dropdownSize } = this

    const handleMainButtonClick = (event) => {
      this.$emit('click', event)
      hide()
    }

    const triggerFmm = !splitButton
      ? this.$slots.default
      : (<fm-button-group>
        <fm-button type={type} size={dropdownSize} nativeOn-click={handleMainButtonClick}>
          {this.$slots.default}
        </fm-button>
        <fm-button ref="trigger" type={type} size={dropdownSize} class="fm-dropdown__caret-button">
          <i class="fm-dropdown__icon fm-icon-ios-arrow-down"></i>
        </fm-button>
      </fm-button-group>)

    return (
      <div class="fm-dropdown" v-clickoutside={hide}>
        {triggerFmm}
        {this.$slots.dropdown}
      </div>
    )
  }
}
</script>
