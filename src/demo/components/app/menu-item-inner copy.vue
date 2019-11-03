<script lang="tsx">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

export default class MenuItemInner extends Vue {
  functional: boolean = true

  @Prop(String) icon: string | undefined = ''
  @Prop(String) title: string | undefined = ''

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
