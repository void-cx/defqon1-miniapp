<template>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabindex="0" class="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li v-for="(item, index) of navigation" :key="index">
          <template v-if="item.children">
            <details>
              <summary>
                <i class="far" :class="item.icon"></i>
                {{ item.name }}
              </summary>
              <ul class="p-2">
                <li v-for="(child, cindex) of item.children" :key="index + ':' + cindex">
                  <a :href="child.url">{{ child.name }}</a>
                </li>
              </ul>
            </details>
          </template>
          <template v-else>
            <a :href="item.url">
              <i class="far" :class="item.icon"></i>
              {{ item.name }}
            </a>
          </template>
        </li>
      </ul>
    </div>
    <a href="/" class="btn btn-ghost text-xl">VOID @ DEFQON.1 2024</a>
  </div>
  <div class="navbar-center hidden lg:flex z-50">
    <ul class="menu menu-horizontal px-1">
      <li v-for="(item, index) of navigation" :key="index">
        <template v-if="item.children">
          <details>
            <summary>
              <i class="far" :class="item.icon"></i>
              {{ item.name }}
            </summary>
            <ul class="p-2">
              <li v-for="(child, cindex) of item.children" :key="index + ':' + cindex">
                <a :href="child.url">
                  <i class="far" :class="child.icon"></i>
                  {{ child.name }}
                </a>
              </li>
            </ul>
          </details>
        </template>
        <template v-else>
          <a :href="item.url">
            <i class="far" :class="item.icon"></i>
            {{ item.name }}
          </a>
        </template>
      </li>
    </ul>
  </div>
  <div class="navbar-end">
    <a role="button" href="https://ko-fi.com/doxylamin" class="btn btn-ghost btn-circle">
      <i class="far fa-mug-hot"></i>
    </a>
  </div>
</div>
</template>

<script setup>
const route = useRoute()
const navigation = [
  {
    name: 'Home',
    icon: 'fa-home',
    url: '/'
  },
  {
    name: 'Timetable',
    icon: 'fa-calendar',
    children: [
      {
        name: 'Official',
        icon: 'fa-calendar',
        url: '/timetable',
      },
      {
        name: 'Personal',
        icon: 'fa-calendar-circle-user',
        url: '/timetable/personal',
      },
    ]
  },
  {
    name: 'Packing List',
    icon: 'fa-backpack',
    url: '/packinglist'
  },
  { name: 'Questions & Answers', icon: 'fa-block-question', url: '/faq' },
  { name: 'Help', icon: 'fa-life-ring', url: '/help' },
]
</script>