import { useEffect, useRef, useState } from 'react'
import type { Exercise } from '~/types'

interface EditableTextProps {
  text: string | number
  name: string
  type: 'text' | 'number'
  onSubmit: (value: string | number) => void
}

function EditableText({ text, name, type, onSubmit }: EditableTextProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  const handleTextClick = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
  ) => {
    setIsEditing(true)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const inputValue = (
      e.currentTarget.elements.namedItem(name) as HTMLInputElement
    ).value
    onSubmit(inputValue)
    setIsEditing(false)
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.value = text.toString()
      inputRef.current.focus()
    }
  }, [isEditing, text])
  return (
    <>
      {!isEditing && <p onClick={handleTextClick}>{text}</p>}
      {isEditing && (
        <form onSubmit={handleFormSubmit}>
          <input
            ref={inputRef}
            onBlur={() => setIsEditing(false)}
            className="w-full"
            type={type}
            name={name}
          />
        </form>
      )}
    </>
  )
}

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
                  <EditableText
                    text={datum}
                    name={header}
                    type={typeof datum === 'string' ? 'text' : 'number'}
                    onSubmit={(val: string | number) =>
                      console.log('submitted', val)
                    }
                  />
                </td>
              ) : null
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
