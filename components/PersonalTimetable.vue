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
        <tr v-for="entry in timetable">
          <template v-if="entry.type === 'act'">
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-square w-12 h-12">
                    <img
                      :src="entry.stage.image ?? defaultImage"
                      @error="handlePerformanceImageError(entry)"
                    />
                  </div>
                </div>
                <div>
                  <div
                    class="font-bold"
                  >
                    {{ entry.performance.title }}
                  </div>
                  <span v-if="entry.performance.live" class="badge badge-danger badge-sm">LIVE</span>
                </div>
              </div>
            </td>
            <td>{{ entry.performance.startTime }} - {{ entry.performance.endTime }}</td>
            <th v-if="buttons">
              <button
                v-if="isInPersonalTimetable(entry)"
                class="btn btn-secondary btn-sm"
                @click="removeFromPersonalTimetable(entry)"
              >
                <i class="far fa-minus"></i>
              </button>
              <button
                v-else
                class="btn btn-primary btn-sm"
                @click="addToPersonalTimetable(entry)"
              >
                <i class="far fa-plus"></i>
              </button>
            </th>
          </template>
          <template v-else-if="entry.type === 'gap'">
            <th colspan="4">
              <div class="text-center">
                <div class="font-bold" >
                  ⏸️ PAUSE ⏸️ ({{ entry.duration }} minutes)
                </div>
              </div>
            </th>
          </template>
          <template v-else-if="entry.type === 'overlap'">
            <th colspan="4">
              <div class="text-center">
                <div class="font-bold text-secondary" >
                  ⬆️ OVERLAPPING SETS ⬇️ ({{ entry.duration }} minutes)
                </div>
              </div>
            </th>
          </template>
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
  buttons: {
    type: Boolean,
    required: false,
    default: true
  },
});

const config = useRuntimeConfig();
const defaultImage = config.public.defaultImage || '/images/defqon-logo.png';

const timetable = ref(props.timetable);

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

function handlePerformanceImageError(entry) {
  entry.performance.image = defaultImage;
}

function isInPersonalTimetable(entry) {
  const dayTimetable = personalTimetable.find((day) => day.date === props.date);
  return dayTimetable?.entries.some((p) => p.performance.title === entry.performance.title) ?? false;
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

function removeFromPersonalTimetable(entry) {
  try {
    const dayTimetable = personalTimetable.find((day) => day.date === props.date);

    if (dayTimetable) {
      dayTimetable.entries = dayTimetable.entries.filter((p) => p.performance.title !== entry.performance.title);
    }
  } catch (error) {
    console.error('Failed to remove from personal timetable', error);
  }
}
</script>
