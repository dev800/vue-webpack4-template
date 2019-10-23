<script>
import UiCollapseTransition from '../../collapse-transition'
import menuMixin from './menu-mixin'
import Emitter from '../../../js/mixins/emitter'
import Popper from '../../../js/utils/vue-popper'

const poperMixins = {
  props: {
    transformOrigin: {
      type: [Boolean, String],
      default: false
    },
    offset: Popper.props.offset,
    boundariesPadding: Popper.props.boundariesPadding,
    popperOptions: Popper.props.popperOptions
  },
  data: Popper.data,
  methods: Popper.methods,
  beforeDestroy: Popper.beforeDestroy,
  deactivated: Popper.deactivated
}

export default {
  name: 'UiSubmenu',

  componentName: 'UiSubmenu',

  components: { UiCollapseTransition },

  mixins: [menuMixin, Emitter, poperMixins],

  props: {
    index: {
      type: String,
      required: true
    },
    showTimeout: {
      type: Number,
      default: 300
    },
    hideTimeout: {
      type: Number,
      default: 300
    },
    popperClass: {
      type: String,
      default: null
    },
    disabled: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: undefined
    }
  },

  data () {
    return {
      popperJS: null,
      timeout: null,
      items: {},
      submenus: {},
      mouseInChild: false
    }
  },
  computed: {
    // popper option
    appendToBody () {
      return this.popperAppendToBody === undefined
        ? this.isFirstLevel
        : this.popperAppendToBody
    },
    menuTransitionName () {
      return this.rootMenu.collapse ? 'ui-zoom-in-left' : 'ui-zoom-in-top'
    },
    opened () {
      return this.rootMenu.openedMenus.indexOf(this.index) > -1
    },
    active () {
      let isActive = false
      const submenus = this.submenus
      const items = this.items

      Object.keys(items).forEach(index => {
        if (items[index].active) {
          isActive = true
        }
      })

      Object.keys(submenus).forEach(index => {
        if (submenus[index].active) {
          isActive = true
        }
      })

      return isActive
    },
    hoverTextColor () {
      if (this.active) {
        return this.rootMenu.mixColor(this.activeTextColor, 0.12)
      } else {
        return this.rootMenu.mixColor(this.textColor, 0.12)
      }
    },
    hoverBackground () {
      return this.rootMenu.hoverBackground
    },
    backgroundColor () {
      return this.rootMenu.backgroundColor || ''
    },
    activeTextColor () {
      return this.rootMenu.activeTextColor || ''
    },
    textColor () {
      return this.rootMenu.textColor || ''
    },
    mode () {
      return this.rootMenu.mode
    },
    isMenuPopup () {
      return this.rootMenu.isMenuPopup
    },
    titleStyle () {
      if (this.mode !== 'horizontal') {
        return {
          color: this.textColor
        }
      }
      return {
        borderBottomColor: this.active
          ? (this.rootMenu.activeTextColor ? this.activeTextColor : '')
          : 'transparent',
        color: this.active
          ? this.activeTextColor
          : this.textColor
      }
    },
    isFirstLevel () {
      let isFirstLevel = true
      let parent = this.$parent
      while (parent && parent !== this.rootMenu) {
        if (['UiSubmenu', 'UiMenuItemGroup'].indexOf(parent.$options.componentName) > -1) {
          isFirstLevel = false
          break
        } else {
          parent = parent.$parent
        }
      }
      return isFirstLevel
    }
  },
  watch: {
    opened (val) {
      if (this.isMenuPopup) {
        this.$nextTick(_ => {
          this.updatePopper()
        })
      }
    }
  },
  created () {
    this.$on('toggle-collapse', this.handleCollapseToggle)
    this.$on('mouse-enter-child', () => {
      this.mouseInChild = true
      clearTimeout(this.timeout)
    })
    this.$on('mouse-leave-child', () => {
      this.mouseInChild = false
      clearTimeout(this.timeout)
    })
  },
  mounted () {
    this.parentMenu.addSubmenu(this)
    this.rootMenu.addSubmenu(this)
    this.initPopper()
  },
  beforeDestroy () {
    this.parentMenu.removeSubmenu(this)
    this.rootMenu.removeSubmenu(this)
  },
  methods: {
    handleCollapseToggle (value) {
      if (value) {
        this.initPopper()
      } else {
        this.doDestroy()
      }
    },
    addItem (item) {
      this.$set(this.items, item.index, item)
    },
    removeItem (item) {
      delete this.items[item.index]
    },
    addSubmenu (item) {
      this.$set(this.submenus, item.index, item)
    },
    removeSubmenu (item) {
      delete this.submenus[item.index]
    },
    handleClick () {
      const { rootMenu, disabled } = this
      if (
        (rootMenu.menuTrigger === 'hover' && rootMenu.mode === 'horizontal') ||
        (rootMenu.collapse && rootMenu.mode === 'vertical') ||
        disabled
      ) {
        return
      }
      this.dispatch('UiMenu', 'submenu-click', this)
    },
    handleMouseenter (event, showTimeout = this.showTimeout) {
      if (!('ActiveXObject' in window) && event.type === 'focus' && !event.relatedTarget) {
        return
      }
      const { rootMenu, disabled } = this
      if (
        (rootMenu.menuTrigger === 'click' && rootMenu.mode === 'horizontal') ||
        (!rootMenu.collapse && rootMenu.mode === 'vertical') ||
        disabled
      ) {
        return
      }
      this.dispatch('UiSubmenu', 'mouse-enter-child')
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.rootMenu.openMenu(this.index, this.indexPath)
      }, showTimeout)

      if (this.appendToBody) {
        this.$parent.$el.dispatchEvent(new MouseEvent('mouseenter'))
      }
    },
    handleMouseleave (deepDispatch = false) {
      const { rootMenu } = this
      if (
        (rootMenu.menuTrigger === 'click' && rootMenu.mode === 'horizontal') ||
        (!rootMenu.collapse && rootMenu.mode === 'vertical')
      ) {
        return
      }
      this.dispatch('UiSubmenu', 'mouse-leave-child')
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        !this.mouseInChild && this.rootMenu.closeMenu(this.index)
      }, this.hideTimeout)

      if (this.appendToBody && deepDispatch) {
        if (this.$parent.$options.name === 'UiSubmenu') {
          this.$parent.handleMouseleave(true)
        }
      }
    },
    handleTitleMouseenter () {
      if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return
      const title = this.$refs['submenu-title']

      if (title) {
        title.style.backgroundColor = this.rootMenu.hoverBackground
      } else {
        this.$el.style.color = this.hoverTextColor
      }
    },
    handleTitleMouseleave () {
      if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return
      const title = this.$refs['submenu-title']

      if (title) {
        title.style.backgroundColor = this.rootMenu.backgroundColor || ''
      } else {
        if (this.active) {
          this.$el.style.color = this.activeTextColor
        } else {
          this.$el.style.color = this.textColor
        }
      }
    },
    updatePlacement () {
      this.currentPlacement = this.mode === 'horizontal' && this.isFirstLevel
        ? 'bottom-start'
        : 'right-start'
    },
    initPopper () {
      this.referenceUim = this.$el
      this.popperUim = this.$refs.menu
      this.updatePlacement()
    }
  },
  render (h) {
    const {
      active,
      opened,
      paddingStyle,
      titleStyle,
      backgroundColor,
      rootMenu,
      currentPlacement,
      menuTransitionName,
      mode,
      disabled,
      popperClass,
      $slots,
      isFirstLevel
    } = this

    const popupMenu = (
      <transition name={menuTransitionName}>
        <div
          ref="menu"
          v-show={opened}
          class={[`ui-menu--${mode}`, popperClass]}
          on-mouseenter={($event) => this.handleMouseenter($event, 100)}
          on-mouseleave={() => this.handleMouseleave(true)}
          on-focus={($event) => this.handleMouseenter($event, 100)}
          role="menu"
          class={['ui-menu ui-menu--popup', `ui-menu--popup-${currentPlacement}`]}
          style={{ backgroundColor: rootMenu.backgroundColor || '' }}>
          {$slots.default}
        </div>
      </transition>
    )

    const inlineMenu = (
      <ui-collapse-transition>
        <div
          role="menu"
          class="ui-menu ui-menu--inline"
          v-show={opened}
          style={{ backgroundColor: rootMenu.backgroundColor || '' }}>
          {$slots.default}
        </div>
      </ui-collapse-transition>
    )

    const submenuTitleIcon = (
      (rootMenu.mode === 'horizontal' && isFirstLevel) ||
      (rootMenu.mode === 'vertical' && !rootMenu.collapse)
    ) ? 'solid-chevron-down' : 'solid-chevron-right'

    return (
      <div
        class={{
          'ui-submenu': true,
          'is-active': active,
          'is-opened': opened,
          'is-disabled': disabled
        }}
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={opened}
        on-mouseenter={this.handleMouseenter}
        on-mouseleave={() => this.handleMouseleave(false)}
        on-focus={this.handleMouseenter}
      >
        <div
          class="ui-submenu__title"
          ref="submenu-title"
          on-click={this.handleClick}
          on-mouseenter={this.handleTitleMouseenter}
          on-mouseleave={this.handleTitleMouseleave}
          style={[paddingStyle, titleStyle, { backgroundColor }]}
        >
          {$slots.title}
          <svg-icon class="ui-submenu__icon-arrow" iconClass={submenuTitleIcon}></svg-icon>
        </div>
        {this.isMenuPopup ? popupMenu : inlineMenu}
      </div>
    )
  }
}
</script>
