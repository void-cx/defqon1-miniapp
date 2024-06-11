<template>
  <div class="btm-nav bg-base-200" style="z-index:9999">
    <template
      v-for="link in navigationLinks"
      :key="link.name"
    >
      <a
        :href="link.url"
        role="button"
        :class="route.path == link.url ? 'active' : ''"
      >
        <i
          class="far"
          :class="link.icon"
        ></i>
        <span class="btm-nav-label">{{ link.name }}</span>
      </a>
    </template>
  </div>
</template>

<script setup>
const route = useRoute()
const navigationLinks = [
  { name: 'Official', icon: 'fa-calendar', url: '/timetable' },
  { name: 'Personal', icon: 'fa-calendar-circle-user', url: '/timetable/personal' },
  { name: 'Shared', icon: 'fa-calendar-users', url: '/timetable/share' },
]
</script>