import { clsx } from 'clsx';
import Link from 'next/link';
import { lusitana } from '@/app/_components/fonts';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 pl-5 block bg-neutral-300 border-blue-600 border-solid border-2 border-spacing-10 rounded-md">
      <ol className={clsx(lusitana.className, 'flex text-xl md:text-2xl')}>
        <span className="mx-3 inline-block text-blue-600">{">"}</span>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? 'text-green-500' : 'text-red-700',
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}