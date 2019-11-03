<script lang="tsx">
import { Component } from 'vue-property-decorator'

@Component({})
export default {
  render (h, context) {
    return [<router-view />]
  }
}
</script>
