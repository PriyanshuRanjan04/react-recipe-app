import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    async function onSubmit(e) {
        e.preventDefault()
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error('Enter a valid email')
            return
        }
        setLoading(true)
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/auth/reset-password`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email })
            })
            const data = await res.json().catch(() => ({}))
            if (res.ok) {
                toast.success('Password reset link sent to your email')
            } else {
                toast.error(data.message || 'Failed to send reset link')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <motion.form
                className="auth-form"
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="auth-header">
                    <h2>Forgot Password</h2>
                    <p>We will send a reset link to your email</p>
                </div>
                <div className="form-group">
                    <label htmlFor="fp-email">Email</label>
                    <input id="fp-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" aria-label="Email for password reset" />
                </div>
                <button className="btn" type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Link'}</button>
            </motion.form>
        </div>
    )
}


