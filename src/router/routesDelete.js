import DeleteGames from '@/components/cms/games/delete.vue';
import DeleteMovies from '@/components/cms/movies/delete.vue';
import DeleteShows from '@/components/cms/shows/delete.vue';

export const deleteRoutes = (entity) => {
    const routes = {
        games: {
            path: '/dashboard/games/delete/:id',
            name: 'DeleteGames',
            component: DeleteGames,
            meta: { requiresAuth: true },
        },
        movies: {
            path: '/dashboard/movies/delete/:id',
            name: 'DeleteMovies',
            component: DeleteMovies,
            meta: { requiresAuth: true },
        },
        shows: {
            path: '/dashboard/shows/delete/:id',
            name: 'DeleteShows',
            component: DeleteShows,
            meta: { requiresAuth: true },
        },
    };
    return [routes[entity]];
};