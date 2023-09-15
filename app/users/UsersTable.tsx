import React from 'react'
import Link from 'next/link';
import { sort } from 'fast-sort';

// typescript interface: how the data is 
interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    sortOrder: string;
}


const UsersTable = async ({ sortOrder }: Props) => {

    const res = await fetch('https://jsonplaceholder.typicode.com/users'); // to disable: cache: 'no-store'  or limit caching: next: { revalidate: 10 } - will get fresh data from backend every 10 seconds 
    const users: User[] = await res.json();
    //console.log(users)

    // Sort users in ascending order by firstName and lastName
    const sortedUsers = sort(users).asc(
        sortOrder === 'email' 
        ? user => user.email 
        : user => user.name);
  
    return (
    <div>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>
                        <Link href="/users?sortOrder=name">Name</Link>
                    </th>
                    <th>
                        <Link href="/users?sortOrder=email">Email</Link>
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedUsers.map(user => { 
                    return (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    )})}
            </tbody>
        </table>
    </div>
  )
}

export default UsersTable