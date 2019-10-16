function load (path: string) {
  return () => import(/* webpackChunkName: `demo` */ `@/demo/pages/${path}`)
}

const routes = [
  { path: '/', component: load('index') },
  { path: '/charts', component: load('charts/index') },
  { path: '/*', component: load('errors/not-found') }
]

export {
  routes
}
