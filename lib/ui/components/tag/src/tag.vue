<script>
export default {
  name: 'FmTag',
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
      'fm-tag',
      type ? `fm-tag--${type}` : '',
      tagSize ? `fm-tag--${tagSize}` : '',
      effect ? `fm-tag--${effect}` : '',
      hit && 'is-hit'
    ]
    const tagFm = (
      <span
        class={classes}
        style={{ backgroundColor: this.color }}
        on-click={this.handleClick}>
        {this.$slots.default}
        {
          this.closable && <i class="fm-tag__close fm-icon-close" on-click={this.handleClose}></i>
        }
      </span>
    )

    return this.disableTransitions ? tagFm : <transition name="fm-zoom-in-center">{tagFm}</transition>
  }
}
</script>
