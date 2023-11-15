import { Form, useSearchParams } from '@remix-run/react'
import { Button, Input } from '~/components'
import type {
  CustomExerciseInput,
  ExerciseType,
  NewCardio,
  NewLift,
} from '~/types'

const exerciseTypes: ExerciseType[] = ['cardio', 'lift']

const liftCustomInputs: CustomExerciseInput<NewLift>[] = [
  { name: 'weight', type: 'text' },
  { name: 'sets', type: 'number' },
  { name: 'repsInSet', type: 'number' },
]

const cardioCustomInputs: CustomExerciseInput<NewCardio>[] = [
  { name: 'time', type: 'number' },
  { name: 'speed', type: 'number' },
]

const exerciseTypeInputs: Record<
  ExerciseType,
  CustomExerciseInput<NewLift>[] | CustomExerciseInput<NewCardio>[]
> = {
  cardio: cardioCustomInputs,
  lift: liftCustomInputs,
}

// is_template => yes/no toggle

export default function () {
  const [searchParams, setSearchParams] = useSearchParams()
  const exerciseType = (searchParams.get('type') ?? 'cardio') as ExerciseType
  return (
    <Form>
      <select
        onChange={(e) =>
          setSearchParams((prev) => {
            prev.set('type', e.target.value)
            return prev
          })
        }
        value={exerciseType}
      >
        {exerciseTypes.map((exType) => (
          <option key={exType} value={exType}>
            {exType}
          </option>
        ))}
      </select>
      {exerciseTypeInputs[exerciseType].map((input) => (
        <Input {...input} key={input.name} label={input.name} />
      ))}
      <Button type="submit">create</Button>
    </Form>
  )
}
