import type { Cardio, Exercise, Lift } from '~/types'

export const exerciseIsLift = (exercise: Exercise): exercise is Lift =>
  exercise.type === 'lift'
export const exerciseIsCardio = (exercise: Exercise): exercise is Cardio =>
  exercise.type === 'cardio'
