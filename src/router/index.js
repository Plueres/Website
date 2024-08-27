import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import AboutPage from '@/components/AboutPage.vue';
import DashboardPage from '@/components/cms/DashboardPage.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HelloWorld,
    },
    {
        path: '/about',
        name: 'About',
        component: AboutPage,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardPage,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;