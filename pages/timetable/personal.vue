<template>
  <section>
    <section>
      <div class="columns-2">
        <h1 class="text-3xl text-center defqon">Personal Timetable </h1>
        <div class="float-right"><small class="text-info" @click="shareTimetable"><i class="far fa-share"></i> Share with others</small></div>
      </div>

      <div class="columns-1 sm:columns-2">
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
    </section>
    
    <div v-if="isLoading" class="text-2xl mt-2 text-center text-secondary defqon">
      <span class="loading loading-infinity loading-lg text-primary"></span>
    </div>
    <section v-else>
      <PersonalTimetable
        v-if="selectedTimetable.length > 0"
        :date="selectedDay"
        :stage="null"
        :timetable="selectedTimetable"
      />
      <div v-else class="text-2xl mt-2 text-center text-secondary defqon">
        <p>No performances saved for this day.</p>
      </div>
    </section>

    <dialog id="share_ok" ref="shareOkModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Personal Timetable uploaded</h3>
        <p class="py-4">Your personal timetable has been uploaded to our servers and can now be shared.</p>
        <a :href="timetableShareUrl">{{ timetableShareUrl }}</a>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useTimetableStore } from '~/store/timetable';
import official from '@/store/timetable.json';

const selectedDay = ref(null);
const days = ref([]);
const selectedTimetable = ref([]);
const isLoading = ref(true);

const shareOkModal = ref(null);
const timetableShareUrl = ref(null);

const fetchTimetableData = async () => {
  try {
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
  const personalTimetable = useTimetableStore();
  const dayTimetable = personalTimetable.timetable.find(v => v.date === date);
  
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

const shareTimetable = async () => {
  try {
    const personalTimetable = useTimetableStore();

    let requestMethod = 'POST'
    let requestPath = '/api/share/create'

    if (personalTimetable.shareId && personalTimetable.shareId.length > 0) {
      requestMethod = 'PUT'
      requestPath = `/api/share/${personalTimetable.shareId}`
    }

    const { data: shareData } = await useFetch(requestPath, {
      method: requestMethod,
      body: {
        timetable: JSON.stringify(personalTimetable.timetable)
      }
    })

    const requestUrl = useRequestURL();
    timetableShareUrl.value = `${requestUrl.origin}/timetable/share#${shareData.value._id}`
    personalTimetable.updateShareId(shareData.value._id)
    shareOkModal.value.showModal()
    navigator.share({
      title: 'My personal DEFQON.1 Timetable',
      url: timetableShareUrl.value
    })
  } catch (error) {
    console.error(error)
  }
}


watch(selectedDay, (date) => {
  loadPersonalTimetable(date);
});

useTimetableStore().$onAction(() => {
  loadPersonalTimetable(selectedDay.value);
});

onMounted(fetchTimetableData);
</script>
