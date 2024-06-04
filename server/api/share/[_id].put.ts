export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    return await ShareSchema.findOneAndUpdate({ _id: event.context.params?._id }, body)
  }
  catch (error) {
    return error
  }
})