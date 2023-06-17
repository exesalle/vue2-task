import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import TaskList from "../components/TaskList.vue";
import TaskForm from "../components/TaskForm.vue";
import HomePage from "@/components/HomePage.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { path: "/", component: HomePage },
  { path: "/tasks", component: TaskList },
  { path: "/create", component: TaskForm },
  { path: "/edit/:id", component: TaskForm, props: true },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
