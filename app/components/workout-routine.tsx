import type { Cardio, Lift, WorkoutRoutine } from '~/types'
import { AddLink } from './add-link'
import { ExerciseTable } from './exercise-table'

export interface WorkoutProps {
  workoutRoutine: Pick<WorkoutRoutine, 'name'>
  variant?: 'card' | 'details'
  linkTo?: string
  liftExercises?: Lift[]
  cardioExercises?: Cardio[]
  isOpen?: boolean
  setIsOpen?: (isOpen: boolean) => void
}

export function WorkoutRoutine({
  workoutRoutine,
  linkTo,
  variant = 'card',
  liftExercises,
  cardioExercises,
  isOpen = true,
  setIsOpen,
}: WorkoutProps) {
  const { name } = workoutRoutine
  const isCard = variant === 'card'
  const isDetails = variant === 'details'
  const handleClick = () => {
    if (isCard && !isOpen && setIsOpen) {
      setIsOpen(true)
    }
  }
  return (
    <AddLink to={isOpen ? linkTo : undefined}>
      <article
        onClick={handleClick}
        className="flex flex-col items-start border-b-2 border-black p-4"
      >
        <h2 className="text-2xl">{name}</h2>
        {isOpen && (
          <section className="w-full">
            {isCard && <p>expando</p>}
            {isDetails && (
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
        )}
      </article>
    </AddLink>
  )
}
