function load (path) {
  return () => import(/* webpackPrefetch: true */ `@/demo/pages/${path}`)
}

const routes = [
  { path: '/', component: load('index') },
  { path: '/charts', component: load('charts/index') },
  { path: '/*', component: load('errors/not-found') }
]

export {
  routes
}
