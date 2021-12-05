import { createApp } from 'vue'
import App from './App.vue'
import BaseContainer from './components/UI/BaseContainer.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Form, Field } from 'vee-validate';

import router from './router';
import store from './store'

const app = createApp( App );

library.add(faTrash, faCheck)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component( 'base-container', BaseContainer );
app.component( 'Form', Form );
app.component( 'Field', Field );


app.config.productionTip = false

app.use(router);
app.use(store);

app.mount( '#app' );
