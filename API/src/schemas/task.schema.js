const { z } = require('zod')

const createTaskSchema = z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    description: z.string({
        required_error: "description is required"
    }),
    date: z.string().datetime().optional(),
  });

module.exports = {
    createTaskSchema
}