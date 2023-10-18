'use client'
import { FormEvent, useRef } from 'react'
import { useRouter } from 'next/navigation'

const Register = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const submitRef = useRef<HTMLButtonElement>(null)

  const router = useRouter()

  async function submitRegisterForm(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(formRef.current!, submitRef.current)
    
    interface Options {
        method: string
        body: string
        //headers: {
            //'Content-Type': string
        //}
    }
    const options: Options = {
        method: 'POST',
        body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        })
        //headers: {
            //'Content-Type': 'application/json'
        //}
    }
    await fetch('/api/register', options)
    formRef.current!.reset()
    router.push("/api/auth/signin")
  }

  return (
    <div className="w-full max-w-xs">
    <form 
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" 
      ref={formRef} 
      onSubmit={submitRegisterForm}>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Name
            </label>
            <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="name" 
            name="name"
            type="text" 
            placeholder="Name" />
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="email" 
            name="email"
            type="email" 
            placeholder="Email" />
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Password
            </label>
            <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="password" 
            name="password"
            type="password" 
            placeholder="Password" />
        </div>
        <button 
          className='btn btn-secondary' 
          type='submit'
          ref={submitRef}>
            Register
        </button>
    </form>
    </div>
  )
}

export default Register;