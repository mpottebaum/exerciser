import type { z } from 'zod'
import type { ExerciseTypeEnum, cardioSchema, liftSchema } from '../schemas'

interface WorkoutBase {
  // properties shared by all workouts
  id: number
  exercises: Exercise[]
}

export interface WorkoutRoutine extends WorkoutBase {
  type: 'routine'
  name: string
}

export interface WorkoutSession extends WorkoutBase {
  type: 'session'
  date: string // UTC
}

export type Workout = WorkoutRoutine | WorkoutSession

export type Lift = z.infer<typeof liftSchema>

export type Cardio = z.infer<typeof cardioSchema>

export type Exercise = Lift | Cardio

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
