import type { Cardio, CustomProperties, Lift } from '~/types'
import { db, dbTables } from './index.server'
import { exerciseTypeInputs } from '~/constants/shared'
import {
  formDataValue,
  ExerciseTypeEnum,
  newExerciseSchema,
  exerciseTypeCustomPropsSchemas,
  dbExerciseSchema,
  liftSchema,
  cardioSchema,
} from '~/schemas'
import { dbWorkoutSchema } from '~/schemas/workout'

interface CreateWorkoutRoutineExerciseData {
  workoutRoutineId: string
  formData: FormData
}

export async function createWorkoutRoutineExercise({
  workoutRoutineId,
  formData,
}: CreateWorkoutRoutineExerciseData) {
  const name = formData.get('name')
  const isTemplate = formData.get('template') === 'on'
  const type = ExerciseTypeEnum.parse(formData.get('type'))
  const customInputs = exerciseTypeInputs[type]
  const customProperties: CustomProperties = customInputs.reduce(
    (acc, { name, type: inputType }) => {
      const stringDatum = formDataValue.parse(formData.get(name))
      const parsedDatum = inputType === 'number' ? +stringDatum : stringDatum
      acc[name] = parsedDatum
      return acc
    },
    {} as CustomProperties,
  )
  const customPropsSchema = exerciseTypeCustomPropsSchemas[type]
  const validatedCustomProps = customPropsSchema.parse(customProperties)
  const newExercise = newExerciseSchema.parse({
    name,
    type,
    is_template: isTemplate,
    workout_id: workoutRoutineId ? +workoutRoutineId : undefined,
    custom_properties: JSON.stringify(validatedCustomProps),
  })
  return db.from(dbTables.exercises).insert(newExercise).select()
}

export async function getWorkoutRoutine(id: string | number) {
  const [workoutsResp, exercisesResp] = await Promise.all([
    db.from(dbTables.workouts).select().eq('id', id),
    db.from(dbTables.exercises).select().eq('workout_id', id),
  ])
  if (workoutsResp.data) {
    const workoutRoutine = dbWorkoutSchema.parse(workoutsResp.data[0])
    if (exercisesResp.data) {
      const lifts: Lift[] = []
      const cardios: Cardio[] = []
      exercisesResp.data.forEach((exerRec) => {
        const exercise = dbExerciseSchema.parse(exerRec)
        const type = ExerciseTypeEnum.parse(exercise.type)
        const customProperties = JSON.parse(exercise.custom_properties)
        if (type === 'lift') {
          const lift = liftSchema.parse({
            type,
            id: exercise.id,
            name: exercise.name,
            createdAt: exercise.created_at,
            isTemplate: exercise.is_template,
            weight: customProperties.weight,
            sets: customProperties.sets,
            repsInSet: customProperties.repsInSet,
          })
          lifts.push(lift)
        }
        if (type === 'cardio') {
          const cardio = cardioSchema.parse({
            type,
            id: exercise.id,
            name: exercise.name,
            createdAt: exercise.created_at,
            isTemplate: exercise.is_template,
            speed: customProperties.speed,
            time: customProperties.time,
          })
          cardios.push(cardio)
        }
      })
      return {
        workoutRoutine,
        lifts,
        cardios,
      }
    }
    return { workoutRoutine, lifts: [], cardios: [] }
  }
  throw Error(workoutsResp.error?.message ?? `whoopsy d'basey`)
}
