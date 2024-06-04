<template>
  <div class="btm-nav bg-base-200">
    <a
      v-for="link in navigationLinks"
      :key="link.name"
      :href="link.url"
      role="button"
      :class="route.path === link.url ? 'active' : ''"
    >
      <i
        class="far"
        :class="link.icon"
      ></i>
      <span class="btm-nav-label">{{ link.name }}</span>
    </a>
  </div>
</template>

<script setup>
const route = useRoute()
const navigationLinks = [
  { name: 'Home', icon: 'fa-home', url: '/' },
  { name: 'Personal', icon: 'fa-calendar-circle-user', url: '/timetable/personal' },
  { name: 'Timetable', icon: 'fa-calendar', url: '/timetable' },
  { name: 'Help', icon: 'fa-life-ring', url: '/help' },
]
</script>