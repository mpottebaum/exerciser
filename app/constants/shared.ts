import type {
  CustomExerciseInput,
  ExerciseType,
  NewCardio,
  NewLift,
} from '~/types'

export const liftCustomInputs: CustomExerciseInput<NewLift>[] = [
  { name: 'weight', type: 'number' },
  { name: 'sets', type: 'number' },
  { name: 'repsInSet', type: 'number' },
]

export const cardioCustomInputs: CustomExerciseInput<NewCardio>[] = [
  { name: 'time', type: 'number' },
  { name: 'speed', type: 'number' },
]

export const exerciseTypeInputs: Record<
  ExerciseType,
  CustomExerciseInput<NewLift>[] | CustomExerciseInput<NewCardio>[]
> = {
  cardio: cardioCustomInputs,
  lift: liftCustomInputs,
}
