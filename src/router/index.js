import Login from "@/views/Login.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/admin",
    name: "bookstore",
    component: () => import("@/views/BookStore.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/admin/books/:id",
    name: "book.edit",
    component: () => import("@/views/books/BookEdit.vue"),
    props: true,
  },
  {
    path: "/admin/books/create",
    name: "book.add",
    component: () => import("@/views/books/BookAdd.vue"),
    props: true,
  },
  {
    path: "/admin/borrowed",
    name: "borrowed",
    component: () => import("@/views/borrowed/BorrowPage.vue"),
    props: true,
  },
  {
    path: "/admin/borrowed/:id",
    name: "borrow.edit",
    component: () => import("@/views/borrowed/BorrowEdit.vue"),
    props: true,
  },
  {
    path: "/admin/users",
    name: "userpage",
    component: () => import("@/views/users/UserPage.vue"),
  },
  {
    path: "/admin/users/create",
    name: "user.add",
    component: () => import("@/views/users/UserAdd.vue"),
    props: true,
  },
  {
    path: "/admin/users/:id",
    name: "user.edit",
    component: () => import("@/views/users/UserEdit.vue"),
    props: true,
  },
  {
    path: "/admin/publish",
    name: "publishpage",
    component: () => import("@/views/publish/PublishPage.vue"),
    props: true,
  },
  {
    path: "/admin/publish/create",
    name: "publish.add",
    component: () => import("@/views/publish/PublishAdd.vue"),
    props: true,
  },
  {
    path: "/admin/publish/:id",
    name: "publish.edit",
    component: () => import("@/views/publish/PublishEdit.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
