import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import piniaStore from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/style/custom-font.css'
import '@/style/init.css'
import 'remixicon/fonts/remixicon.css'

const app = createApp(App)
app
  .use(piniaStore)
  .use(Antd)
  .use(router)
  .mount('#app')
