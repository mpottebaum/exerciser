import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { mockWorkoutRoutines } from '~/mock-data'
// import { db, dbTables } from '~/db'
import { WorkoutRoutine } from '~/components'

export async function loader() {
  // const result = await db.from(dbTables.workouts).select()
  // return json(result.data)
  const workoutRoutines = mockWorkoutRoutines
  return json([
    workoutRoutines[0],
    {
      ...workoutRoutines[0],
      id: 2,
    },
  ])
}

export default function Index() {
  const workouts = useLoaderData<typeof loader>()
  return (
    <div className="flex w-full flex-col items-center">
      <ul>
        {workouts?.map((workout) => (
          <li key={workout.id}>
            <div className="pb-4">
              <WorkoutRoutine
                workoutRoutine={workout}
                variant="card"
                linkTo={`/workout-routines/${workout.id}`}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
