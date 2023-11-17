import { z } from 'zod'

export const WorkoutTypeEnum = z.enum(['routine', 'session'])

export const dbWorkoutSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  type: WorkoutTypeEnum,
  name: z.string(),
  date: z.union([z.string(), z.null()]),
})
