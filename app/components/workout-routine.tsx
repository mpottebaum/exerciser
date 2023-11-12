import type { Cardio, Lift, WorkoutRoutine } from '~/types'
import { AddLink } from './add-link'
import { ExerciseTable } from './exercise-table'

export interface WorkoutProps {
  workoutRoutine: WorkoutRoutine
  variant?: 'card' | 'details'
  linkTo?: string
  liftExercises?: Lift[]
  cardioExercises?: Cardio[]
}

export function WorkoutRoutine({
  workoutRoutine,
  linkTo,
  variant = 'card',
  liftExercises,
  cardioExercises,
}: WorkoutProps) {
  const { name, exercises } = workoutRoutine
  return (
    <AddLink to={linkTo}>
      <article className="flex flex-col items-start rounded border-2 border-black p-4">
        <h2 className="text-2xl">{name}</h2>
        <section className="w-full">
          <h3 className="text-lg">Exercises</h3>
          {variant === 'card' && (
            <ul>
              {exercises.map((exercise) => (
                <li key={exercise.id}>
                  <article className="flex flex-row">
                    <h4 className="text-base">{exercise.name}</h4>
                  </article>
                </li>
              ))}
            </ul>
          )}
          {variant === 'details' && (
            <>
              {liftExercises && (
                <div className="pb-4">
                  <ExerciseTable
                    exercises={liftExercises}
                    headers={['name', 'weight', 'sets', 'repsInSet']}
                  />
                </div>
              )}
              {cardioExercises && (
                <ExerciseTable
                  exercises={cardioExercises}
                  headers={['name', 'time', 'speed']}
                />
              )}
            </>
          )}
        </section>
      </article>
    </AddLink>
  )
}
