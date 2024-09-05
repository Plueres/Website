import { createRouter, createWebHistory } from 'vue-router';
// import HelloWorld from '@/components/HelloWorld.vue';
import HomePage from '@/components/HomePage.vue';
import AboutPage from '@/components/AboutPage.vue';
import DashboardPage from '@/components/cms/DashboardPage.vue';
import { getRoutes } from './routesGet';
import { createRoutes } from './routesPost';
import { editRoutes } from './routesPut';
import { deleteRoutes } from './routesDelete';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
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
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'Auth',
        component: () => import('@/components/auth/LoginPage.vue'),
    },
    ...getRoutes('games'),
    ...createRoutes('games'),
    ...editRoutes('games'),
    ...deleteRoutes('games'),
    ...getRoutes('movies'),
    ...createRoutes('movies'),
    ...editRoutes('movies'),
    ...deleteRoutes('movies'),
    ...getRoutes('shows'),
    ...createRoutes('shows'),
    ...editRoutes('shows'),
    ...deleteRoutes('shows'),
];

// Navigation guard to check for authentication
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const token = localStorage.getItem('token');

    if (requiresAuth && !token) {
        next('/login');
    } else {
        next();
    }
});

export default router;