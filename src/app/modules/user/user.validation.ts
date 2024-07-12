import { z } from 'zod';

// Define the Zod schema for user
const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be 20 characters' })
    .optional(),
});

export { userValidationSchema };
