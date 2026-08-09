import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'

dotenv.config()

mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB')
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error)
})

const app = express()
app.use(express.json())


app.listen(3000, () => {
  console.log('Server is running on port 3000!!!')
})

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)