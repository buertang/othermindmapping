export default [
  {
    path: '/forces',
    name: 'Forces',
    component: (): unknown => import('@/views/Forces.vue')
  },
  {
    path: '/hierarchy',
    name: 'Hierarchy',
    component: (): unknown => import('@/views/Hierarchy.vue')
  },
  {
    path: '/fires',
    name: 'Fires',
    component: (): unknown => import('@/views/Fires.vue')
  },
  {
    path: '/',
    name: 'XMind',
    component: (): unknown => import('@/views/XMind/index.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'Err404',
    component: (): unknown => import('@/views/Err404.vue')
  }
]
