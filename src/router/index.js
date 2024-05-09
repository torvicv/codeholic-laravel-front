import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from '../components/Views/Dashboard.vue';
import Login from '../components/Views/Login.vue';
import Register from '../components/Views/Register.vue';


const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
];

const router = createRouter({
    history: createWebHashHistory(), 
    routes
});

export default router;