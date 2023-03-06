import * as yup from 'yup';

const emailPattern = /^\S+@\S+$/i;

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .required('Email is required field')
      .matches(
        emailPattern,
        "Invalid email address. Valid e-mail can contain only latin letters, numbers, '@' and '."
      ),
    password: yup
      .string()
      .required('Password is required field')
      .min(8, 'Length should be more then 8')
      .max(85, 'Length should be less then 85'),
  })
  .required();

export const registrationSchema = yup
  .object({
    email: yup
      .string()
      .required('Email is required field')
      .matches(
        emailPattern,
        "Invalid email address. Valid e-mail can contain only latin letters, numbers, '@' and '."
      ),
    username: yup.string().required('Username is required field'),
    password: yup
      .string()
      .required('Password is required field')
      .min(8, 'Password must be 8 characters long')
      .max(85, 'Password must be less then 85 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(
        /[^\w]/,
        'Password requires a symbol: ~`! @#$%^&*()_-+={[}]|\\:;"\'<,>.?/'
      ),
    confirmPassword: yup
      .string()
      .required('Confirm password is required field')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();
