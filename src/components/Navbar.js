import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faList, faCog, faUser, faSignOutAlt, faHeart } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../context/AuthContext"
import Sidebar from "./Sidebar"

export default function Navbar() {
    const [showSidebar, setShowSidebar] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [theme, setTheme] = useState(() => (typeof window !== 'undefined' ? (localStorage.getItem('theme') || 'light') : 'light'))
    const location = useLocation()
    const { user, logout } = useAuth()

    const links = [
        {
            name: "Home",
            path: "/",
            icon: faHome
        },
        {
            name: "Recipes",
            path: "/recipes",
            icon: faList
        },
        {
            name: "Settings",
            path: "/settings",
            icon: faCog
        }
    ]

    function closeSidebar() {
        setShowSidebar(false)
    }

    useEffect(() => {
        const root = document.documentElement
        root.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    function toggleTheme() {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }
    return (
        <>
            <div className="navbar container bg-transparent backdrop-blur">
                <Link to="/" className="logo">D<span>ish</span>covery</Link>
                <div className="nav-links">
                    {links.map(link => (
                        <Link className={location.pathname === link.path ? "active" : ""} to={link.path} key={link.name}>{link.name}</Link>
                    ))}
                </div>

                <div className="navbar-actions">
                    {user && (
                        <span className="greeting" aria-live="polite">Welcome back, {user.name} 👨‍🍳</span>
                    )}
                    <Link to="/recipes" className="auth-btn" aria-label="Open search">
                        🔎 Search
                    </Link>
                    <button aria-label="Toggle theme" className="auth-btn" onClick={toggleTheme}>
                        {theme === 'light' ? '☀️' : '🪔'}
                    </button>
                    {user ? (
                        <div className="user-menu">
                            <button
                                className="user-btn"
                                onClick={() => setShowUserMenu(!showUserMenu)}
                            >
                                <img
                                    src={user.avatar}
                                    alt={`${user.name} avatar`}
                                    className="user-avatar"
                                    loading="lazy"
                                    width="32"
                                    height="32"
                                    srcSet={`${user.avatar}&w=32 32w, ${user.avatar}&w=48 48w, ${user.avatar}&w=64 64w`}
                                    sizes="32px"
                                />
                                <span>{user.name}</span>
                            </button>

                            {showUserMenu && (
                                <motion.div
                                    className="user-dropdown"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <Link to="/profile" className="dropdown-item">
                                        <FontAwesomeIcon icon={faUser} />
                                        Profile
                                    </Link>
                                    <Link to="/favorites" className="dropdown-item">
                                        <FontAwesomeIcon icon={faHeart} />
                                        Favorites
                                    </Link>
                                    <button onClick={logout} className="dropdown-item">
                                        <FontAwesomeIcon icon={faSignOutAlt} />
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    ) : (
                        <Link to="/auth" className="auth-btn">
                            <FontAwesomeIcon icon={faUser} />
                            Login
                        </Link>
                    )}
                </div>

                <div onClick={() => setShowSidebar(true)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            {showSidebar && <Sidebar close={closeSidebar} links={links} />}
        </>
    )
}