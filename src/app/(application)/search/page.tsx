'use client';
import { Input } from '@nextui-org/react';
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import { useQueryState } from 'nuqs';
import React from 'react';

import UserCard from './components/UserCard';

import { useUsers } from '@/hooks/queries/useUser';
import useDebounce from '@/hooks/useDebounce';

const SearchPage = () => {
  const [search, setSearch] = useQueryState('s');
  const debouncedSearch = useDebounce(search, 500);

  const { data: users } = useUsers({ search: debouncedSearch || undefined });

  return (
    <div className="flex flex-col gap-2">
      <Input
        className="mb-2"
        placeholder="Buscar Usuários"
        size="lg"
        startContent={<MagnifyingGlass size={24} />}
        value={search || ''}
        onChange={(e) => setSearch(e.target.value)}
      />
      {users?.map((user) => <UserCard key={user.id} user={user} />)}
    </div>
  );
};

export default SearchPage;
