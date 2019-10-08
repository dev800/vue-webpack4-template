<script>
export default {
  name: 'FmAvatar',

  props: {
    size: {
      type: [Number, String],
      validator (val) {
        if (typeof val === 'string') {
          return ['large', 'medium', 'small'].includes(val)
        }
        return typeof val === 'number'
      }
    },
    shape: {
      type: String,
      default: 'circle',
      validator (val) {
        return ['circle', 'square'].includes(val)
      }
    },
    icon: { type: String, default: null },
    src: { type: String, default: null },
    alt: { type: String, default: null },
    srcSet: String,
    error: Function,
    fit: {
      type: String,
      default: 'cover'
    }
  },

  data () {
    return {
      isImageExist: true
    }
  },

  computed: {
    avatarClass () {
      const { size, icon, shape } = this
      const classList = ['fm-avatar']

      if (size && typeof size === 'string') {
        classList.push(`fm-avatar--${size}`)
      }

      if (icon) {
        classList.push('fm-avatar--icon')
      }

      if (shape) {
        classList.push(`fm-avatar--${shape}`)
      }

      return classList.join(' ')
    }
  },

  methods: {
    handleError () {
      const { error } = this
      const errorFlag = error ? error() : undefined
      if (errorFlag !== false) {
        this.isImageExist = false
      }
    },
    renderAvatar () {
      const { icon, src, alt, isImageExist, srcSet, fit } = this

      if (isImageExist && src) {
        return <img
          src={src}
          onError={this.handleError}
          alt={alt}
          srcSet={srcSet}
          style={{ 'object-fit': fit }} />
      }

      if (icon) {
        return (<svg-icon icon-class={icon} />)
      }

      return this.$slots.default
    }
  },

  render () {
    const { avatarClass, size } = this

    const sizeStyle = typeof size === 'number' ? {
      height: `${size}px`,
      width: `${size}px`,
      lineHeight: `${size}px`
    } : {}

    return (
      <span class={avatarClass} style={sizeStyle}>
        {
          this.renderAvatar()
        }
      </span>
    )
  }

}
</script>
