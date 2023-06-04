import { FaqBlock } from "shared/components/FaqBlock/FaqBlock"
import { faqData } from "shared/const/faqData"
import { PageWrapper } from "shared/ui/PageWrapper/PageWrapper"
import { Section } from "shared/ui/Section/Section"
import { FormSection } from "widgets/FormSection/FormSection"

export function FAQPage() {
    return (
        <PageWrapper title="FAQ">
            <Section>
                {faqData.map(item => (
                    <FaqBlock key={item.id} data={item} />
                ))}
            </Section>
            <FormSection />
        </PageWrapper>
    )
}
