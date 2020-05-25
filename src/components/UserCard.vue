<template>
  <router-link
    class="user-link"
    :to="{ name: 'user-show', params: { id: user.id } }"
  >
    <div class="user-card -shadow">
      <h4><user-icon size="36"></user-icon>{{ user.name }} ({{ user.id }})</h4>
      <h5>
        <clipboard-icon size="24"></clipboard-icon> Tasks:
        {{ user.tasks.length }}
      </h5>
    </div>
  </router-link>
</template>

<script>
import { UserIcon, ClipboardIcon } from 'vue-feather-icons'

export default {
  components: {
    UserIcon,
    ClipboardIcon
  },
  props: {
    user: Object
  }
}
</script>

<style scoped>
.user-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.user-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.user-card > .title {
  margin: 0;
}

.user-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
