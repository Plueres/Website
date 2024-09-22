import { createRouter, createWebHistory } from 'vue-router';
// import HelloWorld from '@/components/HelloWorld.vue';
import HomePage from '@/components/HomePage.vue';
import AboutPage from '@/components/AboutPage.vue';
import DashboardPage from '@/components/cms/DashboardPage.vue';
import GamesList from '@/components/cms/lists/GamesList.vue';
import MoviesList from '@/components/cms/lists/MoviesList.vue';
import ShowsList from '@/components/cms/lists/ShowsList.vue';

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
    {
        path: '/dashboard/games',
        name: 'Games',
        component: GamesList,
    },
    {
        path: '/dashboard/movies',
        name: 'Movies',
        component: MoviesList,
    },
    {
        path: '/dashboard/shows',
        name: 'Shows',
        component: ShowsList,
    },
];

// Navigation guard to check for authentication
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const token = sessionStorage.getItem('token');

    if (requiresAuth && !token) {
        next('/login');
    } else {
        next();
    }
});

export default router;