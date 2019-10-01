function load (path) {
  return () => import(/* webpackPrefetch: true */ `@/demo/pages/${path}`)
}

const routes = [
  { path: '/', component: load('home') },
  { path: '/*', component: load('errors/NotFound') }
]

export {
  routes
}
