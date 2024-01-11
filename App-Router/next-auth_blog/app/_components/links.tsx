'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
 
export function Links() {
  const pathname = usePathname()
 
  return (
    <nav>
      <ul className='p-10 flex flex-row flex-nowrap flex-auto space-x-4 bg-slate-400'>
        <li className='p-5 rounded bg-zinc-900'>
          <Link className={`link ${pathname === '/' ? 'active text-sky-400' : ''}`} href="/">
            Landing Page
          </Link>
        </li>
        <li className='p-5 rounded bg-zinc-900'>
          <Link
            className={`link ${pathname === '/feed' ? 'active text-sky-400' : ''}`}
            href="/feed"
          >
            Blog Feed
          </Link>
        </li>
      </ul>
    </nav>
  )
}