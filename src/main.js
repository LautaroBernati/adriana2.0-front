import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
//import './assets/main.css';
import store from './store/store.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);
app.config.globalProperties.API_URL = 'http://localhost:3005';

app.use(router);
app.use(store);
app.use(VueSweetalert2);

app.mount('#app');
