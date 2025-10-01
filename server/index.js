import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import authRouter from './routes/auth.js'
import recipesRouter from './routes/recipes.js'
import communityRouter from './routes/community.js'

dotenv.config()

const app = express()
app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*', credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })
app.use('/api/', limiter)

app.get('/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRouter)
app.use('/api/recipes', recipesRouter)
app.use('/api/community', communityRouter)

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dishcovery'
const PORT = process.env.PORT || 4000

mongoose.connect(MONGO_URI).then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => console.log('Auth server listening on', PORT))
}).catch(err => {
    console.error('Mongo error', err)
    process.exit(1)
})


