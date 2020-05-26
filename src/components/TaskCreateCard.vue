<template>
  <div class="create-task-card">
    <form @submit.prevent="createTask">
      <h3>Create a new task!</h3>
      <div class="field">
        <label>Description</label>
        <input v-model="task.description" type="text" placeholder="Add a description" />
      </div>
      <div class="field">
        <label>Select a state</label>
        <select v-model="task.state">
          <option v-for="state in states" :key="state">{{ state }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient button-create" value="Add new task" />
    </form>
  </div>
</template>

<script>
import TaskService from '@/services/TaskService.js'

export default {
  props: {
    user: Object
  },
  data() {
    const states = ['to do', 'done']

    return {
      states,
      task: this.createFreshTaskObject()
    }
  },
  methods: {
    createTask() {
      if (this.task.description != '') {
        this.task.user_id = this.user.id
        TaskService.createTask(this.task)
          .then(response => {
            this.task = this.createFreshTaskObject()
            this.user.tasks.unshift(response.data)
          })
          .catch(error => {
            console.log(error.response)
          })
      }
    },
    createFreshTaskObject() {
      return {
        id: '',
        user_id: this.user.id,
        description: '',
        state: 'to do'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.create-task-card {
  margin-bottom: 20px;

  h3 {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  select {
    text-transform: uppercase;
    font-size: 14px;
  }
}
.field {
  margin-bottom: 24px;
}

.button-create {
  border: solid black 2px;
  border-radius: 5px;
  padding: 7px 30px;
  font-size: 16px;
}
</style>
