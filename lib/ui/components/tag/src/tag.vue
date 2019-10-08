<script>
export default {
  name: 'UiTag',
  props: {
    text: String,
    closable: Boolean,
    type: String,
    hit: Boolean,
    disableTransitions: Boolean,
    color: String,
    size: String,
    effect: {
      type: String,
      default: 'light',
      validator (val) {
        return ['dark', 'light', 'plain'].indexOf(val) !== -1
      }
    }
  },
  computed: {
    tagSize () {
      return this.size || (this.$ELEMENT || {}).size
    }
  },
  methods: {
    handleClose (event) {
      event.stopPropagation()
      this.$emit('close', event)
    },
    handleClick (event) {
      this.$emit('click', event)
    }
  },
  render (h) {
    const { type, tagSize, hit, effect } = this
    const classes = [
      'ui-tag',
      type ? `ui-tag--${type}` : '',
      tagSize ? `ui-tag--${tagSize}` : '',
      effect ? `ui-tag--${effect}` : '',
      hit && 'is-hit'
    ]
    const tagUi = (
      <span
        class={classes}
        style={{ backgroundColor: this.color }}
        on-click={this.handleClick}>
        {this.$slots.default}
        {
          this.closable && <svg-icon class="ui-tag__close" icon-class="solid-times" on-click={this.handleClose}></svg-icon>
        }
      </span>
    )

    return this.disableTransitions ? tagUi : <transition name="ui-zoom-in-center">{tagUi}</transition>
  }
}
</script>
