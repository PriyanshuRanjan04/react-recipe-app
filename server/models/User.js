import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('User', userSchema)


