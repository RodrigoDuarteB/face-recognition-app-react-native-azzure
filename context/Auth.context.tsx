import { createContext, FC, useContext, useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { auth } from '../firebase'
import { User } from '../models/User'
import { getUser } from '../services/UserService'

interface IProps  {
    children?: React.ReactNode
}

interface IAuthContext {
    user: User | null
    setUser: (user: User | null) => void
}

const AuthContext = createContext<IAuthContext>({
    user: null,
    setUser: () => {}
})

const AuthProvider: FC<IProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isReady, setIsReady] = useState(false)
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if(user){
                getUser(user.uid)
                .then(user => setUser(user))
                .finally(() => setIsReady(true))
            }else{
                setIsReady(true)
            }
        })
        return unsubscribe
    }, [])

    return isReady ? (
        <AuthContext.Provider value={{ 
            user, 
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    ) : <Loading />
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider