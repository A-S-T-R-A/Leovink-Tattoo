import { UserRoleType } from "features/authByGoogle"
import { ReactNode } from "react"
import {
    ArtistsIcon,
    FaqIcon,
    HowitworksIcon,
    OtherIcon,
    PortfolioIcon,
    ServicesIcon,
    TestimonialsIcon,
    HomeIcon,
    StairsIcon,
} from "shared/assets/icons"

interface IRoute {
    Svg?: any
    path: string
    name: string
    allowedRoles?: UserRoleType[]
    private?: boolean
}

export const routes: IRoute[] = [
    { Svg: HomeIcon, path: "/", name: "Home" },
    { Svg: PortfolioIcon, path: "/portfolio", name: "Portfolio", private: true },
    { Svg: StairsIcon, path: "/steps", name: "Steps", private: true },
    { Svg: ServicesIcon, path: "/services", name: "Services", private: true },
    { Svg: TestimonialsIcon, path: "/reviews", name: "Reviews", private: true },
    { Svg: ArtistsIcon, path: "/artists", name: "Artists", private: true },
    { Svg: FaqIcon, path: "/faq", name: "FAQ", private: true },
    { Svg: OtherIcon, path: "/other", name: "Other", private: true },
    { Svg: OtherIcon, path: "/test", name: "*Test", allowedRoles: ["dev"], private: true },
]
