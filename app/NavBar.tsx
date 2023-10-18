'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import Link from 'next/link'

const NavBar = () => {
  const {status, data: session} = useSession();

  return (
    <nav className='flex bg-slate-300 mb-2'>
        <Link href="/" className='link-secondary p-5'>LOGO</Link>
        <Link href="/users" className='link-primary p-5'>Users</Link>
        <Link href="/products" className='link-primary p-5'>Products</Link>
        <Link href="/admin" className='link-primary p-5'>Admin</Link>

        { status === 'loading' && <div>Loading..</div>}
        { status === 'authenticated' && 
          <div>
            {session.user!.name}
            <Link href= "/api/auth/signout" className='ml-3'>Sign out</Link>
          </div>}
        { status === 'unauthenticated' && 
          <div>
            <Link href="/api/auth/signin" className='link-primary p-5'>Sign in</Link>
            <Link href="/register" className='link-primary p-5'>Register</Link>
          </div>}
    </nav>
  )
}

export default NavBar