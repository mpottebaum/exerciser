import { redirect } from '@remix-run/node'
import { Routes } from '~/constants/ui'

export async function loader() {
  throw redirect(Routes.HOME, 302)
}
