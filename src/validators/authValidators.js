import { z } from 'zod';

export const signUpValidator = z.object({
  firstName: z.string(),
  lastName: z.string(),
  password: z
    .string(),
     email: z.string().min(3).max(30),
}).required({ message: 'Please enter all the required fields' });


export const signInValidator = z.object({
  email: z.string(),
  password: z.string(),
}).required({ message: 'Please enter all the required fields' });
