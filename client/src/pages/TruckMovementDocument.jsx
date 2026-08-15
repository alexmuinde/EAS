import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function TruckMovementDocument() {
  const { id } = useParams();
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // 1. Fetch document data on page mount if ID exists in URL
  useEffect(() => {
    if (!id) return; // If on new document creation path, do nothing

    const fetchDocument = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/createDoc/get/${id}`) // Update path to match your GET route
        const data = await res.json()
        
        if (data.success === false) {
          setError(data.message)
          setLoading(false)
          return
        }

        setFormData(data) // Populate form state with saved MongoDB document
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch document details.')
        setLoading(false)
      }
    }

    fetchDocument()
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch('/api/createDoc/truckMovementDocument', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      
      if (data.success === false) {
        setLoading(false)
        setError(data.message)
        return
      }
      setLoading(false)
      setError(null)
      navigate(`/truckMovementDocument/${data._id}`)
    } catch (error) {
      setLoading(false)
      setError('An error occurred while submitting.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full p-2 grid grid-col gap-2 md:grid-cols-2">
      <div className='md:col-span-2'>
        <h1 className='text-xl font-medium p-2 text-center'>EAST AFRICAN STORAGE COMPANY LTD.</h1>
        <h2 className='p-2 text-center'>TRUCK MOVEMENT DOCUMENT</h2>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl md:col-span-2">
        <input 
          onChange={handleChange} 
          id="firstTodaysDate" 
          type='date' 
          value={formData.firstTodaysDate || ''} 
          placeholder='Todays Date' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl'
        />
        <input 
          onChange={handleChange} 
          id="firstClient" 
          type='text' 
          value={formData.firstClient || ''} 
          placeholder='Client' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl' 
        />
        <input 
          onChange={handleChange} 
          id="firstTruckNumber" 
          type='text' 
          value={formData.firstTruckNumber || ''} 
          placeholder='Truck Number' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl' 
        />
        <input 
          onChange={handleChange} 
          id="transpoter" 
          type='text' 
          value={formData.transpoter || ''} 
          placeholder='Transpoter' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl' 
        />
      </div>

      {/* Security Section */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className='col-span-2 border-b-2 border-gray-100'>
          <h3 className='font-medium text-wrap p-2 text-center'>SECURITY</h3>
        </div>
        <input 
          onChange={handleChange} 
          id="secondTodaysDate" 
          type='date' 
          value={formData.secondTodaysDate || ''} 
          placeholder='Todays Date' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl'
        />
        <input 
          onChange={handleChange} 
          id="thirdTodaysDate" 
          type='date' 
          value={formData.thirdTodaysDate || ''} 
          placeholder='Todays Date' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl'
        />
        <input 
          onChange={handleChange} 
          id="secondClient" 
          type='text' 
          value={formData.secondClient || ''} 
          placeholder='Client' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl' 
        />
        <input 
          onChange={handleChange} 
          id="secondTruckNumber" 
          type='text' 
          value={formData.secondTruckNumber || ''} 
          placeholder='Truck Number' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl' 
        />
      </div>

      {/* Surveyor Section */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className='col-span-2 border-b-2 border-gray-100'>
          <h3 className='font-medium text-wrap p-2 text-center'>SURVEYOR : SGS/ITS/B VERITAS/PAUPHILE</h3>
        </div>
        <input 
          onChange={handleChange} 
          id="securityName" 
          type='text' 
          value={formData.securityName || ''} 
          placeholder='Security Name' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl'
        />
        <input 
          onChange={handleChange} 
          id="driversName" 
          type='text' 
          value={formData.driversName || ''} 
          placeholder='Drivers Name' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl'
        />
        <input 
          onChange={handleChange} 
          id="idNumber" 
          type='text' 
          value={formData.idNumber || ''} 
          placeholder='ID Number' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl' 
        />
        <input 
          onChange={handleChange} 
          id="firtTimeIn" 
          type='time' 
          value={formData.firtTimeIn || ''} 
          placeholder='Time In' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl' 
        />
        <input 
          onChange={handleChange} 
          id="inspectedBy" 
          type='text' 
          value={formData.inspectedBy || ''} 
          placeholder='Inspected By' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl' 
        />
        <input 
          onChange={handleChange} 
          id="timeChecked" 
          type='time' 
          value={formData.timeChecked || ''} 
          placeholder='Time Checked' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl' 
        />
        <input 
          onChange={handleChange} 
          id="firstProduct" 
          type='text' 
          value={formData.firstProduct || ''} 
          placeholder='Product' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl' 
        />
      </div>

      {/* Surveyor/Driver/Clerk Section */}
      <div className="grid grid-cols-1 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className='col-span-2 border-b-2 border-gray-100'>
          <h3 className='font-medium text-wrap p-2 text-center'>SURVEYOR/DRIVER/CLERK</h3>
        </div>
        <input 
          onChange={handleChange} 
          id="firstCompatment" 
          type='text' 
          value={formData.firstCompatment || ''} 
          placeholder='First Compartment' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl'
        />
      </div>

      {/* Weighing Personnel Section */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className='col-span-2 border-b-2 border-gray-100'>
          <h3 className='font-medium text-wrap p-2 text-center'>WEIGHING PERSONNEL</h3>
        </div>
        <input 
          onChange={handleChange} 
          id="firstName" 
          type='text' 
          value={formData.firstName || ''} 
          placeholder='Name' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl'
        />
        <input 
          onChange={handleChange} 
          id="secondProduct" 
          type='text' 
          value={formData.secondProduct || ''} 
          placeholder='Product' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl'
        />
        <input 
          onChange={handleChange} 
          id="secondTimeIn" 
          type='time' 
          value={formData.secondTimeIn || ''} 
          placeholder='Time In' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl' 
        />
        <input 
          onChange={handleChange} 
          id="tareWeight" 
          type='text' 
          value={formData.tareWeight || ''} 
          placeholder='Tare Weight' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl' 
        />
      </div>

      {/* Delivery Supervisor Section 1 */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className='col-span-2 border-b-2 border-gray-100'>
          <h3 className='font-medium text-wrap p-2 text-center'>DELIVERY SUPERVISOR</h3>
        </div>
        <input 
          onChange={handleChange} 
          id="secondName" 
          type='text' 
          value={formData.secondName || ''} 
          placeholder='Name' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl'
        />
        <input 
          onChange={handleChange} 
          id="thirdProduct" 
          type='text' 
          value={formData.thirdProduct || ''} 
          placeholder='Product' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl'
        />
        <input 
          onChange={handleChange} 
          id="loadingTank" 
          type='text' 
          value={formData.loadingTank || ''} 
          placeholder='Loading Tank' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl' 
        />
        <input 
          onChange={handleChange} 
          id="loaderName" 
          type='text' 
          value={formData.loaderName || ''} 
          placeholder='Loader Name' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl' 
        />
      </div>

      {/* Delivery Supervisor Section 2 */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className='col-span-2 border-b-2 border-gray-100'>
          <h3 className='font-medium text-wrap p-2 text-center'>DELIVERY SUPERVISOR</h3>
        </div>
        <input 
          onChange={handleChange} 
          id="timeOutofBay" 
          type='time' 
          value={formData.timeOutofBay || ''} 
          placeholder='Time Out Of Bay' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl'
        />
        <input 
          onChange={handleChange} 
          id="bayNumber" 
          type='text' 
          value={formData.bayNumber || ''} 
          placeholder='Bay Number' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl'
        />
        <input 
          onChange={handleChange} 
          id="firstCompartmentSeal" 
          type='text' 
          value={formData.firstCompartmentSeal || ''} 
          placeholder='First Compartment Seal' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl' 
        />
      </div>

      {/* Dispatch Supervisor Section */}
      <div className="gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className='col-span-2 border-b-2 border-gray-100'>
          <h3 className='font-medium text-wrap p-2 text-center'>DISPATCH SUPERVISOR</h3>
        </div>
        <input 
          onChange={handleChange} 
          id="thirdName" 
          type='text' 
          value={formData.thirdName || ''} 
          placeholder='Name' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl'
        />
      </div>

      {/* Dispatch Personnel Section */}
      <div className="gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl">
        <div className='col-span-2 border-b-2 border-gray-100'>
          <h3 className='font-medium text-wrap p-2 text-center'>DISPATCH PERSONNEL</h3>
        </div>
        <input 
          onChange={handleChange} 
          id="forthName" 
          type='text' 
          value={formData.forthName || ''} 
          placeholder='Name' 
          className='w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl'
        />   
      </div>

      {error && <p className="text-red-500 md:col-span-2">{error}</p>}

      <button disabled={loading} type="submit" className='bg-slate-400 rounded-md p-2 hover:bg-slate-500 w-full md:col-span-2'>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}