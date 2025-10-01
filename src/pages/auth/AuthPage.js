import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../../components/auth/LoginForm';
import RegisterForm from '../../components/auth/RegisterForm';
import { ChefHat } from 'lucide-react';
import SpiceParticles from '../../components/SpiceParticles';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const switchToRegister = () => setIsLogin(false);
    const switchToLogin = () => setIsLogin(true);

    return (
        <div className="auth-page" style={{ position: 'relative' }}>
            <SpiceParticles />
            <div className="auth-container">
                <motion.div
                    className="auth-left"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="auth-brand">
                        <ChefHat className="brand-icon" />
                        <h1>Dishcovery</h1>
                        <p>Discover, Create, and Share Amazing Recipes</p>
                    </div>
                    <div className="auth-features">
                        <div className="feature">
                            <h3>🍳 Discover Recipes</h3>
                            <p>Explore thousands of recipes from around the world</p>
                        </div>
                        <div className="feature">
                            <h3>👨‍🍳 Learn from Chefs</h3>
                            <p>Follow top chefs and learn their secret techniques</p>
                        </div>
                        <div className="feature">
                            <h3>📱 Save & Share</h3>
                            <p>Save your favorite recipes and share with friends</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="auth-right"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {isLogin ? (
                        <LoginForm onSwitchToRegister={switchToRegister} />
                    ) : (
                        <RegisterForm onSwitchToLogin={switchToLogin} />
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default AuthPage;
