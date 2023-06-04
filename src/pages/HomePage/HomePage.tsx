import { Artists } from "widgets/Artists/Artists"
import { FormSection } from "widgets/FormSection/FormSection"
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
            <FormSection />
            <div style={{ height: "300vh" }}></div>
        </div>
    )
}
