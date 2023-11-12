import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { WorkoutRoutine } from '~/components'
import { mockWorkoutRoutines } from '~/mock-data'
import { exerciseIsCardio, exerciseIsLift } from '~/utils'

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id ? +params.id : params.id
  if (id) {
    const workoutRoutine = mockWorkoutRoutines.find((w) => w.id === id)
    if (workoutRoutine) {
      const liftExercises = workoutRoutine.exercises.filter(exerciseIsLift)
      const cardioExercises = workoutRoutine.exercises.filter(exerciseIsCardio)
      return json({
        workoutRoutine,
        liftExercises,
        cardioExercises,
      })
    }
  }
  throw new Response('Not found', {
    status: 404,
  })
}

export default function () {
  const { workoutRoutine, liftExercises, cardioExercises } =
    useLoaderData<typeof loader>()
  return (
    <article className="p-1">
      <WorkoutRoutine
        variant="details"
        workoutRoutine={workoutRoutine}
        liftExercises={liftExercises}
        cardioExercises={cardioExercises}
      />
    </article>
  )
}
