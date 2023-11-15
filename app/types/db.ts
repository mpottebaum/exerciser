interface SupabaseRecord {
  id: number
  created_at: string
}

export interface DBWorkout extends SupabaseRecord {
  type: 'routine' | 'session'
  name: string
  date?: string
}

export interface DBExercise extends SupabaseRecord {
  type: 'lift' | 'cardio'
  is_template: boolean // default=false
  workout_id?: number
  template_id?: number // foreign key of exercise template
  custom_properties: string // json object w/ custom props
}

export type NewDBWorkoutRoutine = Pick<DBWorkout, 'name' | 'type'>
