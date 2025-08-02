import mongoose from 'mongoose'

let isConnected = false

const connectDB = async () => {
  if (isConnected) return

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'news-db',
    })
    isConnected = true
    console.log('✅ MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection failed:', error)
  }
}

export default connectDB
