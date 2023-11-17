import { type ActionFunctionArgs, redirect } from '@remix-run/node'
import { Form, generatePath, useSearchParams } from '@remix-run/react'
import { Button, Input } from '~/components'
import { exerciseTypeInputs } from '~/constants/shared'
import { Routes } from '~/constants/ui'
import { createWorkoutRoutineExercise } from '~/db/workout-routines.server'
import { formDataValue } from '~/schemas'
import type { ExerciseType } from '~/types'

const exerciseTypes: ExerciseType[] = ['cardio', 'lift']

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

export async function action({ params, request }: ActionFunctionArgs) {
  const { id } = params
  const workoutRoutineId = formDataValue.parse(id)
  const formData = await request.formData()
  formData.forEach((val, key) => console.log({ val, key }))
  const { data, error } = await createWorkoutRoutineExercise({
    workoutRoutineId,
    formData,
  })
  if (data) {
    const [dbExercise] = data
    throw redirect(
      generatePath(Routes.WORKOUT_ROUTINE, { id: workoutRoutineId ?? null }),
    )
  }
  throw Error(error.message)
}
