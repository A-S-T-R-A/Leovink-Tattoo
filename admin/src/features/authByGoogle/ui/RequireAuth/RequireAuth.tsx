import { Navigate } from "react-router-dom"
import { ReactNode } from "react"
import { useUserRole, UserRoleType } from "features/authByGoogle"

export function RequireAuth({
    children,
    allowedRoles,
}: {
    children: ReactNode
    allowedRoles?: UserRoleType[]
}) {
    const role = useUserRole()
    const isAllowed = allowedRoles ? allowedRoles.includes(role) : role !== "none"

    if (!isAllowed) {
        return <Navigate to="/" />
    }

    return children
}
