'use client';

import {
  MagnifyingGlassPlusIcon,
  DocumentDuplicateIcon,
  DocumentPlusIcon,
  UserIcon,
  WindowIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

// Link module for client side page navigation
import Link from 'next/link';

// pathname allows client to fetch current url location
import { usePathname } from 'next/navigation';

// clsx allows client to render css classes dynamically
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: 'Discover',
    href: '/blog/discover',
    icon: MagnifyingGlassPlusIcon,
  },
  {
    name: 'Following',
    href: '/blog/following',
    icon: UserGroupIcon,
  },
  {
    name: 'Published Feed',
    href: '/blog/Published',
    icon: WindowIcon,
  },
  {
    name: 'Manage Posts',
    href: '/blog/manage',
    icon: DocumentDuplicateIcon,
  },
  {
    name: 'Create Post',
    href: '/blog/create',
    icon: DocumentPlusIcon,
  },
  {
    name: 'User Settings',
    href: '/blog/user',
    icon: UserIcon,
  },


];

export default function NavLinks() {

  // declared variable for pathname usage
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-sky-100 text-green-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}