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

interface ExerciseBase {
  // properties shared by all exercises
  id: number
  name: string
  isTemplate: boolean
  type: ExerciseType
}

export interface Lift extends ExerciseBase {
  type: 'lift'
  weight: number
  sets: number
  repsInSet: number
}

export interface Cardio extends ExerciseBase {
  type: 'cardio'
  time: number // int (seconds)
  speed: number // float
}

export type Exercise = Lift | Cardio

export type ExerciseType = 'lift' | 'cardio'
