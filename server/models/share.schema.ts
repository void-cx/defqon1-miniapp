import { defineMongooseModel } from '#nuxt/mongoose'

export const ShareSchema = defineMongooseModel({
  name: 'share',
  schema: {
    timetable: { type: 'string', required: true },
  }
})