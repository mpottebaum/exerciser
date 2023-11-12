import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { mockWorkoutRoutines } from '~/mock-data'
// import { db, dbTables } from '~/db'
import { Button, Input, WorkoutRoutine } from '~/components'

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

export default function () {
  const workouts = useLoaderData<typeof loader>()
  return (
    <main className="flex w-full flex-col items-center p-1">
      <section className="flex w-full max-w-md flex-col items-center">
        <header className="flex w-full flex-row justify-between p-4">
          <h1>Workout Routines</h1>
          <Button linkTo="/workout-routines/new">+</Button>
        </header>
        <section className="w-full">
          <ul className="w-full">
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
        </section>
      </section>
    </main>
  )
}
