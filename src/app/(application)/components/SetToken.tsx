'use client';

import { useAuth } from '@clerk/nextjs';

import { api } from '@/api/api';

const SetToken = () => {
  const { getToken } = useAuth();

  const setToken = async () => {
    const token = await getToken();

    api.setToken(token || '');
  };

  setToken();

  return null;
};

export default SetToken;
