import { z } from 'zod';

// Define the Zod schema for user
const userValidationSchema = z.object({
  id: z.string().nonempty('ID is required.'),
  password: z
    .string()
    .max(20, { message: 'Password can not be 20 characters' }),
  needsPasswordChange: z.boolean().default(true),
  role: z.enum(['student', 'faculty', 'admin']),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  isDeleted: z.boolean().optional().default(false),
});

export { userValidationSchema };
