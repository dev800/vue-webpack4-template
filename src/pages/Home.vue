<template>
  <div class="">
    <div>
      <img src="static/img/logo.png">
    </div>
    <WelcomeMessage name="World" />
  </div>
</template>

<script>
import WelcomeMessage from '@/components/Home/WelcomeMessage'

export default {
  components: {
    WelcomeMessage
  }
}
</script>
