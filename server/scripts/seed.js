import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

dotenv.config()

async function run() {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dishcovery'
    await mongoose.connect(MONGO_URI)
    const email = process.env.SEED_EMAIL || 'demo@dishcovery.app'
    const password = process.env.SEED_PASSWORD || 'password123'
    const name = process.env.SEED_NAME || 'Demo User'
    const existing = await User.findOne({ email })
    if (existing) {
        console.log('User already exists:', email)
    } else {
        const passwordHash = await bcrypt.hash(password, 10)
        await User.create({ email, name, passwordHash, avatar: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=160&auto=format&fit=crop' })
        console.log('Seeded user:', email, 'password:', password)
    }
    await mongoose.disconnect()
    process.exit(0)
}

run().catch(err => { console.error(err); process.exit(1) })


