import { UserRoleType } from "features/authByGoogle"

interface IRoute {
    path: string
    name: string
    allowedRoles?: UserRoleType[]
    private?: boolean
}

export const routes: IRoute[] = [
    { path: "/", name: "Home" },
    { path: "/portfolio", name: "Portfolio", private: true },
    { path: "/steps", name: "Steps", private: true },
    { path: "/services", name: "Services", private: true },
    { path: "/reviews", name: "Reviews", private: true },
    { path: "/artists", name: "Artists", private: true },
    { path: "/faq", name: "FAQ", private: true },
    { path: "/contacts", name: "*Contacts", allowedRoles: ["dev"], private: true },
    { path: "/other", name: "*Other", allowedRoles: ["dev"], private: true },
    { path: "/test", name: "*Test", allowedRoles: ["dev"], private: true },
]
