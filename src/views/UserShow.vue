<template>
  <div>
    <div class="user-header">
      <h1 class="title">{{ user.name }}</h1>
    </div>
    <TaskCreateCard :user="user" />
    <h3 class="task-summary">
      <clipboard-icon size="24"></clipboard-icon>
      <span class="task-list">List of Tasks</span>
      <span class="badge -fill-gradient">
        {{
        user.tasks ? user.tasks.length : 0
        }}
      </span>
    </h3>
    <ul class="list-group">
      <TaskCard v-for="task in user.tasks" :key="task.id" :task="task" :user="user" />
    </ul>
  </div>
</template>

<script>
import UserService from '@/services/UserService.js'
import TaskCard from '@/components/TaskCard.vue'
import TaskCreateCard from '@/components/TaskCreateCard.vue'
import { ClipboardIcon } from 'vue-feather-icons'

export default {
  components: {
    TaskCard,
    TaskCreateCard,
    ClipboardIcon
  },
  props: ['id'],
  data() {
    return {
      user: {}
    }
  },
  created() {
    UserService.getUser(this.id)
      .then(response => {
        this.user = response.data

        this.user.tasks.sort((a, b) => {
          if (a.id < b.id) {
            return 1
          }
          if (a.id > b.id) {
            return -1
          }

          return 0
        })
      })
      .catch(error => {
        console.log(error.response)
      })
  }
}
</script>

<style scoped>
.task-list {
  padding-left: 10px;
}
.task-summary {
  display: inline;
}
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.user-header > .title {
  margin: 0;
  text-transform: capitalize;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
