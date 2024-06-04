<template>
  <section class="w-full text-center mb-3">
    <ul class="menu bg-base-200 menu-horizontal rounded-box w-full ">
      <li v-for="link in navigationLinks" :key="link.url">
        <a :href="link.url" :class="route.path == link.url ? 'active' : ''">
          <i class="far" :class="link.icon"></i>
          {{ link.name }}
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup>
const route = useRoute()
const navigationLinks = [
  { name: 'Official', icon: 'fa-calendar', url: '/timetable' },
  { name: 'Personal', icon: 'fa-calendar-circle-user', url: '/timetable/personal' },
  { name: 'Shared', icon: 'fa-calendar-users', url: '/timetable/share' },
]
</script>