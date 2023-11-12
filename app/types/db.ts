interface SupabaseRecord {
  id: number
  created_at: string
}

export interface DBWorkout extends SupabaseRecord {
  type: 'routine' | 'session'
  name?: string
  date?: string
}

export interface DBExercise extends SupabaseRecord {
  type: 'lift' | 'cardio'
  is_template: boolean
  name?: string
  workout_id?: number
  template_id?: number // foreign key of exercise template
  weight?: number
  sets?: number
  reps_in_set?: number
  time?: number
  speed?: number
}
