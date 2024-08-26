import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import AboutPage from '@/components/AboutPage.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HelloWorld,
        },
        {
            path: '/about',
            name: 'AboutPage',
            component: AboutPage,
        },
        // other routes
    ],
});