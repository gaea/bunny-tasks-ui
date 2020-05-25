<template>
  <div>
    <h1>Users List</h1>
    <UserCard v-for="user in users" :key="user.id" :user="user" />
  </div>
</template>

<script>
import UserCard from '@/components/UserCard.vue'
import UserService from '@/services/UserService.js'

export default {
  components: {
    UserCard
  },
  data() {
    return {
      users: []
    }
  },
  created() {
    UserService.getUsers()
      .then(response => {
        this.users = response.data
      })
      .catch(error => {
        console.log(error.response)
      })
  }
}
</script>

<style></style>
