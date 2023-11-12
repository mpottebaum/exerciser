import type { Exercise } from '~/types'

export interface ExerciseTableProps<T extends Exercise> {
  exercises: T[]
  headers: (keyof T & string)[]
}

export function ExerciseTable<T extends Exercise>({
  exercises,
  headers,
}: ExerciseTableProps<T>) {
  return (
    <table className="w-full table-fixed border-collapse border-2 border-black">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} className="border-2 border-black p-2 text-left">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise) => (
          <tr key={exercise.id}>
            {headers.map((header) => {
              const datum = exercise[header]
              return typeof datum === 'string' || typeof datum === 'number' ? (
                <td key={header} className="border-2 border-black p-2">
                  {datum}
                </td>
              ) : null
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
