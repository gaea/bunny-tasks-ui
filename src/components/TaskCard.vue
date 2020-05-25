<template>
  <li class="list-item">
    <span class="task-description">
      <square-icon size="24" v-if="task.state == 'to do'" />
      <check-square-icon size="24" v-else /> {{ task.description }}</span
    >
    <div class="task-options">
      <edit-icon size="24" />
      <minus-square-icon size="24" />
    </div>
  </li>
</template>

<script>
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
  props: {
    task: Object
  }
}
</script>

<style scoped>
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
}
</style>
