import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { generatePath, useLoaderData } from '@remix-run/react'
import { Layout, WorkoutRoutine } from '~/components'
import { Routes } from '~/constants/ui'
import { db, dbTables } from '~/db/index.server'
import { exerciseIsCardio, exerciseIsLift } from '~/utils'

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id ? +params.id : params.id ?? ''
  const { data } = await db.from(dbTables.workouts).select().eq('id', id)
  if (data) {
    const [workoutRoutine] = data
    const liftExercises = workoutRoutine.exercises?.filter(exerciseIsLift)
    const cardioExercises = workoutRoutine.exercises?.filter(exerciseIsCardio)
    return json({
      workoutRoutine,
      liftExercises,
      cardioExercises,
    })
  }
  throw new Response('Not found', {
    status: 404,
  })
}

export default function () {
  const { workoutRoutine, liftExercises, cardioExercises } =
    useLoaderData<typeof loader>()
  return (
    <Layout
      actionBtnLabel="+ Exercise"
      actionBtnProps={{
        linkTo: generatePath(Routes.CREATE_WORKOUT_ROUTINE_EXERCISE, {
          id: workoutRoutine.id,
        }),
      }}
    >
      <article className="p-1">
        <WorkoutRoutine
          variant="details"
          workoutRoutine={workoutRoutine}
          liftExercises={liftExercises}
          cardioExercises={cardioExercises}
        />
      </article>
    </Layout>
  )
}