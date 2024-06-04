<template>
  <section>
    <div class="columns-2">
      <h1 class="text-3xl text-center defqon">Packing List</h1>
      <div class="float-right defqon"> {{ totalChecked }} / {{ totalItems }} </div>
    </div>
    <div class="w-full">
      <template v-for="category of packingList" :key="category.id">
        <h1 class="text-xl text-center defqon border-t border-gray-600">{{ category.title }} ({{ category.entries.filter(i => i.c).length }} / {{ category.entries.length }})</h1>
        <div v-for="item of category.entries">
          <label class="label cursor-pointer">
            <input
              v-model="item.c"
              type="checkbox"
              class="checkbox"
            />
            <span class="label-text">{{ item.w }}</span>
          </label>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { usePackingStore } from '~/store/packinglist.js';
import { ref, onMounted, watch } from 'vue';

const packingStore = usePackingStore();
const packingList = ref([]);

const loadPackingList = async () => {
  packingList.value = packingStore.list
};

const totalChecked = computed(() => 
  packingList.value?.reduce((count, category) => 
    count + category.entries.filter(item => item.c).length, 0
  )
);

const totalItems = computed(() => 
  packingList.value?.reduce((count, category) => 
    count + category.entries.length, 0
  )
);

watch(
  packingList,
  (newList) => {
    packingStore.updateList(newList)
  },
  { deep: true }
);


onMounted(loadPackingList);
</script>