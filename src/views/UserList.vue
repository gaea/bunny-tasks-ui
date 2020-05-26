<template>
  <div>
    <UserCreateCard :users="users" />
    <h3 class="user-summary">
      <users-icon size="24"></users-icon>
      <span class="user-list">List of Users</span>
    </h3>
    <ul class="list-group">
      <UserCard v-for="user in users" :key="user.id" :user="user" :users="users" />
    </ul>
  </div>
</template>

<script>
import UserCard from '@/components/UserCard.vue'
import UserCreateCard from '@/components/UserCreateCard.vue'
import UserService from '@/services/UserService.js'
import { UsersIcon } from 'vue-feather-icons'

export default {
  components: {
    UserCard,
    UserCreateCard,
    UsersIcon
  },
  data() {
    return {
      users: []
    }
  },
  created() {
    UserService.getUsers()
      .then(response => {
        this.users = response.data.sort((a, b) => {
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

<style lang="scss">
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.user-summary {
  display: inline;
}
.user-list {
  padding-left: 10px;
}
</style>
