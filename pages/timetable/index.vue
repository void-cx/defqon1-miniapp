<template>
  <section>
    <section>
      <TimetableNav />
      <div class="columns-2">
        <h1 class="text-3xl text-center defqon">Official Timetable </h1>
        <div class="float-right"></div>
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
        <label
          v-if="selectedDay != null"
          class="form-control w-full"
        >
          <div class="label">
            <span class="label-text">Select stage</span>
          </div>
          <select
            v-model="selectedStage"
            class="select select-bordered"
          >
            <option
              v-for="stage in stages"
              :key="stage.id"
              :value="stage.id"
            >
              {{ stage.title }}
            </option>
          </select>
        </label>
      </div>
    </section>
    <Timetable
      v-if="selectedDay != null && selectedStage != null"
      :date="selectedDay"
      :stage="selectedStage"
      :timetable="selectedTimetable"
    />
  </section>
</template>

<script setup>
import timetable from '@/store/timetable.json';
import { ref, onMounted, watch } from 'vue';

const selectedDay = ref(null);
const selectedStage = ref(null);
const days = ref([]);
const stages = ref([]);
const selectedTimetable = ref([]);
const selectedStageImage = ref(null);

const fetchTimetableData = async () => {
  try {
    days.value = timetable.data.map(v => ({ name: `${v.day} (${v.date})`, value: v.date }));
    if (days.value.length > 0) {
      selectedDay.value = days.value[0].value; // Set the default selected day
    }
  } catch (error) {
    console.error('Error fetching timetable data:', error);
  }
};

const updateStages = (date) => {
  selectedStage.value = null;
  selectedStageImage.value = null;
  const selectedDayTimetable = timetable.data.find(timetable => timetable.date === date);
  stages.value = selectedDayTimetable ? selectedDayTimetable.stages : [];
};

const updateSelectedTimetable = () => {
  const selectedDayTimetable = timetable.data.find(timetable => timetable.date === selectedDay.value);
  if (selectedDayTimetable) {
    const selectedStageTimetable = selectedDayTimetable.stages.find(v => v.id == selectedStage.value)
    if (selectedStageTimetable) {
      selectedStageImage.value = selectedStageTimetable.image
      selectedTimetable.value = selectedStageTimetable ? selectedStageTimetable.performances : [];
    }    
  } else {
    selectedTimetable.value = [];
  }
};


watch(selectedDay, (date) => {
  updateStages(date);
});

watch(selectedStage, () => {
  selectedTimetable.value = [];
  updateSelectedTimetable();
});

onMounted(fetchTimetableData);
</script>