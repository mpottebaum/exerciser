import { Form } from '@remix-run/react'
import { Input } from '~/components'

export default function () {
  return (
    <Form>
      <Input label="type" name="type" type="radio" />
    </Form>
  )
}
