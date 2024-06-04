export default defineEventHandler(async (event) => {
  try {
    const data = await ShareSchema.findOne({ _id: event.context.params?._id })
    if (!data) return { }
    return { _id: data._id, timetable: data.timetable, __v: data.__v}
  }
  catch (error) {
    return error
  }
})