import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { ReactNode } from "react"

export function RequireAuth({ children }: { children: ReactNode }) {
    const user = useAuth()

    if (!user) {
        return <Navigate to="/" />
    }

    return children
}
