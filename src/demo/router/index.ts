function load (path: String) {
  return () => import(/* webpackPrefetch: true */ `@/demo/pages/${path}`)
}

const routes = [
  { path: '/', component: load('index') },
  { path: '/*', component: load('errors/not-found') }
]

export {
  routes
}
