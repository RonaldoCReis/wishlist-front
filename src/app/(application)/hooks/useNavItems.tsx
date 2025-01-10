import { useUser } from '@clerk/nextjs';
import { Bookmark, House, Icon, MagnifyingGlass } from '@phosphor-icons/react';

type NavItem = {
  label: string;
  href: string;
  icon: Icon;
};

export const useNavItems = () => {
  const { user } = useUser();
  const navItems: NavItem[] = [
    {
      label: 'Meu Perfil',
      href: `/u/${user?.username}`,
      icon: House,
    },
    {
      label: 'Buscar',
      href: '/search',
      icon: MagnifyingGlass,
    },
    {
      label: 'Salvos',
      href: '/saved',
      icon: Bookmark,
    },
  ];

  return { navItems };
};
