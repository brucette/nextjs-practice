'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const NewUsersPage = () => {
  const router = useRouter()

  return (
    <>
      NewUsersPage
      <div>
        <button onClick={() => router.push('/users') } className='btn btn-primary'>
          Create
        </button>
      </div>
    </>
  )
}

export default NewUsersPage