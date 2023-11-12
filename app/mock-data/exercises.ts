export const mockLiftTemplate = {
  id: 12,
  name: 'chest press',
  type: 'lift' as const,
  isTemplate: true,
  weight: 90,
  sets: 2,
  repsInSet: 10,
}

export const mockCardioTemplate = {
  id: 16,
  name: 'treadmill',
  type: 'cardio' as const,
  isTemplate: true,
  time: 960,
  speed: 7.5,
}
