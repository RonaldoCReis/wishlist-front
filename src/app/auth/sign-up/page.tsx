import { SignUp } from '@clerk/nextjs';
import React from 'react';

const SignUpPage = () => {
  return <SignUp signInUrl="/auth/sign-in" />;
};

export default SignUpPage;
