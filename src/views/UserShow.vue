<template>
  <div>
    <div class="event-header">
      <h1><smile-icon size="1x"></smile-icon> #{{ user.name }}</h1>
    </div>
    <h3 class="task-summary">
      <clipboard-icon size="24"></clipboard-icon>
      Tasks
      <span class="badge -fill-gradient">{{
        user.tasks ? user.tasks.length : 0
      }}</span>
      <plus-square-icon size="24" />
    </h3>
    <ul class="list-group">
      <TaskCard v-for="task in user.tasks" :key="task.id" :task="task" />
    </ul>
  </div>
</template>

<script>
import UserService from '@/services/UserService.js'
import TaskCard from '@/components/TaskCard.vue'
import { SmileIcon, ClipboardIcon, PlusSquareIcon } from 'vue-feather-icons'

export default {
  components: {
    TaskCard,
    SmileIcon,
    ClipboardIcon,
    PlusSquareIcon
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
      })
      .catch(error => {
        console.log(error.response)
      })
  }
}
</script>

<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
