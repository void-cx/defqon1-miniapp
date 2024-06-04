import { defineStore } from 'pinia'

export const useTimetableStore = defineStore('timetable', {
  state: () => ({
    shareId: '',
    timetable: [],
  }),
  actions: {
    updateShareId(newId) {
      this.shareId = newId;
    },
    updateTimetable(newTimetable) {
      this.timetable = newTimetable;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
