import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'
import createDocRoute from './routes/createDocRoute.js'
import cookieParser from 'cookie-parser';

dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB')
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error)
})

const app = express()
app.use(express.json())
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!!!')
})

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute) 
app.use('/api/createDoc', createDocRoute)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  return res.status(statusCode).json({ 
    success: false,
    statusCode,
    message
   })
})