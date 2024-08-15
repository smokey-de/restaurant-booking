import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css'
import Tooltip from 'primevue/tooltip';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('tooltip', Tooltip);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#zico')
