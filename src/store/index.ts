import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { Task } from "@/types";

Vue.use(Vuex);

const store: StoreOptions<any> = {
  state: {
    tasks: [],
  },
  mutations: {
    setTasks(state, tasks: Task[]) {
      state.tasks = tasks;
    },
    addTask(state, task: Task) {
      state.tasks.push(task);
    },
    updateTask(state, updatedTask: Task) {
      const index = state.tasks.findIndex((t: Task) => t.id === updatedTask.id);
      if (index !== -1) {
        Vue.set(state.tasks, index, updatedTask);
      }
    },
    deleteTask(state, taskId: string) {
      state.tasks = state.tasks.filter((t: Task) => t.id !== taskId);
    },
  },
  actions: {
    fetchTasks({ commit }) {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      commit("setTasks", tasks);
    },
    createTask({ commit }, task: Task) {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const newTask = { ...task, id: Date.now().toString() };
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      commit("addTask", newTask);
    },
    updateTask({ commit }, task: Task) {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const index = tasks.findIndex((t: Task) => t.id === task.id);
      if (index !== -1) {
        tasks.splice(index, 1, task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        commit("updateTask", task);
      }
    },
    deleteTask({ commit }, taskId: string) {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const updatedTasks = tasks.filter((t: Task) => t.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      commit("deleteTask", taskId);
    },
  },
  getters: {
    getTaskById: (state) => (id: string) => {
      return state.tasks.find((task: Task) => task.id === id);
    },
  },
};

export default new Vuex.Store(store);
