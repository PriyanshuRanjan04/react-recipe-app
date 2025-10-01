import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

const router = Router()

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, avatar } = req.body
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })
        const exists = await User.findOne({ email })
        if (exists) return res.status(409).json({ message: 'Email already in use' })
        const passwordHash = await bcrypt.hash(password, 10)
        const user = await User.create({ name: name || email.split('@')[0], email, passwordHash, avatar })
        const token = jwt.sign({ sub: user._id, email: user.email }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' })
        return res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } })
    } catch (e) {
        return res.status(500).json({ message: 'Server error' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })
        const user = await User.findOne({ email })
        if (!user) return res.status(401).json({ message: 'Invalid credentials' })
        const ok = await bcrypt.compare(password, user.passwordHash)
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
        const token = jwt.sign({ sub: user._id, email: user.email }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' })
        return res.json({ token, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } })
    } catch (e) {
        return res.status(500).json({ message: 'Server error' })
    }
})

router.post('/reset-password', async (req, res) => {
    // Dummy endpoint for now
    const { email } = req.body
    if (!email) return res.status(400).json({ message: 'Email is required' })
    return res.json({ message: 'Password reset link sent if account exists' })
})

router.get('/oauth/google', (req, res) => {
    return res.status(501).json({ message: 'Google OAuth not implemented yet' })
})

export default router


