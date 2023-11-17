import { z } from 'zod'
import { supabaseRecord } from './db'
import { exerciseSchema } from '.'

export const WorkoutTypeEnum = z.enum(['routine', 'session'])

export const dbWorkoutSchema = supabaseRecord.extend({
  type: WorkoutTypeEnum,
  name: z.string(),
  date: z.union([z.string(), z.null()]),
})

export const newWorkoutRoutineSchema = dbWorkoutSchema.omit({
  id: true,
  created_at: true,
})

export const workoutRoutineSchema = dbWorkoutSchema
  .pick({
    id: true,
    type: true,
    name: true,
  })
  .extend({
    exercises: exerciseSchema.array(),
  })

export const workoutSessionSchema = dbWorkoutSchema
  .pick({
    id: true,
    type: true,
    date: true,
  })
  .extend({
    exercises: exerciseSchema.array(),
  })

export const workoutSchema = z.union([
  workoutRoutineSchema,
  workoutSessionSchema,
])
