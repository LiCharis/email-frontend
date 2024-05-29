// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import EmailSendView from '../views/EmailSendView.vue';

// 路由配置
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/sendEmail',
        name: 'EmailSendView',
        component: EmailSendView
    }
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;