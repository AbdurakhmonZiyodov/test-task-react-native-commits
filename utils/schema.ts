import * as yup from 'yup';

export const emailSchema = yup
  .string()
  .email('Invalid email address') // Ensures correct email format
  .required('Email is required'); // Makes email field mandatory

export const usernameSchema = yup
  .string()
  .matches(
    /^[a-zA-Z0-9]+$/,
    'Username must contain only Latin letters and numbers',
  ) // Only allows Latin letters and numbers
  .required('Username is required'); // Makes username field mandatory
