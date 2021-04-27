import React, { createContext, useEffect, useState, useContext } from 'react'
import firebaseInstance from '../utils/firebase'
import nookies from 'nookies'

const AuthContext = createContext({user: null})

//high order component
export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const isAuthenticated = user !== null && loading === false

    useEffect(() => {
        return firebaseInstance.auth().onIdTokenChanged(async (user) => {
            if(!user) {
                setUser(null)
                nookies.set(undefined, 'token', null, { path: '/' })
            } else {
                const token = await user.getIdToken()
                setUser(user)
                nookies.set(undefined, 'token', token, { path: '/' })
                
            }
            setLoading(false)
        })
    })

    useEffect(() => {
        const handle = setInterval( async ()=> {
            const user = firebaseInstance.auth().currentUser
            if(user) await user.getIdToken(true)
        }, 10 * 60 * 1000)

        return clearInterval(handle)

    })

    return <AuthContext.Provider value={{user, loading, isAuthenticated}}>{children}</AuthContext.Provider>
    
}

export const useAuth = () => {
    return useContext(AuthContext)
}