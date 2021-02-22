
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Episodes.vue') },
      { path: 'episodes', name: 'episodes', component: () => import('pages/Episodes.vue') },
      { path: 'episode', name: 'episode', component: () => import('pages/Episode.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
