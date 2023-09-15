import React from 'react'
import Link from 'next/link'

const NavBar = () => {
  return (
    <nav className='flex bg-slate-300 mb-2'>
        <Link href="/" className='link-secondary p-5'>LOGO</Link>
        <Link href="/users" className='link-primary p-5'>Users</Link>
        <Link href="/products" className='link-primary p-5'>Products</Link>
        <Link href="/admin" className='link-primary p-5'>Admin</Link>
    </nav>
  )
}

export default NavBar