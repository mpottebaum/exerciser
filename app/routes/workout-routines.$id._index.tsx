import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { generatePath, useLoaderData } from '@remix-run/react'
import { Layout, WorkoutRoutine } from '~/components'
import { Routes } from '~/constants/ui'
import { getWorkoutRoutine } from '~/db/workout-routines.server'

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id ? +params.id : params.id ?? ''
  const data = await getWorkoutRoutine(id)
  return json(data)
}

export default function () {
  const loaderData = useLoaderData<typeof loader>()
  return (
    <Layout
      actionBtnLabel="+ Exercise"
      actionBtnProps={{
        linkTo: generatePath(Routes.CREATE_WORKOUT_ROUTINE_EXERCISE, {
          id: loaderData.workoutRoutine.id.toString(),
        }),
      }}
    >
      <article className="p-1">
        <WorkoutRoutine
          variant="details"
          workoutRoutine={loaderData.workoutRoutine}
          liftExercises={loaderData.lifts}
          cardioExercises={loaderData.cardios}
        />
      </article>
    </Layout>
  )
}
