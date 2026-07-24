import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/stores/auth";

import DashboardView from "@/pages/DashboardView.vue";
import LoginView from "@/pages/LoginView.vue";
import RegisterView from "@/pages/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      redirect: {
        name: "dashboard",
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        guestOnly: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: {
        guestOnly: true,
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: "login",
    };
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return {
      name: "dashboard",
    };
  }

  return true;
});

export default router;
