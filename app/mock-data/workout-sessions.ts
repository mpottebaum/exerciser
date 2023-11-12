import type { WorkoutSession } from '~/types'
import { mockCardioTemplate, mockLiftTemplate } from './exercises'

export const mockWorkoutSession: WorkoutSession = {
  id: 2,
  type: 'session',
  date: ' Sat, 11 Nov 2023 19:29:13 GMT',
  exercises: [
    {
      ...mockLiftTemplate,
      isTemplate: false,
    },
    {
      ...mockCardioTemplate,
      isTemplate: false,
    },
  ],
}

export const mockWorkoutSessions: WorkoutSession[] = [mockWorkoutSession]
