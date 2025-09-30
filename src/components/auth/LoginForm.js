import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const LoginForm = ({ onSwitchToRegister }) => {
    const { login, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        await login(data.email, data.password);
    };

    return (
        <div className="auth-form">
            <div className="auth-header">
                <h2>Welcome Back</h2>
                <p>Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form-content">
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <div className="input-group">
                        <Mail className="input-icon" />
                        <input
                            type="email"
                            id="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                            placeholder="Enter your email"
                            className={errors.email ? 'error' : ''}
                        />
                    </div>
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-group">
                        <Lock className="input-icon" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                            placeholder="Enter your password"
                            className={errors.password ? 'error' : ''}
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                </div>

                <div className="form-options">
                    <label className="checkbox-label">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Remember me
                    </label>
                    <a href="#forgot" className="forgot-link">Forgot Password?</a>
                </div>

                <button
                    type="submit"
                    className="auth-btn primary"
                    disabled={loading}
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="auth-switch">
                    <p>Don't have an account?
                        <button
                            type="button"
                            className="switch-link"
                            onClick={onSwitchToRegister}
                        >
                            Sign up here
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
