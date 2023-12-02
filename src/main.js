import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import GlobalVariablesPlugin from './plugins/globalVariables';
import router from '../router/index.js';
const app = createApp(App);

// Install Element Plus
app.use(ElementPlus);

// Install your custom plugin
app.use(GlobalVariablesPlugin);

// Install your router
app.use(router);

// Mount the app
app.mount('#app');
