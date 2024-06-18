<template>
  <section>
    <TimetableNav />
    <div class="">
      <h1 class="text-3xl text-center defqon">Shared Timetable </h1>
      <div class="columns-2 text-center">
        <div v-if="shareId && sharedTimetable"><a role="button" href="#" class="btn btn-sm text-sm text-info" @click="runTimetableImport"><i class="far fa-download"></i> Import & Replace</a></div>
        
        <div v-if="shareId && sharedTimetable"><a role="button" nohref class="btn btn-sm text-sm text-info" @click="downloadTimetable"><i class="far fa-download"></i> Calendar (*.ics)</a></div>
      </div>
    </div>

    <template v-if="shareId">
      <div v-if="shareId" class="columns-1 sm:columns-2">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Select timetable day</span>
          </div>
          <select
            v-model="selectedDay"
            class="select select-bordered"
          >
          <option
            v-for="day in days"
            :key="day.value"
            :value="day.value"
          >
            {{ day.name }}
          </option> 
          </select>
        </label>
      </div>
      
      <div v-if="isLoading" class="text-2xl mt-2 text-center text-secondary defqon">
        <span class="loading loading-infinity loading-lg text-primary"></span>
      </div>
      <section v-else>
        <PersonalTimetable
          v-if="selectedTimetable.length > 0"
          :date="selectedDay"
          :stage="null"
          :timetable="selectedTimetable"
          :buttons="false"
        />
        <div v-else class="text-2xl mt-2 text-center text-secondary defqon">
          <p>No performances saved for this day.</p>
        </div>
      </section>
    </template>

    <template v-else>
      <div role="alert" class="alert shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div>
          <h3 class="font-bold">Shared Timetable</h3>
          <div class="text-xs">You have not provided a shared timetable id. When someone shares their timetable with you, this page will be used to display it.</div>
        </div>
        <a role="button" href="/timetable" class="btn btn-sm">Create own timetable</a>
      </div>
    </template>
    
  </section>

  <dialog id="import_ok" ref="importOkModal" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Timetable imported</h3>
      <p class="py-4">The shared timetable has been downloaded into your local storage and is now available.</p>
      <div class="modal-action">
        <form method="dialog">
          <a role="button" href="/timetable/personal" class="btn">Close</a>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useTimetableStore } from '~/store/timetable';
import official from '@/store/timetable.json';

const selectedDay = ref(null);
const days = ref([]);
const sharedTimetable = ref([]);
const selectedTimetable = ref([]);
const isLoading = ref(true);
const shareId = ref('')

const importOkModal = ref(null)

const fetchTimetableData = async () => {
  try {
    const route = useRoute()
    shareId.value = route.hash.substring(1)
    if (shareId.value === '') return
    const getShareData = await $fetch(`/api/share/${shareId.value}`)
    if (!getShareData.timetable) return

    sharedTimetable.value = JSON.parse(getShareData.timetable)
    
    days.value = official.data.map(v => ({ name: `${v.day} (${v.date})`, value: v.date }));
    if (days.value.length > 0) {
      selectedDay.value = days.value[0].value; // Set the default selected day
    }
  } catch (error) {
    console.error('Error fetching timetable data:', error);
  }
};

const loadPersonalTimetable = async (date) => {
  isLoading.value = true;

  const dayTimetable = sharedTimetable.value.find(v => v.date === date);
  
  if (dayTimetable) {
    const entries = dayTimetable.entries
      .map(entry => ({
        ...entry,
        start: new Date(entry.performance.start),
        end: new Date(entry.performance.end)
      }))
      .sort((a, b) => a.start - b.start);

    const enhancedTimetable = [];

    for (let i = 0; i < entries.length; i++) {
      if (i > 0) {
        const prevEnd = entries[i - 1].end.getTime();
        const currStart = entries[i].start.getTime();

        if (prevEnd < currStart) {
          const duration = Math.floor((currStart - prevEnd) / 60000); // Duration in minutes
          enhancedTimetable.push({ 
            type: 'gap', 
            start: entries[i - 1].end, 
            end: entries[i].start,
            duration 
          });
        } else if (prevEnd > currStart) {
          const duration = Math.floor((prevEnd - currStart) / 60000); // Duration in minutes
          enhancedTimetable.push({ 
            type: 'overlap', 
            start: entries[i - 1].end, 
            end: entries[i].start,
            duration 
          });
        }
      }
      enhancedTimetable.push(entries[i]);
    }
    selectedTimetable.value = enhancedTimetable;
  } else {
    selectedTimetable.value = [];
  }
  isLoading.value = false;
};

const runTimetableImport = async () => {
  const tts = useTimetableStore();
  tts.updateTimetable(sharedTimetable.value)
  importOkModal.value.showModal()
};

const downloadTimetable = async () => {
  window.location.href = `/api/calendar/${shareId.value}`
}

watch(selectedDay, (date) => {
  loadPersonalTimetable(date);
});

onMounted(fetchTimetableData);
</script>