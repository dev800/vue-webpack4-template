<script lang="jsx">
export default {
  name: 'MenuItemInner',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },

  render (h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon} class='ui-menu-item__icon' />)
    }

    if (title) {
      vnodes.push(<span slot='title' class='ui-menu-item__text'>{(title)}</span>)
    }

    return vnodes
  }
}
</script>
