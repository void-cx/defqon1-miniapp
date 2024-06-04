<template>
  <div class="overflow-x-auto mb-3 pb-3">
    <table class="table">
      <thead>
        <tr>
          <th>Performance</th>
          <th>Time</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="performance in filteredTimetable" :key="performance.title">
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
                  <img
                    :src="performance.image ?? defaultImage"
                    @error="handlePerformanceImageError(performance)"
                  />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ performance.title }}</div>
                <span v-if="performance.live" class="badge badge-danger badge-sm">LIVE</span>
              </div>
            </div>
          </td>
          <td>{{ performance.startTime }} - {{ performance.endTime }}</td>
          <th>
            <button
              v-if="isInPersonalTimetable(performance)"
              class="btn btn-secondary btn-sm"
              @click="removeFromPersonalTimetable(performance)"
            >
              <i class="far fa-minus"></i>
            </button>
            <button
              v-else
              class="btn btn-primary btn-sm"
              @click="addToPersonalTimetable(performance)"
            >
              <i class="far fa-plus"></i>
            </button>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';
import official from '~/store/timetable.json';
import { useTimetableStore } from '~/store/timetable';
const personalTimetable = useTimetableStore().timetable;

const props = defineProps({
  date: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
    required: false,
  },
  timetable: {
    type: Array,
    required: true,
  },
});

const config = useRuntimeConfig();
const defaultImage = config.public.defaultImage || '/images/defqon-logo.png';

const timetable = ref(props.timetable);

const filteredTimetable = computed(() => timetable?.value?.filter((v) => !v.title?.toLowerCase()?.includes('hosted by')));

watch(
  () => props.timetable,
  (newTimetable) => {
    timetable.value = newTimetable;
  },
  { deep: true }
);

watch(
  personalTimetable,
  (newValue) => {
    useTimetableStore().updateTimetable(newValue)
  },
  { deep: true }
);

function handlePerformanceImageError(performance) {
  performance.image = defaultImage;
}

function isInPersonalTimetable(performance) {
  const dayTimetable = personalTimetable.find((day) => day.date === props.date);
  return dayTimetable?.entries.some((p) => p.performance.title === performance.title) ?? false;
}

function addToPersonalTimetable(performance) {
  try {
    let dayTimetable = personalTimetable.find((day) => day.date === props.date);

    const stage = official.data.find(day => day.date === props.date).stages.find(s => s.id === props.stage)
    delete stage.performances

    if (!dayTimetable) {
      dayTimetable = { date: props.date, entries: [] };
      personalTimetable.push(dayTimetable);
    }

    if (!dayTimetable.entries.some((p) => p.title === performance.title)) {
      dayTimetable.entries.push({
        type: 'act',
        performance,
        stage,
      });
    }
  } catch (error) {
    console.error('Failed to add to personal timetable', error);
  }
}

function removeFromPersonalTimetable(performance) {
  try {
    const dayTimetable = personalTimetable.find((day) => day.date === props.date);

    if (dayTimetable) {
      dayTimetable.entries = dayTimetable.entries.filter((p) => p.performance.title !== performance.title);
    }
  } catch (error) {
    console.error('Failed to remove from personal timetable', error);
  }
}
</script>
