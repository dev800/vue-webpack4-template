import { shallowMount } from '@vue/test-utils'
import WelcomeMessage from '@/demo/components/app/welcome-message'

describe('welcome-message.vue', () => {
  it('renders props.msg when passed', () => {
    const name = 'tester'

    const wrapper = shallowMount(WelcomeMessage, {
      propsData: { name }
    })

    expect(wrapper.html()).toContain('Hello tester from my Vue.js page, built with Webpack 4!')
  })
})
