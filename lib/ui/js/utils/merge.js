export default function (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    const source = arguments[i] || {}
    // eslint-disable-next-line no-unused-vars
    for (const prop in source) {
      if (Object.prototype.hasOwnProperty.call(source, prop)) {
        const value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }

  return target
}
