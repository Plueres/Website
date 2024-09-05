import CreateGames from '@/components/cms/games/create.vue';
import CreateMovies from '@/components/cms/movies/create.vue';
import CreateShows from '@/components/cms/shows/create.vue';

export const createRoutes = (entity) => {
    const routes = {
        games: {
            path: '/dashboard/games/create',
            name: 'CreateGames',
            component: CreateGames,
            meta: { requiresAuth: true },
        },
        movies: {
            path: '/dashboard/movies/create',
            name: 'CreateMovies',
            component: CreateMovies,
            meta: { requiresAuth: true },
        },
        shows: {
            path: '/dashboard/shows/create',
            name: 'CreateShows',
            component: CreateShows,
            meta: { requiresAuth: true },
        },
    };
    return [routes[entity]];
};
