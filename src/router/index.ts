import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { allRoutes } from "./routes";
import { useAuthStore } from '@/stores/auth'

// Use hash mode for production builds to avoid 404 issues with direct URL access
const history = import.meta.env.PROD
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL);

const router = createRouter({
    history,
    routes: allRoutes
});

router.beforeEach((to, from, next) => {
    const title = to.meta.title;
    if (title) {
        document.title = title.toString();
    }
    next();
});

router.beforeEach((routeTo, routeFrom, next) => {
    // Check if auth is required on this route
    // (including nested routes).
    const authRequired = routeTo.matched.some((route) => route.meta.authRequired)

    // If auth isn't required for the route, just continue.
    if (!authRequired) return next()

    // If auth is required and the user is logged in...
    const useAuth = useAuthStore()
    if (useAuth.isAuthenticated()) {
      return next()
    }

    // If auth is required and the user is NOT currently logged in,
    // redirect to login.
    redirectToLogin()

    function redirectToLogin() {
      // Pass the original route to the login component
      next({ name: 'auth.sign-in', query: { redirectedFrom: routeTo.fullPath } })
    }
  })

export default router;
