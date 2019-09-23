function load(path) {
  return () => import(`@/admin/pages/${path}`)
}

const routes = [
  { path: '/admin', component: load('home') },
  { path: '/admin/*', component: load('errors/not-found') }
]

export {
  routes
}
