import { useContext, createContext, ReactNode, useState } from "react"
import { emailsWhitelist } from "../const/emailsWhitelist"

type UserType = { name: string; img: string; email: string } | null
export type UserRoleType = "admin" | "dev" | "other" | "none"

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

    const isAdmin = !!user && emailsWhitelist.admin.includes(user.email)

    return (
        <AuthContext.Provider value={{ user, updateUser, isAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const { user } = useContext(AuthContext)
    return user
}

export function useUserRole(): UserRoleType {
    const user = useAuth()
    if (!user) return "none"

    for (const key in emailsWhitelist) {
        const userVariant = key as Exclude<UserRoleType, "none">
        if (emailsWhitelist[userVariant].includes(user.email)) {
            return userVariant
        }
    }

    return "none"
}
