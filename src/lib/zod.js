import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  name: z.string().trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .trim(),
})
