import { z } from 'zod'
import type { ExerciseType } from '~/types'
import { supabaseRecord } from './db'

export const ExerciseTypeEnum = z.enum(['lift', 'cardio'])

export const dbExerciseSchema = supabaseRecord.extend({
  name: z.string(),
  is_template: z.boolean(),
  type: ExerciseTypeEnum,
  workout_id: z.union([z.number(), z.null()]),
  template_id: z.union([z.number(), z.null()]),
  custom_properties: z.string(),
})

export const newExerciseSchema = dbExerciseSchema.omit({
  id: true,
  created_at: true,
})

export const liftCustomPropsSchema = z.object({
  weight: z.number(),
  sets: z.number(),
  repsInSet: z.number(),
})

export const cardioCustomPropsSchema = z.object({
  time: z.number(),
  speed: z.number(),
})

export const exerciseTypeCustomPropsSchemas: Record<
  ExerciseType,
  typeof liftCustomPropsSchema | typeof cardioCustomPropsSchema
> = {
  lift: liftCustomPropsSchema,
  cardio: cardioCustomPropsSchema,
}

export const newLiftSchema = newExerciseSchema
  .omit({
    custom_properties: true,
  })
  .merge(liftCustomPropsSchema)

export const liftSchema = dbExerciseSchema
  .pick({
    id: true,
    name: true,
    type: true,
  })
  .extend({
    createdAt: dbExerciseSchema.shape.created_at,
    isTemplate: dbExerciseSchema.shape.is_template,
    workoutId: z.number().optional(),
    templateId: z.number().optional(),
  })
  .merge(liftCustomPropsSchema)

export const newCardioSchema = newExerciseSchema
  .omit({
    custom_properties: true,
  })
  .merge(cardioCustomPropsSchema)

export const cardioSchema = dbExerciseSchema
  .pick({
    id: true,
    name: true,
    type: true,
  })
  .extend({
    createdAt: dbExerciseSchema.shape.created_at,
    isTemplate: dbExerciseSchema.shape.is_template,
    workoutId: z.number().optional(),
    templateId: z.number().optional(),
  })
  .merge(cardioCustomPropsSchema)

export const exerciseSchema = z.union([liftSchema, cardioSchema])
