<template>
  <div class="create-user-card">
    <form @submit.prevent="createUser">
      <h3>Create a new user!</h3>
      <div class="field">
        <label>Name</label>
        <input v-model="user.name" type="text" placeholder="Please input a name" />
      </div>
      <input type="submit" class="button -fill-gradient button-create" value="Add new user" />
    </form>
  </div>
</template>

<script>
import UserService from '@/services/UserService.js'

export default {
  props: {
    users: Array
  },
  data() {
    return {
      user: this.createFreshUserObject()
    }
  },
  methods: {
    createUser() {
      if (this.user.name != '') {
        UserService.createUser(this.user)
          .then(response => {
            this.user = this.createFreshUserObject()
            this.users.unshift(response.data)
          })
          .catch(error => {
            console.log(error.response)
          })
      }
    },
    createFreshUserObject() {
      return {
        id: '',
        name: ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.create-user-card {
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
