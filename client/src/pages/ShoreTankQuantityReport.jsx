import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ShoreTankQuantityReport() {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    todaysDate: '',
    tankNumber: '',
    overallDip: '',
    vessel: '',
    product: '',
    dippingSchedule: [
      {
        dippingTime: '',
        productDip: '',
        temperature: '',
        density: '',
        observedVolume: '',
        weightInAir: '',
      },
    ],
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return

    const fetchDocument = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`/api/createDoc/shoreTankQuantityReport/get/${id}`)
        const data = await res.json()

        if (data.success === false) {
          setError(data.message)
          setLoading(false)
          return
        }

        setFormData({
          ...data,
          dippingSchedule:
            data.dippingSchedule && data.dippingSchedule.length > 0
              ? data.dippingSchedule
              : [
                  {
                    dippingTime: '',
                    productDip: '',
                    temperature: '',
                    density: '',
                    observedVolume: '',
                    weightInAir: '',
                  },
                ],
        })
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

  // Handle dynamic changes inside the dippingSchedule array
  const handleScheduleChange = (index, field, value) => {
    const updatedSchedule = [...formData.dippingSchedule]
    updatedSchedule[index] = { ...updatedSchedule[index], [field]: value }
    setFormData({ ...formData, dippingSchedule: updatedSchedule })
  }

  // Add a new dipping schedule item
  const addDippingSchedule = () => {
    setFormData({
      ...formData,
      dippingSchedule: [
        ...formData.dippingSchedule,
        {
          dippingTime: '',
          productDip: '',
          temperature: '',
          density: '',
          observedVolume: '',
          weightInAir: '',
        },
      ],
    })
  }

  // Remove a dipping schedule item
  const removeDippingSchedule = (index) => {
    if (formData.dippingSchedule.length === 1) return
    const updatedSchedule = formData.dippingSchedule.filter((_, i) => i !== index)
    setFormData({ ...formData, dippingSchedule: updatedSchedule })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)

      const isUpdating = Boolean(id)
      const method = isUpdating ? 'PUT' : 'POST'
      const endpoint = isUpdating
        ? `/api/createDoc/shoreTankQuantityReport/${id}`
        : '/api/createDoc/shoreTankQuantityReport'

      const payload = { ...formData }
      delete payload._id
      delete payload.__v
      delete payload.createdAt
      delete payload.updatedAt
      delete payload.userReference

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (data.success === false) {
        setLoading(false)
        setError(data.message)
        return
      }

      setLoading(false)

      const savedDocId = data.data?._id || data._id || id

      if (!id && savedDocId) {
        navigate(`/shoreTankQuantityReport/${savedDocId}`)
      }
    } catch (err) {
      setLoading(false)
      setError('An error occurred while submitting.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full p-2 gap-2">
      <div className="w-full">
        <h1 className="text-xl font-medium p-2 text-center">
          EAST AFRICAN STORAGE COMPANY LTD.
        </h1>
        <h2 className="p-2 text-center">SHORE TANK QUANTITY REPORT</h2>
      </div>

      {/* BASIC INFO */}
      <div className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl mt-5">
        <div>
          <label
            htmlFor="todaysDate"
            className="block text-xs font-semibold text-gray-600 uppercase mb-1"
          >
            Todays Date
          </label>
          <input
            onChange={handleChange}
            id="todaysDate"
            type="date"
            value={formData.todaysDate || ''}
            placeholder="Todays Date"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label
            htmlFor="tankNumber"
            className="block text-xs font-semibold text-gray-600 uppercase mb-1"
          >
            Tank Number
          </label>
          <input
            onChange={handleChange}
            id="tankNumber"
            type="text"
            value={formData.tankNumber || ''}
            placeholder="Tank Number"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label
            htmlFor="overallDip"
            className="block text-xs font-semibold text-gray-600 uppercase mb-1"
          >
            Overall Dip
          </label>
          <input
            onChange={handleChange}
            id="overallDip"
            type="text"
            value={formData.overallDip || ''}
            placeholder="Overall Dip"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div>
          <label
            htmlFor="vessel"
            className="block text-xs font-semibold text-gray-600 uppercase mb-1"
          >
            Vessel
          </label>
          <input
            onChange={handleChange}
            id="vessel"
            type="text"
            value={formData.vessel || ''}
            placeholder="Vessel"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>

        <div className="col-span-2">
          <label
            htmlFor="product"
            className="block text-xs font-semibold text-gray-600 uppercase mb-1"
          >
            Product
          </label>
          <input
            onChange={handleChange}
            id="product"
            type="text"
            value={formData.product || ''}
            placeholder="Product"
            className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
          />
        </div>
      </div>

      {/* DYNAMIC DIPPING SCHEDULE LIST */}
      {formData.dippingSchedule.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-2 gap-4 border-b-2 border-gray-200 p-2 shadow-md hover:shadow-xl mt-2 relative"
        >
          <div className="col-span-2 border-b-2 border-gray-100 flex justify-between items-center">
            <h3 className="font-medium text-wrap p-2 text-center">
              Dipping Schedule #{index + 1}
            </h3>
            {formData.dippingSchedule.length > 1 && (
              <button
                type="button"
                onClick={() => removeDippingSchedule(index)}
                className="text-red-500 hover:text-red-700 text-xs font-semibold uppercase p-1"
              >
                Remove
              </button>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Dipping Time
            </label>
            <input
              onChange={(e) =>
                handleScheduleChange(index, 'dippingTime', e.target.value)
              }
              type="time"
              value={item.dippingTime || ''}
              placeholder="Dipping Time"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Product Dip
            </label>
            <input
              onChange={(e) =>
                handleScheduleChange(index, 'productDip', e.target.value)
              }
              type="text"
              value={item.productDip || ''}
              placeholder="Product Dip"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Temperature
            </label>
            <input
              onChange={(e) =>
                handleScheduleChange(index, 'temperature', e.target.value)
              }
              type="text"
              value={item.temperature || ''}
              placeholder="Temperature"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Density
            </label>
            <input
              onChange={(e) =>
                handleScheduleChange(index, 'density', e.target.value)
              }
              type="text"
              value={item.density || ''}
              placeholder="Density"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Observed Volume
            </label>
            <input
              onChange={(e) =>
                handleScheduleChange(index, 'observedVolume', e.target.value)
              }
              type="text"
              value={item.observedVolume || ''}
              placeholder="Observed Volume"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Weight In Air
            </label>
            <input
              onChange={(e) =>
                handleScheduleChange(index, 'weightInAir', e.target.value)
              }
              type="text"
              value={item.weightInAir || ''}
              placeholder="Weight In Air"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-blue-500 hover:shadow-xl"
            />
          </div>
        </div>
      ))}

      {/* ADD MORE DIPPING SCHEDULE BUTTON */}
      <div className="my-4">
        <button
          type="button"
          onClick={addDippingSchedule}
          className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 w-full font-medium"
        >
          + Add More Dipping Schedule
        </button>
      </div>

      {error && <p className="text-red-500 my-2">{error}</p>}

      <button
        disabled={loading}
        type="submit"
        className="bg-slate-400 rounded-md p-2 hover:bg-slate-500 w-full text-white font-medium my-2"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}