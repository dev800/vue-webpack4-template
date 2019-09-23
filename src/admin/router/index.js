function load(path) {
  return () => import(`@/admin/pages/${path}`)
}

const routes = [
  { path: '/', component: load('home') },
  { path: '/*', component: load('errors/not-found') }
]

export {
  routes
}
