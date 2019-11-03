import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function loadPage (path: string) {
  return () => import(`../pages/${path}`)
}

function loadLayout (name: string) {
  return () => import(`../layout/layouts/${name}`)
}

const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      meta: { title: '首页', icon: 'solid-th-large' },
      component: loadPage('index')
    },
    {
      path: '/dashboard',
      component: loadLayout('default'),
      meta: { title: '总览', icon: 'solid-th-large' },
      children: [
        {
          path: 'console',
          name: 'dashboardConsole',
          meta: { title: '控制台', icon: 'solid-th-large' },
          component: loadPage('dashboard/console')
        },
        {
          path: 'monitor',
          name: 'dashboardMonitor',
          meta: { title: '监控器', icon: 'solid-th-large' },
          component: loadPage('dashboard/monitor')
        },
        {
          path: 'workplace',
          name: 'dashboardWorkplace',
          meta: { title: '监控器', icon: 'solid-th-large' },
          component: loadPage('dashboard/workplace')
        }
      ]
    },

    {
      path: '/components',
      component: loadLayout('default'),
      meta: { title: '组件', icon: 'solid-th-large' },
      children: [
        {
          path: 'index',
          name: 'components',
          meta: { title: '概览', icon: 'solid-th-large' },
          component: loadPage('components/index')
        },
        {
          path: 'basic',
          meta: { title: '基础组件', icon: 'solid-th-large' },
          component: loadLayout('empty'),
          children: [
            {
              path: 'layout',
              name: 'componentsLayout',
              meta: { title: 'Layout布局', icon: 'solid-th-large' },
              component: loadPage('components/layout')
            },
            {
              path: 'container',
              name: 'componentsContainer',
              meta: { title: 'Container布局容器', icon: 'solid-th-large' },
              component: loadPage('components/container')
            }
          ]
        },
        {
          path: 'form',
          meta: { title: '表单组件', icon: 'solid-th-large' },
          component: loadLayout('empty'),
          children: [
            {
              path: 'radio',
              name: 'componentsRadio',
              meta: { title: 'Radio 单选框', icon: 'solid-th-large' },
              component: loadPage('components/radio')
            },
            {
              path: 'checkbox',
              name: 'componentsCheckbox',
              meta: { title: 'Checkbox 复选框', icon: 'solid-th-large' },
              component: loadPage('components/checkbox')
            },
            {
              path: 'input',
              name: 'componentsInput',
              meta: { title: 'Input 文本框', icon: 'solid-th-large' },
              component: loadPage('components/input')
            }
          ]
        }
      ]
    },
    {
      path: '/functions/i18n',
      name: 'functionsI18n',
      meta: { title: '国际化' },
      component: loadPage('functions/i18n')
    },
    {
      path: '/*',
      meta: { menuHide: true },
      component: loadPage('errors/not-found')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
