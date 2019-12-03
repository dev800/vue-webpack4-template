import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Link from '@/demo/components/app/link'

// https://vue-test-utils.vuejs.org/api/#shallowmount
describe('link.vue', () => {
  it('render passed when: only params[to]', () => {
    const to = 'http://www.helloworld.com'

    const linkWrapper = shallowMount(Link, {
      propsData: { to }
    })

    expect(linkWrapper.html()).toBe('<a href="http://www.helloworld.com" target="_blank" rel="noopener"></a>')
  })

  // https://vue-test-utils.vuejs.org/guides/using-with-vue-router.html
  it('render passed when: params[slots, to], where: to is string', () => {
    const localVue = createLocalVue()
    const router = new VueRouter({})

    localVue.use(VueRouter)

    const linkWrapper = shallowMount(Link, {
      localVue,
      router,
      propsData: {
        to: 'pages/welcome'
      },
      slots: {
        default: 'Hello world <i class="icon icon-success"></i>'
      }
    })

    expect(linkWrapper.html()).toBe('<a href="#/pages/welcome" class="">Hello world <i class="icon icon-success"></i></a>')
  })

  it('render passed when: params[slots, to], where: to is router object, params is empty', () => {
    const Foo = { template: '<div>foo</div>' }
    const localVue = createLocalVue()

    const routes = [
      { path: '/pages/foobar', component: Foo, name: 'foo' }
    ]

    const router = new VueRouter({
      routes
    })

    localVue.use(VueRouter)

    const linkWrapper = shallowMount(Link, {
      localVue,
      router,
      propsData: {
        to: { name: 'foo' }
      },
      slots: {
        default: 'Hello world <i class="icon icon-success"></i>'
      }
    })

    expect(linkWrapper.html()).toBe('<a href="#/pages/foobar" class="">Hello world <i class="icon icon-success"></i></a>')
  })

  it('render passed when: params[slots, to], where: to is router object, params is present', () => {
    const Foo = { template: '<div>foo</div>' }
    const localVue = createLocalVue()

    const routes = [
      { path: '/pages/foobar', component: Foo, name: 'foo' }
    ]

    const router = new VueRouter({
      routes
    })

    localVue.use(VueRouter)

    const linkWrapper = shallowMount(Link, {
      localVue,
      router,
      propsData: {
        to: { name: 'foo', query: { age: 30, name: 'Foo King' } }
      },
      slots: {
        default: 'Hello world <i class="icon icon-success"></i>'
      }
    })

    expect(linkWrapper.html()).toBe('<a href="#/pages/foobar?age=30&amp;name=Foo%20King" class="">Hello world <i class="icon icon-success"></i></a>')
  })
})
