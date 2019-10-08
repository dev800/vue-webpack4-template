<script>
import Clickoutside from '../../../js/utils/clickoutside'
import Emitter from '../../../js/mixins/emitter'
import Migrating from '../../../js/mixins/migrating'
import UiButton from '../../button'
import UiButtonGroup from '../../button-group'
import { generateId } from '../../../js/utils/util'

export default {
  name: 'UiDropdown',

  componentName: 'UiDropdown',

  directives: { Clickoutside },

  components: {
    UiButton,
    UiButtonGroup
  },

  mixins: [Emitter, Migrating],

  provide () {
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

  data () {
    return {
      timeout: null,
      visible: false,
      triggerUim: null,
      menuItems: null,
      menuItemsArray: null,
      dropdownUim: null,
      focusing: false,
      listId: `dropdown-menu-${generateId()}`
    }
  },

  computed: {
    dropdownSize () {
      return this.size || (this.$ELEMENT || {}).size
    }
  },

  watch: {
    visible (val) {
      this.broadcast('UiDropdownMenu', 'visible', val)
      this.$emit('visible-change', val)
    },
    focusing (val) {
      const selfDefine = this.$el.querySelector('.ui-dropdown-selfdefine')
      if (selfDefine) { // 自定义
        if (val) {
          selfDefine.className += ' focusing'
        } else {
          selfDefine.className = selfDefine.className.replace('focusing', '')
        }
      }
    }
  },

  mounted () {
    this.$on('menu-item-click', this.handleMenuItemClick)
  },

  methods: {
    getMigratingConfig () {
      return {
        props: {
          'menu-align': 'menu-align is renamed to placement.'
        }
      }
    },
    show () {
      if (this.triggerUim.disabled) return
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.visible = true
      }, this.trigger === 'click' ? 0 : this.showTimeout)
    },
    hide () {
      if (this.triggerUim.disabled) return
      this.removeTabindex()
      if (this.tabindex >= 0) {
        this.resetTabindex(this.triggerUim)
      }
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.visible = false
      }, this.trigger === 'click' ? 0 : this.hideTimeout)
    },
    handleClick () {
      if (this.triggerUim.disabled) return
      if (this.visible) {
        this.hide()
      } else {
        this.show()
      }
    },
    handleTriggerKeyDown (ev) {
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
    handleItemKeyDown (ev) {
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
        this.triggerUimFocus()
        target.click()
        if (this.hideOnClick) { // click关闭
          this.visible = false
        }
      } else if ([9, 27].indexOf(keyCode) > -1) { // tab // esc
        this.hide()
        this.triggerUimFocus()
      }
    },
    resetTabindex (ele) { // 下次tab时组件聚焦元素
      this.removeTabindex()
      ele.setAttribute('tabindex', '0') // 下次期望的聚焦元素
    },
    removeTabindex () {
      this.triggerUim.setAttribute('tabindex', '-1')
      this.menuItemsArray.forEach((item) => {
        item.setAttribute('tabindex', '-1')
      })
    },
    initAria () {
      this.dropdownUim.setAttribute('id', this.listId)
      this.triggerUim.setAttribute('aria-haspopup', 'list')
      this.triggerUim.setAttribute('aria-controls', this.listId)

      if (!this.splitButton) { // 自定义
        this.triggerUim.setAttribute('role', 'button')
        this.triggerUim.setAttribute('tabindex', this.tabindex)
        this.triggerUim.setAttribute('class', (this.triggerUim.getAttribute('class') || '') + ' ui-dropdown-selfdefine') // 控制
      }
    },
    initEvent () {
      const { trigger, show, hide, handleClick, splitButton, handleTriggerKeyDown, handleItemKeyDown } = this
      this.triggerUim = splitButton
        ? this.$refs.trigger.$el
        : this.$slots.default[0].elm

      const dropdownUim = this.dropdownUim

      this.triggerUim.addEventListener('keydown', handleTriggerKeyDown) // triggerUim keydown
      dropdownUim.addEventListener('keydown', handleItemKeyDown, true) // item keydown
      // 控制自定义元素的样式
      if (!splitButton) {
        this.triggerUim.addEventListener('focus', () => {
          this.focusing = true
        })
        this.triggerUim.addEventListener('blur', () => {
          this.focusing = false
        })
        this.triggerUim.addEventListener('click', () => {
          this.focusing = false
        })
      }
      if (trigger === 'hover') {
        this.triggerUim.addEventListener('mouseenter', show)
        this.triggerUim.addEventListener('mouseleave', hide)
        dropdownUim.addEventListener('mouseenter', show)
        dropdownUim.addEventListener('mouseleave', hide)
      } else if (trigger === 'click') {
        this.triggerUim.addEventListener('click', handleClick)
      }
    },
    handleMenuItemClick (command, instance) {
      if (this.hideOnClick) {
        this.visible = false
      }
      this.$emit('command', command, instance)
    },
    triggerUimFocus () {
      this.triggerUim.focus && this.triggerUim.focus()
    },
    initDomOperation () {
      this.dropdownUim = this.popperUim
      this.menuItems = this.dropdownUim.querySelectorAll("[tabindex='-1']")
      this.menuItemsArray = [].slice.call(this.menuItems)

      this.initEvent()
      this.initAria()
    }
  },

  render (h) {
    const { hide, splitButton, type, dropdownSize } = this

    const handleMainButtonClick = (event) => {
      this.$emit('click', event)
      hide()
    }

    const triggerUim = !splitButton
      ? this.$slots.default
      : (<ui-button-group>
        <ui-button type={type} size={dropdownSize} nativeOn-click={handleMainButtonClick}>
          {this.$slots.default}
        </ui-button>
        <ui-button ref="trigger" type={type} size={dropdownSize} class="ui-dropdown__caret-button">
          <svg-icon
            icon-class="solid-chevron-right"
            class="ui-dropdown__icon"
          ></svg-icon>
        </ui-button>
      </ui-button-group>)

    return (
      <div class="ui-dropdown" v-clickoutside={hide}>
        {triggerUim}
        {this.$slots.dropdown}
      </div>
    )
  }
}
</script>
