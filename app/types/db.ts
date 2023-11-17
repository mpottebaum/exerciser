import type { z } from 'zod'
import type { dbExerciseSchema } from '~/schemas'
import type { dbWorkoutSchema } from '~/schemas/workout'

export type DBWorkout = z.infer<typeof dbWorkoutSchema>

export type DBExercise = z.infer<typeof dbExerciseSchema>

export type NewDBWorkoutRoutine = Pick<DBWorkout, 'name' | 'type'>
