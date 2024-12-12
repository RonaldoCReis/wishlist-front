import { SignIn } from '@clerk/nextjs';
import React from 'react';

const SignInPage = () => {
  return <SignIn transferable routing="hash" signUpUrl="/auth/sign-up" />;
};

export default SignInPage;
