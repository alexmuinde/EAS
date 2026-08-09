import React from 'react'

export default function Login() {
  return (
    <div>
      <h1 className='text-3xl text-center font-semibold my-7'>Please Login</h1>
      <form className='flex flex-col w-1/3 mx-auto'>
        <input type="email" placeholder='Email' className='border-b-2 border-gray-300  p-2 mb-4 focus:outline-none focus:border-blue-500' />
        <input type="password" placeholder='Password' className='border-b-2 border-gray-300  p-2 mb-4 focus:outline-none focus:border-blue-500' />
        <button type="submit" className='bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600'>Login</button>
      </form>
      <p className='text-center mt-4'>Don't have an account? <a href="/signUp" className='text-blue-500 hover:underline'>Sign Up</a></p>
    </div>
  )
}
