import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css'; // O el tema que prefieras
import 'primeicons/primeicons.css';

import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import PrimeVue from 'primevue/config';
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

createApp(App)
  .use(store)
  .use(router)
  .use(PrimeVue)
  .use(ToastService)
  .component("Toast", Toast) // Sin punto al final
  .mount('#app'); // Este es el último método en la cadena
