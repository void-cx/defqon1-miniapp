<template>
  <section>
    <section>
      <TimetableNav />
      <div class="">
        <h1 class="text-3xl text-center defqon">Personal Timetable </h1>
        <div class="columns-2 text-center">
          <div><a role="button" nohref class="btn btn-sm text-sm text-info" @click="shareTimetable"><i class="far fa-share"></i> Share with others</a></div>
          <div><a role="button" nohref class="btn btn-sm text-sm text-info" @click="downloadTimetable"><i class="far fa-download"></i> Calendar (*.ics)</a></div>
        </div>
      </div>

      {{ error }}

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
import { DateTime } from 'luxon';
import official from '@/store/timetable.json';
import { ICalCalendar, ICalAlarmType } from 'ical-generator';

const selectedDay = ref(null);
const days = ref([]);
const selectedTimetable = ref([]);
const isLoading = ref(true);
const error = ref('');
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

const downloadTimetable = async () => {
  try {
    const personalTimetable = useTimetableStore();
    const calendar = new ICalCalendar();
    calendar.timezone('Europe/Amsterdam');

    for(const day of personalTimetable.timetable) {
      let prevStage = null;
      for(const entry of day.entries.sort((a, b) => a.start - b.start)) {
        const event = calendar.createEvent({
          start: DateTime.fromISO(entry.performance.start),
          end: DateTime.fromISO(entry.performance.end),
          summary: `${entry.performance.title} @ ${entry.stage.title}`,
          organizer: 'Powered by VOID @ DEFQON.1 (https://defqon1.void.cx) <defqon1@void.cx>',
          url: 'https://defqon1.void.cx',
          timezone: 'Europe/Amsterdam',
          location: {
            title: entry.stage.title
          }
        });

        if (entry.stage.id !== prevStage) {
          event.createAlarm({
            type: ICalAlarmType.display,
            trigger: 10 * 60
          });
          event.createAlarm({
            type: ICalAlarmType.audio,
            trigger: 5 * 60
          });
        }
        prevStage = entry.stage.id;
      }
    }

    const href = URL.createObjectURL(new Blob([calendar.toString()], { type: 'text/calendar' }));
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', `my-defqon1-timetable-${(+new Date())}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);

  } catch (err) {
    alert(err)
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
