import { type ActionFunctionArgs, redirect } from '@remix-run/node'
import { Form, generatePath } from '@remix-run/react'
import { Button, Input, Layout } from '~/components'
import { Routes } from '~/constants/ui'
import { db, dbTables } from '~/db/index.server'
import type { NewDBWorkoutRoutine } from '~/types'

export default function () {
  return (
    <Layout>
      <Form action={Routes.CREATE_WORKOUT_ROUTINE} method="POST">
        <Input type="text" name="name" />
        <Button name="create" type="submit">
          create
        </Button>
      </Form>
    </Layout>
  )
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const name = formData.get('name')

  const newWorkoutRoutine: NewDBWorkoutRoutine = {
    name: typeof name === 'string' ? name : '',
    type: 'routine',
  }

  const { data, error } = await db
    .from(dbTables.workouts)
    .insert(newWorkoutRoutine)
    .select()
  if (data) {
    const [workoutRoutine] = data
    throw redirect(
      generatePath(Routes.WORKOUT_ROUTINE, { id: workoutRoutine.id }),
    )
  }
  throw Error(error?.message ?? 'oop noo supabase data')
}
