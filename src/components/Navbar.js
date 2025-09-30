import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faList, faCog, faUser, faSignOutAlt, faHeart } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../context/AuthContext"
import Sidebar from "./Sidebar"

export default function Navbar() {
    const [showSidebar, setShowSidebar] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
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
    return (
        <>
            <div className="navbar container">
                <Link to="/" className="logo">F<span>oo</span>diesHub</Link>
                <div className="nav-links">
                    {links.map(link => (
                        <Link className={location.pathname === link.path ? "active" : ""} to={link.path} key={link.name}>{link.name}</Link>
                    ))}
                </div>

                <div className="navbar-actions">
                    {user ? (
                        <div className="user-menu">
                            <button
                                className="user-btn"
                                onClick={() => setShowUserMenu(!showUserMenu)}
                            >
                                <img src={user.avatar} alt={user.name} className="user-avatar" />
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