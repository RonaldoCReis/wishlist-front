'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Tooltip } from '@nextui-org/tooltip';
import { Button } from '@nextui-org/button';

import { useNavItems } from '../hooks/useNavItems';

import { useWindowSize } from '@/hooks/useWindowSize';

const Navbar = () => {
  const { breakpoint } = useWindowSize();
  const { navItems } = useNavItems();
  const pathname = usePathname();

  return (
    <aside className="w-[104px] xl:w-60 2xl:w-80 border-r-1 h-full fixed px-4 py-10 flex flex-col items-center xl:items-stretch">
      <h1 className="font-bold text-2xl mb-10 px-4">
        {breakpoint.xl ? 'Wishlist' : 'W'}
      </h1>
      <nav className="flex flex-col items-center xl:items-start gap-2">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);

          return (
            <Tooltip key={item.href} isDisabled={breakpoint.md}>
              <Button
                fullWidth
                as={Link}
                className="xl:justify-start"
                href={item.href}
                startContent={
                  <item.icon size={24} weight={active ? 'fill' : 'bold'} />
                }
                variant={active ? 'flat' : 'light'}
              >
                <span className="hidden xl:block">{item.label}</span>
              </Button>
            </Tooltip>
          );
        })}
      </nav>
    </aside>
  );
};

export default Navbar;
