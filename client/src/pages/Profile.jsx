
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice'


export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  
  const dispatch = useDispatch();
  
  const[formData, setFormData] = useState({})
  
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/users/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(res)
      console.log(formData)
      const data = await res.json();
      console.log(data)

      if(data.success === false) {
        dispatch(updateUserFailure(data.message));
        return
      } 
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  

  return (
    <div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-8 items-center">
          <img 
            defaultValue={currentUser.avatar}      
            src={currentUser.avatar }
            alt="Inspector Avatar Signet"
            className="rounded-full mx-auto block sm:mx-0 sm:shrink-0 h-20 w-20 cursor-pointer border border-blue-700 
            object-cover shadow-sm hover:scale-102 transition-transform "
          />
          <div className="w-full flex flex-col ">
            <div className="">
              <input onChange={handleChange} value={formData.username ?? currentUser.username} id="username"  type="text" placeholder={currentUser.username} className='w-full border-b-2 border-gray-300 p-2 mb-4 focus:outline-none focus:border-blue-500' />
              <input onChange={handleChange} value={formData.email ?? currentUser.email}id="email" type="email" placeholder={currentUser.email} className='w-full border-b-2 border-gray-300  p-2 mb-4 focus:outline-none focus:border-blue-500' />
              <input onChange={handleChange} value={formData.password ?? ''} id="password"  type="password" placeholder={currentUser.password} className='w-full border-b-2 border-gray-300  p-2 mb-4 focus:outline-none focus:border-blue-500' />
            </div>
            <button disabled={loading} type="submit" className='bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600'>
            {loading ? 'Loading...' : 'Update Credentials'}
            </button>
          </div>
      </form>
      {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
    </div>
  )
}
