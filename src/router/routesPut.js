import EditGames from '@/components/cms/games/edit.vue';
import EditMovies from '@/components/cms/movies/edit.vue';
import EditShows from '@/components/cms/shows/edit.vue';

export const editRoutes = (entity) => {
    const routes = {
        games: {
            path: '/dashboard/games/edit/:id',
            name: 'EditGames',
            component: EditGames,
            meta: { requiresAuth: true },
        },
        movies: {
            path: '/dashboard/movies/edit/:id',
            name: 'EditMovies',
            component: EditMovies,
            meta: { requiresAuth: true },
        },
        shows: {
            path: '/dashboard/shows/edit/:id',
            name: 'EditShows',
            component: EditShows,
            meta: { requiresAuth: true },
        },
    };
    return [routes[entity]];
};
