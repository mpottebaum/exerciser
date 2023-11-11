import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { db, dbTables } from '~/db'

export async function loader() {
  const result = await db.from(dbTables.workouts).select()
  return json(result.data)
}

export default function Index() {
  const workouts = useLoaderData<typeof loader>()
  return (
    <ul>
      {workouts?.map((workout) => (
        <li key={workout.id}>
          <p>{workout.name}</p>
        </li>
      ))}
    </ul>
  )
}
