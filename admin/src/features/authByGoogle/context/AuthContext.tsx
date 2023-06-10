import { useContext, createContext, ReactNode, useState } from "react"
import { emailsWhitelist } from "../const/emailsWhitelist"

type UserType = { name: string; img: string; email: string } | null

interface IAuthContext {
    user: UserType
    updateUser: (val: UserType) => void
    isAdmin: boolean
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    updateUser: () => undefined,
    isAdmin: false,
})

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserType>({ name: "", img: "", email: "" })

    function updateUser(val: UserType) {
        setUser(val)
    }

    const isAdmin = user?.email === emailsWhitelist[0]

    return (
        <AuthContext.Provider value={{ user, updateUser, isAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const { user } = useContext(AuthContext)
    return user
}

export function useIsAdmin() {
    const { isAdmin } = useContext(AuthContext)
    return isAdmin
}
