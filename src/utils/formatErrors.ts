import { FieldErrors } from 'react-hook-form';

export const formatErrors = (errors: FieldErrors) => {
  const formErrors = Object.fromEntries(
    Object.entries(errors).map(([key, value]) => [key, value?.message || value])
  );

  return formErrors as any;
};
