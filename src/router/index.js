import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import AboutPage from '@/components/AboutPage.vue';
import DashboardPage from '@/components/cms/DashboardPage.vue';
import GetGames from '@/components/cms/games/list.vue';

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
    },
    {
        path: '/dashboard/getgames',
        name: 'GetGames',
        component: GetGames,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;