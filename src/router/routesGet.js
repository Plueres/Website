import GetGames from '@/components/cms/games/get.vue';
import GetMovies from '@/components/cms/movies/get.vue';
import GetShows from '@/components/cms/shows/get.vue';

export const getRoutes = (entity) => {
    const routes = {
        games: {
            path: '/dashboard/games/get',
            name: 'GetGames',
            component: GetGames,
            meta: { requiresAuth: true },
        },
        movies: {
            path: '/dashboard/movies/get',
            name: 'GetMovies',
            component: GetMovies,
            meta: { requiresAuth: true },
        },
        shows: {
            path: '/dashboard/shows/get',
            name: 'GetShows',
            component: GetShows,
            meta: { requiresAuth: true },
        },
    };
    return [routes[entity]];
};
