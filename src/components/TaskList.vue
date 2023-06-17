<template>
  <div>
    <TaskForm />
    <h1>Список задач</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }}
        <button @click="editTask(task.id)">Редактировать</button>
        <button @click="deleteTask(task.id)">Удалить</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Task } from "@/types";
import TaskForm from "@/components/TaskForm.vue";

@Component({
  components: { TaskForm },
})
export default class TaskList extends Vue {
  get tasks(): Task[] {
    return this.$store.state.tasks;
  }

  editTask(id: string): void {
    this.$router.push(`/edit/${id}`);
  }

  deleteTask(id: string): void {
    this.$store.dispatch("deleteTask", id);
  }

  created(): void {
    this.$store.dispatch("fetchTasks");
  }
}
</script>
