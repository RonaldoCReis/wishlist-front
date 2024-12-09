import { useUser } from '@clerk/nextjs';
import {
  Bookmark,
  Gear,
  House,
  Icon,
  MagnifyingGlass,
  TrendUp,
} from '@phosphor-icons/react';

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
    {
      label: 'Analytics',
      href: '/analytics',
      icon: TrendUp,
    },
    {
      label: 'Configurações',
      href: '/settings',
      icon: Gear,
    },
  ];

  return { navItems };
};
