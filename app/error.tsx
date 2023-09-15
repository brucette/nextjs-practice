'use client'
import React from 'react'

// nExt will automatically pass the error object and the reset function to this component
interface Props {
    error: Error;
    reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
    console.log('Error', error)
  return (
    <>
        <div>An unexpected error has occurred.</div>
        <button className="btn" onClick={reset}>Retry</button>
    </>
  )
}

export default ErrorPage