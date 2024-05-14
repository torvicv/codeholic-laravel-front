import { createRouter, createWebHashHistory } from "vue-router";
import Dashboard from '../components/Views/Dashboard.vue';
import Login from '../components/Views/Login.vue';
import Register from '../components/Views/Register.vue';
import store from "../store";
import Surveys from "../components/Views/Surveys.vue";
import SurveyCreate from "../components/Views/SurveyCreate.vue";


const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {requiresAuth: true},
        component: Dashboard
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        meta: {requiresAuth: true},
        component: Dashboard
    },
    {
        path: '/surveys',
        name: 'Surveys',
        meta: {requiresAuth: true},
        component: Surveys
    },
    {
        path: '/surveys/create',
        name: 'SurveyCreate',
        meta: {requiresAuth: true},
        component: SurveyCreate
    },
    {
        path: '/login',
        name: 'Login',
        meta: {isGuest: true},
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        meta: {isGuest: true},
        component: Register
    },
];

const router = createRouter({
    history: createWebHashHistory(), 
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({name: 'Login'});
    } else if (store.state.user.token && (to.meta.isGuest)) {
        next({name: 'Dashboard'});
    } else {
        next();
    }
});

export default router;