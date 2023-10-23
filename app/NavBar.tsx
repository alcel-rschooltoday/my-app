'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaReact } from 'react-icons/fa';
import classNames from 'classnames';

function NavBar() {
    const currentPath = usePathname();
    console.log(currentPath);

    const links = [
        {label: 'Dashboard', href: '/' },
        {label: 'Comments', href: '/comments' },
    ]

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href="/"><FaReact /></Link>
            <ul className='flex space-x-6'>
                {links.map(link => 
                <Link 
                    key={link.href}
                    className={classNames({
                        'text-zinc-900' : link.href === currentPath,
                        'text-zinc-500' : link.href !== currentPath,
                        'hover:text-zinc-900 translate-color' : true
                    })}
                    href={link.href}>{link.label}</Link>)}
            </ul>
        </nav>
    )
}

export default NavBar