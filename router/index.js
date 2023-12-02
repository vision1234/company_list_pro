// router.js

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../src/components/ImageManage.vue';
import Login from '../src/components/LoginView.vue';

const routes = [
  { path: '/', component: Home ,meta: { requiresAuth: true }, },
  { path: '/login', component: Login ,meta: { requiresAuth: false }, }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  // 使用 meta 字段来判断是否需要身份验证
  const isAuthenticated=localStorage.getItem("pass") //localStorage
  if (to.meta.requiresAuth && !isAuthenticated/* 检查用户是否已登录，可以根据你的需求自行实现 */) {
    next('/login');
  } else {
    next();
  }
});
export default router;
