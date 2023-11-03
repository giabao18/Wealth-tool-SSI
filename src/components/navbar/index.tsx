import React from 'react'
import './navbar.scss'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import { Outlet } from 'react-router-dom'
import AuthForm from './authForm/AuthForm'
import LanguageNavbar from './languageNavbar'
import { Account } from 'src/context/User/Account'

const NavBar: React.ComponentType = () => {
    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <div className="header_top">
                        <div className="logo_wrapper">
                            <a href="/" className="link">
                                <span className="stylish">SSI</span>
                                <span className="logo">NVEST</span>
                            </a>
                        </div>
                        <div className="support">
                            <Account>
                                <AuthForm />
                            </Account>
                            <LanguageNavbar />
                            <SupportAgentIcon
                                style={{ cursor: 'pointer' }}
                            ></SupportAgentIcon>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default NavBar
