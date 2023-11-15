import { json } from '@remix-run/node'
import { generatePath, useLoaderData } from '@remix-run/react'
import { db, dbTables } from '~/db/index.server'
import { WorkoutRoutine } from '~/components'
import { useState } from 'react'
import type { WorkoutRoutine as WorkoutRoutineType } from '~/types'
import { Layout } from '~/components/layout'
import { Routes } from '~/constants/ui'

export async function loader() {
  const result = await db.from(dbTables.workouts).select()
  return json(result.data)
}

export default function () {
  const workouts = useLoaderData<typeof loader>()
  const [activeRoutine, setActiveRoutine] = useState<WorkoutRoutineType | null>(
    null,
  )
  return (
    <Layout
      actionBtnLabel="+ routine"
      actionBtnProps={{ linkTo: Routes.CREATE_WORKOUT_ROUTINE }}
    >
      <article className="flex w-full flex-col">
        <section className="flex w-full flex-col items-center">
          <header className="flex w-full flex-row border-b-2  border-black p-4">
            <h1 className="text-3xl">Workout Routines</h1>
          </header>
          <section className="w-full">
            <ul className="w-full">
              {workouts?.map((workout) => (
                <li key={workout.id}>
                  <WorkoutRoutine
                    workoutRoutine={workout}
                    variant="card"
                    linkTo={generatePath(Routes.WORKOUT_ROUTINE, {
                      id: workout.id,
                    })}
                    isOpen={activeRoutine?.id === workout.id}
                    setIsOpen={() => setActiveRoutine(workout)}
                  />
                </li>
              ))}
            </ul>
          </section>
        </section>
      </article>
    </Layout>
  )
}
