<template>
  <ul
    class="ui-pager"
    @click="onPagerClick"
  >
    <li
      v-if="pageCount > 0"
      :class="{ active: currentPage === 1, disabled }"
      class="number"
    >
      1
    </li>
    <li
      v-if="showPrevMore"
      class="ui-icon more btn-quick-prev"
      :class="[{ disabled }]"
      @mouseenter="onMouseenter('left')"
      @mouseleave="quickPrevIconClass = 'solid-ellipsis-h'"
    >
      <svg-icon :icon-class="quickPrevIconClass" />
    </li>
    <li
      v-for="pager in pagers"
      :key="pager"
      :class="{ active: currentPage === pager, disabled }"
      class="number"
    >
      {{ pager }}
    </li>
    <li
      v-if="showNextMore"
      class="ui-icon more btn-quick-next"
      :class="[{ disabled }]"
      @mouseenter="onMouseenter('right')"
      @mouseleave="quickNextIconClass = 'solid-ellipsis-h'"
    >
      <svg-icon :icon-class="quickNextIconClass" />
    </li>
    <li
      v-if="pageCount > 1"
      :class="{ active: currentPage === pageCount, disabled }"
      class="number"
    >
      {{ pageCount }}
    </li>
  </ul>
</template>

<script type="text/babel">
export default {
  name: 'UiPager',

  props: {
    currentPage: Number,

    pageCount: Number,

    pagerCount: Number,

    disabled: Boolean
  },

  data () {
    return {
      current: null,
      showPrevMore: false,
      showNextMore: false,
      quickNextIconClass: 'solid-ellipsis-h',
      quickPrevIconClass: 'solid-ellipsis-h'
    }
  },

  computed: {
    pagers () {
      const pagerCount = this.pagerCount
      const halfPagerCount = (pagerCount - 1) / 2

      const currentPage = Number(this.currentPage)
      const pageCount = Number(this.pageCount)

      let showPrevMore = false
      let showNextMore = false

      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true
        }

        if (currentPage < pageCount - halfPagerCount) {
          showNextMore = true
        }
      }

      const array = []

      if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2)
        for (let i = startPage; i < pageCount; i++) {
          array.push(i)
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i)
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i)
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i)
        }
      }

      this.showPrevMore = showPrevMore
      this.showNextMore = showNextMore

      return array
    }
  },

  watch: {
    showPrevMore (val) {
      if (!val) this.quickPrevIconClass = 'solid-ellipsis-h'
    },

    showNextMore (val) {
      if (!val) this.quickNextIconClass = 'solid-ellipsis-h'
    }
  },

  methods: {
    onPagerClick (event) {
      let target = event.target

      if (target.tagName === 'UL' || this.disabled) {
        return
      }

      if (target.tagName === 'svg') {
        target = target.parentElement
      }

      let newPage = Number(event.target.textContent)
      const pageCount = this.pageCount
      const currentPage = this.currentPage
      const pagerCountOffset = this.pagerCount - 2

      if (target.className.indexOf('more') !== -1) {
        if (target.className.indexOf('quick-prev') !== -1) {
          newPage = currentPage - pagerCountOffset
        } else if (target.className.indexOf('quick-next') !== -1) {
          newPage = currentPage + pagerCountOffset
        }
      }

      /* istanbul ignore if */
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1
        }

        if (newPage > pageCount) {
          newPage = pageCount
        }
      }

      if (newPage !== currentPage) {
        this.$emit('change', newPage)
      }
    },

    onMouseenter (direction) {
      if (this.disabled) return
      if (direction === 'left') {
        this.quickPrevIconClass = 'solid-angle-double-left'
      } else {
        this.quickNextIconClass = 'solid-angle-double-right'
      }
    }
  }
}
</script>
