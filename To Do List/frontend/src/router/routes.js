import Login from "../auth/Login.vue";
import Activities from "../components/activities";
import middleware from './middleware';

export default [
    {
        path: '/',
        redirect: '/activities'
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: middleware.guest
    },
    {
        path: '/activities',
        name: 'activities',
        component: Activities,
        beforeEnter: middleware.user
    },
];
