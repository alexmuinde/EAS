import React, { useState } from 'react'

export default function SignUp() {
  const[formData, setFormData] = useState({})

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('api/auth/signUp',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
    )
    const data = await res.json()
    if(data.success === false) {
      setError(data.message)
      setLoading(false)
      return
    }
    setLoading(false)
    console.log(data)
  }
  console.log(formData)

  return (
    <div>
      <h1 className='text-3xl text-center font-semibold my-7'>Please Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col w-1/3 mx-auto'>
        <input onChange={handleChange} id="username" type="text" placeholder='Username' className='border-b-2 border-gray-300  p-2 mb-4 focus:outline-none focus:border-blue-500' />
        <input onChange={handleChange} id="email" type="email" placeholder='Email' className='border-b-2 border-gray-300  p-2 mb-4 focus:outline-none focus:border-blue-500' />
        <input onChange={handleChange} id="password" type="password" placeholder='Password' className='border-b-2 border-gray-300  p-2 mb-4 focus:outline-none focus:border-blue-500' />
        <button disabled={loading} type="submit" className='bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <p className='text-center mt-4'>Already have an account? <a href="/login" className='text-blue-500 hover:underline'>Login</a></p>
    </div>
  )
}
