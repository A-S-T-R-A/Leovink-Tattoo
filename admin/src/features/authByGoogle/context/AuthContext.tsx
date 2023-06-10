import { useContext, createContext, ReactNode, useState } from "react"

type UserType = { name: string; img: string; email: string } | null

interface IAuthContext {
    user: UserType
    updateUser: (val: UserType) => void
}

export const AuthContext = createContext<IAuthContext>({ user: null, updateUser: () => undefined })

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserType>({ name: "", img: "", email: "" })

    function updateUser(val: UserType) {
        setUser(val)
    }

    return <AuthContext.Provider value={{ user, updateUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const { user } = useContext(AuthContext)
    return user
}
