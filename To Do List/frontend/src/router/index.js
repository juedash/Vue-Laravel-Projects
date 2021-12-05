import routes from "./routes";
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes
});
export default router;