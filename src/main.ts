import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import SgmkButton from "@components/ui/SgmkButton.vue";
import SgmkSelect from '@components/ui/SgmkSelect.vue'
import SgmkTextInput from '@components/ui/SgmkTextInput.vue'
import SgmkPaginator from '@components/ui/SgmkPaginator.vue'
import SgmkCell from '@components/ui/table/SgmkTableCell.vue'
import SgmkTable from '@components/ui/table/SgmkTemplateTable.vue'
import clickOutside from '@directives/clickOutside'

const app = createApp(App)

app.component('SgmkCell', SgmkCell)
app.component('SgmkTable', SgmkTable)
app.component('SgmkSelect', SgmkSelect)
app.component('SgmkButton', SgmkButton)
app.component('TextInput', SgmkTextInput)
app.component('SgmkPaginator', SgmkPaginator)

app.directive('click-outside', clickOutside)

app.use(createPinia())
app.use(router)

app.mount('#app')
