import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const RegisterForm = ({ onSwitchToLogin }) => {
    const { register: registerUser, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const password = watch('password');

    const onSubmit = async (data) => {
        await registerUser(data.name, data.email, data.password);
    };

    return (
        <div className="auth-form">
            <div className="auth-header">
                <h2>Create Account</h2>
                <p>Join FoodiesHub and start your culinary journey</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form-content">
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <div className="input-group">
                        <User className="input-icon" />
                        <input
                            type="text"
                            id="name"
                            {...register('name', {
                                required: 'Name is required',
                                minLength: {
                                    value: 2,
                                    message: 'Name must be at least 2 characters'
                                }
                            })}
                            placeholder="Enter your full name"
                            className={errors.name ? 'error' : ''}
                        />
                    </div>
                    {errors.name && <span className="error-message">{errors.name.message}</span>}
                </div>

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
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                    message: 'Password must contain uppercase, lowercase, and number'
                                }
                            })}
                            placeholder="Create a password"
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

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="input-group">
                        <Lock className="input-icon" />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: value => value === password || 'Passwords do not match'
                            })}
                            placeholder="Confirm your password"
                            className={errors.confirmPassword ? 'error' : ''}
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
                </div>

                <div className="form-options">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            {...register('terms', { required: 'You must accept the terms' })}
                        />
                        <span className="checkmark"></span>
                        I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>
                    </label>
                    {errors.terms && <span className="error-message">{errors.terms.message}</span>}
                </div>

                <button
                    type="submit"
                    className="auth-btn primary"
                    disabled={loading}
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>

                <div className="auth-switch">
                    <p>Already have an account?
                        <button
                            type="button"
                            className="switch-link"
                            onClick={onSwitchToLogin}
                        >
                            Sign in here
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
