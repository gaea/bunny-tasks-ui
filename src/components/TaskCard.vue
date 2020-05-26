<template>
  <li class="list-item">
    <span class="task-description">
      <button class="button-option" v-on:click="toggleStateTask">
        <square-icon size="24" v-if="task.state == 'to do'" />
        <check-square-icon size="24" v-else />
      </button>
      <input
        type="text"
        v-model="editedValue"
        v-bind:class="[this.editable == false ? 'inactive-input' : '']"
        v-on:keyup.enter="updateTask"
        :readonly="this.editable == false"
        ref="description"
      />
    </span>
    <div class="task-options">
      <button class="button-option" v-on:click="enableEditTask">
        <edit-icon size="24" />
      </button>
      <button class="button-option" v-on:click="deleteTask">
        <minus-square-icon size="24" />
      </button>
    </div>
  </li>
</template>

<script>
import TaskService from '@/services/TaskService.js'
import {
  SquareIcon,
  CheckSquareIcon,
  MinusSquareIcon,
  EditIcon
} from 'vue-feather-icons'

export default {
  components: {
    SquareIcon,
    CheckSquareIcon,
    MinusSquareIcon,
    EditIcon
  },
  data() {
    return {
      editable: false,
      editedValue: this.task.description
    }
  },
  props: {
    task: Object,
    user: Object
  },
  methods: {
    deleteTask() {
      TaskService.deleteTask(this.task)
        .then(response => {
          console.log(response)

          let index = this.user.tasks.findIndex(element => {
            return element.id == this.task.id
          })

          if (index !== -1) {
            this.user.tasks.splice(index, 1)
          }

          alert('Task deleted')
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    toggleStateTask() {
      this.task.state = this.task.state == 'to do' ? 'done' : 'to do'

      TaskService.updateTask(this.task)
        .then(response => {
          this.task.description = response.data.description
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    enableEditTask() {
      this.editable = true
      this.$refs.description.focus()
    },
    updateTask() {
      this.task.description = this.editedValue
      TaskService.updateTask(this.task)
        .then(response => {
          //this.task = response.data
          this.editedValue = response.data.description
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
</style>
