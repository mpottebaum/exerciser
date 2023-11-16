import { type ActionFunctionArgs, redirect } from '@remix-run/node'
import { Form, generatePath, useSearchParams } from '@remix-run/react'
import { z } from 'zod'
import { Button, Input } from '~/components'
import { Routes } from '~/constants/ui'
import { db, dbTables } from '~/db/index.server'
import {
  type CustomExerciseInput,
  type ExerciseType,
  type NewCardio,
  type NewLift,
  ExerciseTypeEnum,
  newLiftCustomPropsSchema,
  newCardioCustomPropsSchema,
  newExerciseSchema,
} from '~/types'

const exerciseTypes: ExerciseType[] = ['cardio', 'lift']

const liftCustomInputs: CustomExerciseInput<NewLift>[] = [
  { name: 'weight', type: 'number' },
  { name: 'sets', type: 'number' },
  { name: 'repsInSet', type: 'number' },
]

const cardioCustomInputs: CustomExerciseInput<NewCardio>[] = [
  { name: 'time', type: 'number' },
  { name: 'speed', type: 'number' },
]

const exerciseTypeInputs: Record<
  ExerciseType,
  CustomExerciseInput<NewLift>[] | CustomExerciseInput<NewCardio>[]
> = {
  cardio: cardioCustomInputs,
  lift: liftCustomInputs,
}

export default function () {
  const [searchParams, setSearchParams] = useSearchParams()
  const exerciseType = (searchParams.get('type') ?? 'cardio') as ExerciseType
  return (
    <Form method="POST">
      <div className="flex flex-col">
        <label htmlFor="type">Type</label>
        <select
          onChange={(e) =>
            setSearchParams((prev) => {
              prev.set('type', e.target.value)
              return prev
            })
          }
          value={exerciseType}
          name="type"
        >
          {exerciseTypes.map((exType) => (
            <option key={exType} value={exType}>
              {exType}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="template">Template</label>
        <input type="checkbox" name="template" />
      </div>
      <Input type="text" label="name" name="name" />
      {exerciseTypeInputs[exerciseType].map((input) => (
        <Input {...input} key={input.name} label={input.name} />
      ))}
      <Button type="submit">create</Button>
    </Form>
  )
}

const exerciseTypeCustomPropsSchemas: Record<
  ExerciseType,
  typeof newLiftCustomPropsSchema | typeof newCardioCustomPropsSchema
> = {
  lift: newLiftCustomPropsSchema,
  cardio: newCardioCustomPropsSchema,
}

type CustomProperties = Record<string, string | number | null>

export async function action({ params, request }: ActionFunctionArgs) {
  const { id: workoutRoutineId } = params
  const formData = await request.formData()
  formData.forEach((val, key) => console.log({ val, key }))
  const name = formData.get('name')
  const isTemplate = formData.get('template') === 'on'
  const type = ExerciseTypeEnum.parse(formData.get('type'))
  const customInputs = exerciseTypeInputs[type]
  const customProperties: CustomProperties = customInputs.reduce(
    (acc, { name, type: inputType }) => {
      const stringDatum = z.string().parse(formData.get(name))
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
  const { data, error } = await db
    .from(dbTables.exercises)
    .insert(newExercise)
    .select()
  if (data) {
    const [dbExercise] = data
    throw redirect(
      generatePath(Routes.WORKOUT_ROUTINE, { id: workoutRoutineId ?? null }),
    )
  }
  throw Error(error.message)
}
