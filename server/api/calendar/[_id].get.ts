import { ICalCalendar, ICalAlarmType } from "ical-generator"
import { DateTime } from "luxon"

export default defineEventHandler(async (event) => {
  try {
    const data = await ShareSchema.findOne({ _id: event.context.params?._id })
    if (!data) return { }

    const timetable = JSON.parse(data.timetable);
    const calendar = new ICalCalendar();

    for(const day of timetable) {
      let prevStage = null;
      for(const entry of day.entries.sort((a: { start: number; }, b: { start: number; }) => a.start - b.start)) {
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

    setHeader(event, 'Content-Type', 'text/calendar');

    return calendar.toString()
  }
  catch (error) {
    return error
  }
})