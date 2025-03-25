import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useRouter } from 'vue-router';


import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives
})


const app = createApp(App)

// app.use(createPinia())
// app.use(router)

// app.mount('#app')
const pinia = createPinia();

pinia.use(({ store }) => {
    store.router = useRouter();
  });
  
app.use(router);
app.use(pinia);
app.use(vuetify)

app.mount('#app');
