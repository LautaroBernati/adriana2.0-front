import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import store from './store/store.js'

const app = createApp(App);
app.config.globalProperties.API_URL = 'http://localhost:3005';

app.use(router);
app.use(store);

app.mount('#app');
