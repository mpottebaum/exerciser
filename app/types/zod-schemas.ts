import { z } from 'zod'

export const ExerciseTypeEnum = z.enum(['lift', 'cardio'])

export const newExerciseSchema = z.object({
  name: z.string(),
  is_template: z.boolean(),
  type: ExerciseTypeEnum,
  workout_id: z.number().optional(),
  template_id: z.number().optional(),
  custom_properties: z.string(),
})

export const newLiftCustomPropsSchema = z.object({
  weight: z.number(),
  sets: z.number(),
  repsInSet: z.number(),
})

export const newCardioCustomPropsSchema = z.object({
  time: z.number(),
  speed: z.number(),
})

export const newLiftSchema = z.object({
  name: z.string(),
  is_template: z.boolean(),
  type: ExerciseTypeEnum,
  weight: z.number(),
  sets: z.number(),
  repsInSets: z.number(),
  workout_id: z.number().optional(),
})

export const newCardioSchema = z.object({
  name: z.string(),
  is_template: z.boolean(),
  type: ExerciseTypeEnum,
  time: z.number(),
  speed: z.number(),
  workout_id: z.number().optional(),
})
