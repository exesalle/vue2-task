<template>
  <div>
    <h1>{{ formTitle }}</h1>
    <form @submit.prevent="submitForm">
      <input
        type="text"
        placeholder="Название"
        id="title"
        v-model="task.title"
        required
      />
      <button type="submit">{{ formButton }}</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Task } from "@/types";

@Component
export default class TaskForm extends Vue {
  task: Task = {
    id: "",
    title: "",
  };

  get formTitle(): string {
    return this.$route.params.id ? "Редактировать задачу" : "Создать задачу";
  }

  get formButton(): string {
    return this.$route.params.id ? "Обновить" : "Создать";
  }

  created(): void {
    if (this.$route.params.id) {
      const taskId: string = this.$route.params.id;
      const task: Task | undefined = this.$store.getters.getTaskById(taskId);
      if (task) {
        this.task = { ...task };
      } else {
        console.log("задача не найдена");
      }
    }
  }

  submitForm(): void {
    if (this.$route.params.id) {
      const updatedTask: Task = {
        id: this.$route.params.id,
        title: this.task.title,
      };
      this.$store.dispatch("updateTask", updatedTask);
      this.$router.push("/tasks");
    } else {
      const newTask: Task = {
        id: "",
        title: this.task.title,
      };
      this.$store.dispatch("createTask", newTask);
    }
  }
}
</script>
