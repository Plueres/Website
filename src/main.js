import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import material from './plugins/material';

const app = createApp(App);

app.use(router);
app.use(material);

app.mount('#app');
