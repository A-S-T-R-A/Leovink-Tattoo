import { Artists } from "widgets/Artists/Artists"
import { FormSection } from "widgets/FormSection/FormSection"
import { Main } from "widgets/Main/Main"
import { Steps } from "widgets/Steps/Steps"
import { Portfolio } from "widgets/Portfolio/Portfolio"
import { Testimonials } from "widgets/Testimonials/Testimonials"
import { Services } from "widgets/Services/Services"
import { Faq } from "widgets/Faq/Faq"

export function HomePage() {
    return (
        <div>
            <Main />
            <Portfolio />
            <Steps />
            <Services />
            <Artists />
            <Testimonials />
            <Faq />
            <FormSection />
        </div>
    )
}
