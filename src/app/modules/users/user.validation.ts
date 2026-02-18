import {z} from 'zod';

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string().min(1, 'Email is required'),
        password: z.string().min(1,'Password is required')
        
    })
});

const registerValidationSchema = z.object({
    body:z.object({
        name: z.string().min(1,'Name is required'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6,'Password must be at least 6 characters long')
    })
})
const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(1, 'Old password is required'),
    newPassword: z.string().min(1, 'Password is required'),
  }),
});
export const AuthValidation = {
    loginValidationSchema,
    registerValidationSchema,
    changePasswordValidationSchema,
}