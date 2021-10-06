import React from 'react';
import { Link } from "react-router-dom";
import './Layout.css';

const Layout = (props) => {
    return (
        <React.Fragment>
            <nav className = "navbar navbar-light bg-light">
                <Link to="/" className="appName navbar-brand"><span className="mx-3">Currency Exchange Rate App</span></Link>
            </nav>
            <div className="container py-3">
                {props.children}
            </div>
            <footer className="bg-light">
                <div className="mb-2">
                    <a className="footer-decoration badge badge-dark" href="https://github.com/Jmauriciomtz/react-app-currency-exchange-app" target="_blank" rel="noreferrer">GitHub</a>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Layout;