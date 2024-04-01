import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import SgmkSelect from '@components/ui/SgmkSelect.vue'
import SgmkTextInput from '@components/ui/SgmkTextInput.vue'
import clickOutside from '@directives/clickOutside'

const app = createApp(App)

app.component('SgmkSelect', SgmkSelect)
app.component('SgmkTextInput', SgmkTextInput)

app.directive('click-outside', clickOutside)

app.use(createPinia())
app.use(router)

app.mount('#app')
