import { z } from 'zod'
import type { ExerciseType } from '~/types'

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

export const exerciseTypeCustomPropsSchemas: Record<
  ExerciseType,
  typeof newLiftCustomPropsSchema | typeof newCardioCustomPropsSchema
> = {
  lift: newLiftCustomPropsSchema,
  cardio: newCardioCustomPropsSchema,
}

export const newLiftSchema = z.object({
  name: z.string(),
  is_template: z.boolean(),
  type: z.literal(ExerciseTypeEnum.enum.lift),
  weight: z.number(),
  sets: z.number(),
  repsInSets: z.number(),
  workout_id: z.union([z.number(), z.null()]),
})

export const liftSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  name: z.string(),
  isTemplate: z.boolean(),
  type: z.literal(ExerciseTypeEnum.enum.lift),
  weight: z.number(),
  sets: z.number(),
  repsInSet: z.number(),
  workoutId: z.number().optional(),
  templateId: z.number().optional(),
})

export const newCardioSchema = z.object({
  name: z.string(),
  is_template: z.boolean(),
  type: z.literal(ExerciseTypeEnum.enum.cardio),
  time: z.number(),
  speed: z.number(),
  workout_id: z.union([z.number(), z.null()]),
})

export const cardioSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  name: z.string(),
  isTemplate: z.boolean(),
  type: z.literal(ExerciseTypeEnum.enum.cardio),
  time: z.number(),
  speed: z.number(),
  workoutId: z.number().optional(),
  templateId: z.number().optional(),
})

export const dbExerciseSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  name: z.string(),
  is_template: z.boolean(),
  type: ExerciseTypeEnum,
  workout_id: z.union([z.number(), z.null()]),
  template_id: z.union([z.number(), z.null()]),
  custom_properties: z.string(),
})
