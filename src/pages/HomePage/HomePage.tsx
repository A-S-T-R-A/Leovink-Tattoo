import { Artists } from "widgets/Artists/Artists"
import { FormSection } from "widgets/FormSection/FormSection"
import { Main } from "widgets/Main/Main"
import { Steps } from "widgets/Steps/Steps"
import { Portfolio } from "widgets/Portfolio/Portfolio"
import { Testimonials } from "widgets/Testimonials/Testimonials"
import { Services } from "widgets/Services/Services"

export function HomePage() {
    return (
        <div>
            <Main />
            <Steps />
            <Services />
            <Portfolio />
            <Artists />
            <Testimonials />
            <FormSection />
            <div style={{ height: "300vh" }}></div>
        </div>
    )
}
