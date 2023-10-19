'use client'
import { FormEvent, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const ChangePassword = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const submitRef = useRef<HTMLButtonElement>(null)

  const router = useRouter()
  const {status, data: session} = useSession();

  function submitPasswordForm(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(formRef.current!, submitRef.current)

    interface Options {
        method: string
        body: string
        headers: {
            'Content-Type': string
        }
    }
    const options: Options = {
        method: 'PATCH',
        body: JSON.stringify({
            email: session!.user!.email,
            oldPassword: formData.get('old'),
            newPassword: formData.get('new')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch('/api/update', options)
    formRef.current!.reset()
    router.push("/")
  }

  return (
    <div className="w-full max-w-xs">
        <form 
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" 
            ref={formRef} 
            onSubmit={submitPasswordForm}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Old password
              </label>
              <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="old" 
              name="old"
              type="text" />

              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                New password
              </label>
              <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="new" 
              name="new"
              type="text" />

              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Confirm new password
              </label>
              <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="confirm" 
              name="confirm"
              type="text" />

              <button 
                className='btn btn-secondary' 
                type='submit'
                ref={submitRef}>
                Change password
              </button>
        </div>
        </form>

    </div>
  )
}

export default ChangePassword;