<template>
  <div class="btm-nav bg-base-200">
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
  { name: 'Home', icon: 'fa-home', url: '/' },
  {
    name: 'Timetable',
    icon: 'fa-calendar',
    url: '/timetable',
  },
  { name: 'Packing List', icon: 'fa-backpack', url: '/packinglist' },
  { name: 'Help', icon: 'fa-life-ring', url: '/help' },
]
</script>