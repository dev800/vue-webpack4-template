<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Empty extends Vue {
  render (h, context) {
    return [<router-view />]
  }
}
</script>
