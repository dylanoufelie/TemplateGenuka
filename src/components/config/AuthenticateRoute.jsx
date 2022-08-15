import React, { useContext } from 'react'
import Auth from '../../context/Auth'
import Home from '../../pages/Home'

const AuthenticateRoute = ({ path, component }) => {
    const { isAuthenticated } = useContext(Auth)
    return isAuthenticated ? (
        <Route path={path} component={component} />
    ) : (
        <Home />
    )
}

export default AuthenticateRoute 