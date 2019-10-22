import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function loadPage (path: string) {
  return () => import(`../pages/${path}`)
}

function loadLayout (name: string) {
  return () => import(`../layout/${name}`)
}

const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: loadLayout('default'),
      redirect: { name: 'dashboardConsole' }
    },
    {
      path: '/dashboard',
      component: loadLayout('default'),
      meta: { title: '总览', icon: 'component' },
      children: [
        {
          path: 'console',
          name: 'dashboardConsole',
          meta: { title: '控制台', icon: 'dashboard' },
          component: loadPage('dashboard/console')
        },
        {
          path: 'monitor',
          name: 'dashboardMonitor',
          meta: { title: '监控器', icon: 'dashboard' },
          component: loadPage('dashboard/monitor')
        },
        {
          path: 'workplace',
          name: 'dashboardWorkplace',
          meta: { title: '监控器', icon: 'dashboard' },
          component: loadPage('dashboard/workplace')
        }
      ]
    },

    {
      path: '/components',
      component: loadLayout('default'),
      meta: { title: '组件', icon: 'component' },
      children: [
        {
          path: 'index',
          name: 'components',
          meta: { title: '概览', icon: 'dashboard' },
          component: loadPage('components/index')
        },
        {
          path: 'basic',
          name: 'components',
          meta: { title: '基础组件', icon: 'dashboard' },
          children: [
            {
              path: 'layout',
              name: 'componentsLayout',
              meta: { title: 'Layout布局', icon: 'dashboard' },
              component: loadPage('components/layout')
            },
            {
              path: 'container',
              name: 'componentsContainer',
              meta: { title: 'Container布局容器', icon: 'dashboard' },
              component: loadPage('components/container')
            }
          ]
        },
        {
          path: 'form',
          name: 'components',
          meta: { title: '表单组件', icon: 'dashboard' },
          children: [
            {
              path: 'radio',
              name: 'componentsRadio',
              meta: { title: 'Radio 单选框', icon: 'dashboard' },
              component: loadPage('components/radio')
            },
            {
              path: 'checkbox',
              name: 'componentsCheckbox',
              meta: { title: 'Checkbox 复选框', icon: 'dashboard' },
              component: loadPage('components/checkbox')
            }
          ]
        }
      ]
    },

    { path: '/*', component: loadPage('errors/not-found') }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
