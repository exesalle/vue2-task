import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  store.commit("setTasks", JSON.parse(savedTasks));
}

store.subscribe((mutation, state) => {
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
