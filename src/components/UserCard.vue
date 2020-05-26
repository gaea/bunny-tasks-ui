<template>
  <li class="list-item">
    <div>
      <input
        type="text"
        v-model="editedValue"
        v-bind:class="[this.editable == false ? 'inactive-input' : '']"
        v-on:keyup.enter="updateUser"
        :readonly="this.editable == false"
        ref="name"
      />
      <div class="task-options">
        <button class="button-option" v-on:click="enableEditUser">
          <edit-icon size="24" />
        </button>
        <button class="button-option" v-on:click="deleteUser">
          <minus-square-icon size="24" />
        </button>
      </div>
    </div>
    <router-link :to="{ name: 'user-show', params: { id: user.id } }">
      <button class="see-tasks-button">
        <div class="task-icon">
          <clipboard-icon size="36" />
        </div>
        <div class="task-text">
          <div>See Tasks</div>
          <div class="task-detail">Total: {{ allTasks }}, Completed: {{ completedTask }}</div>
        </div>
      </button>
    </router-link>
  </li>
</template>

<script>
import { ClipboardIcon, MinusSquareIcon, EditIcon } from 'vue-feather-icons'
import UserService from '@/services/UserService.js'

export default {
  components: {
    ClipboardIcon,
    MinusSquareIcon,
    EditIcon
  },
  data() {
    let completedTasks = this.user.tasks.filter(task => task.state == 'done')
    return {
      completedTask: completedTasks.length,
      pendingTask: this.user.tasks.length - completedTasks.length,
      allTasks: this.user.tasks.length,
      editedValue: this.user.name,
      editable: false
    }
  },
  props: {
    user: Object,
    users: Array
  },
  methods: {
    deleteUser() {
      UserService.deleteUser(this.user.id)
        .then(response => {
          console.log(response)

          let index = this.users.findIndex(element => {
            return element.id == this.user.id
          })

          if (index !== -1) {
            this.users.splice(index, 1)
          }

          alert('User deleted')
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    enableEditUser() {
      this.editable = true
      this.$refs.name.focus()
    },
    updateUser() {
      this.user.name = this.editedValue
      UserService.updateUser(this.user)
        .then(response => {
          this.editedValue = response.data.name
        })
        .catch(error => {
          console.log(error.response)
        })

      this.editable = false
    }
  }
}
</script>

<style lang="scss">
.list-item input {
  text-transform: capitalize;
  font-size: 24px;
  width: 80%;
  margin-bottom: 5px;
}
.button-option {
  background-color: white;
  border: none;
  outline: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
.task-options {
  display: inline;
  float: right;
}
.task-description {
  display: inline;
  vertical-align: middle;
  text-transform: capitalize;

  input {
    width: 75%;
  }
}
.inactive-input {
  border: none;
  outline: none;
  width: 75%;
  text-transform: capitalize;
}
.see-tasks-button {
  border: solid black 2px;
  border-radius: 5px;
  padding: 12px 12px;
  font-size: 22px;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  cursor: pointer;
  flex-grow: 2;
  width: 100%;
}
a {
  text-decoration: none;
}
.task-icon {
  display: block;
  padding-right: 12px;
}
.task-text {
  text-align: start;
}
.task-detail {
  width: 100%;
  display: block;
  font-size: 14px;
}
</style>
