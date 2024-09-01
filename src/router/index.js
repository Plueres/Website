import { createRouter, createWebHistory } from 'vue-router';
// import HelloWorld from '@/components/HelloWorld.vue';
import HomePage from '@/components/HomePage.vue';
import AboutPage from '@/components/AboutPage.vue';
import DashboardPage from '@/components/cms/DashboardPage.vue';
import GetGames from '@/components/cms/games/get.vue';
import CreateGames from '@/components/cms/games/create.vue';
import EditGames from '@/components/cms/games/edit.vue';
import DeleteGames from '@/components/cms/games/delete.vue';
import GetMovies from '@/components/cms/movies/get.vue';
import CreateMovies from '@/components/cms/movies/create.vue';
import EditMovies from '@/components/cms/movies/edit.vue';
import DeleteMovies from '@/components/cms/movies/delete.vue';
import GetShows from '@/components/cms/shows/get.vue';
import CreateShows from '@/components/cms/shows/create.vue';
import EditShows from '@/components/cms/shows/edit.vue';
import DeleteShows from '@/components/cms/shows/delete.vue';

// ! Separate this into just 4 files that each contain the routes for games, movies, and shows respectively. Create, edit, delete, and get routes for each of them.

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
        path: '/dashboard/games',
        children: [
            {
                path: 'get',
                name: 'GetGames',
                component: GetGames,
                meta: { requiresAuth: true }, // Protect this route
            },
            {
                path: 'create',
                name: 'CreateGames',
                component: CreateGames,
                meta: { requiresAuth: true }, // Protect this route
            },
            {
                path: 'edit/:id',
                name: 'EditGames',
                component: EditGames,
                meta: { requiresAuth: true }, // Protect this route
            },
            {
                path: 'delete/:id',
                name: 'DeleteGames',
                component: DeleteGames,
                meta: { requiresAuth: true }, // Protect this route
            }
        ]
    },
    {
        path: '/dashboard/movies',
        children: [
            {
                path: 'get',
                name: 'GetMovies',
                component: GetMovies,
                meta: { requiresAuth: true }, // Protect this route
            },
            {
                path: 'create',
                name: 'CreateMovies',
                component: CreateMovies,
                meta: { requiresAuth: true }, // Protect this route
            },
            {
                path: 'edit/:id',
                name: 'EditMovies',
                component: EditMovies,
                meta: { requiresAuth: true }, // Protect this route
            },
            {
                path: 'delete/:id',
                name: 'DeleteMovies',
                component: DeleteMovies,
                meta: { requiresAuth: true }, // Protect this route
            }
        ]
    },
    {
        path: '/dashboard/shows',
        children: [
            {
                path: 'get',
                name: 'GetShows',
                component: GetShows,
                meta: { requiresAuth: true }, // Protect this route
            },
            {
                path: 'create',
                name: 'CreateShows',
                component: CreateShows,
                meta: { requiresAuth: true }, // Protect this route
            },
            {
                path: 'edit/:id',
                name: 'EditShows',
                component: EditShows,
                meta: { requiresAuth: true }, // Protect this route
            },
            {
                path: 'delete/:id',
                name: 'DeleteShows',
                component: DeleteShows,
                meta: { requiresAuth: true }, // Protect this route
            }
        ]
    },
    {
        path: '/login',
        name: 'Auth',
        component: () => import('@/components/auth/LoginPage.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

// Navigation guard to check for authentication
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