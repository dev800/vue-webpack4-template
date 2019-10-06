function load (path: String) {
  return () => import(/* webpackPrefetch: true */ `@/demo/pages/${path}`)
}

const routes = [
  { path: '/', component: load('home') },
  { path: '/*', component: load('errors/not-found') }
]

export {
  routes
}
