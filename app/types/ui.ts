import type { z } from 'zod'
import type {
  ExerciseTypeEnum,
  cardioSchema,
  exerciseSchema,
  liftSchema,
} from '../schemas'
import type {
  workoutRoutineSchema,
  workoutSchema,
  workoutSessionSchema,
} from '~/schemas/workout'

export type WorkoutRoutine = z.infer<typeof workoutRoutineSchema>

export type WorkoutSession = z.infer<typeof workoutSessionSchema>

export type Workout = z.infer<typeof workoutSchema>

export type Lift = z.infer<typeof liftSchema>

export type Cardio = z.infer<typeof cardioSchema>

export type Exercise = z.infer<typeof exerciseSchema>

export type ExerciseType = z.infer<typeof ExerciseTypeEnum>

export type NewLift = Pick<Lift, 'weight' | 'sets' | 'repsInSet'>

export type NewCardio = Pick<Cardio, 'time' | 'speed'>

export type NewExercise = NewLift | NewCardio

export interface CustomExerciseInput<T extends NewExercise> {
  name: keyof T
  type: HTMLInputElement['type']
  options?: {
    label?: string
    value: string
  }
}

export type CustomProperties = Record<string, string | number | null>
