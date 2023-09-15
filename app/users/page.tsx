import React, { Suspense } from 'react'
import UsersTable from './UsersTable'
import Link from 'next/link';

interface Props {
  searchParams: {
    sortOrder: string;
  }
}

const UsersPage = ({ searchParams: { sortOrder }}: Props) => {
    
    return (
    <>
        <h1>USERS</h1>
        <Link href="/users/new" className='btn'>New User</Link>
        {/* <p>{new Date().toLocaleTimeString()}</p> */}
        <UsersTable sortOrder={sortOrder}/>
    </> 
  )
}

export default UsersPage 