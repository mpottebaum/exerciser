import type { WorkoutRoutine } from '~/types'
import { mockCardioTemplate, mockLiftTemplate } from './exercises'

export const mockWorkoutRoutine: WorkoutRoutine = {
  id: 1,
  type: 'routine',
  name: 'My Workout Routine',
  exercises: [mockLiftTemplate, mockCardioTemplate],
}

export const mockWorkoutRoutines: WorkoutRoutine[] = [mockWorkoutRoutine]
