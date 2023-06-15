import { createApp } from 'vue';
import App from './App.vue';
import TasksTable from './components/TasksTable.vue';

const app = createApp(App);

app.component('TasksTable', TasksTable);

app.mount('#app');
