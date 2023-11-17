import { z } from 'zod'

export const supabaseRecord = z.object({
  id: z.number(),
  created_at: z.string(),
})
