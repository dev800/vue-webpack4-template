function load (path) {
  return () => import(/* webpackPrefetch: true */ `@/admin/pages/${path}`)
}

const routes = [
  { path: '/', component: load('home') },
  { path: '/*', component: load('errors/not-found') }
]

export {
  routes
}
