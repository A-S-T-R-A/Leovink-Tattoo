import { Artists } from "widgets/Artists/Artists"
import { Main } from "widgets/Main/Main"
import { Portfolio } from "widgets/Portfolio/Portfolio"
import { Testimonials } from "widgets/Testimonials/Testimonials"

export function HomePage() {
    return (
        <div>
            <Main />
            <Portfolio />
            <Artists />
            <Testimonials />
            <div style={{ height: "300vh" }}></div>
        </div>
    )
}
