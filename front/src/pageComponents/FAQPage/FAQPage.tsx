import { FaqBlock } from "shared/components/FaqBlock/FaqBlock"
import { faqData } from "shared/const/faqData"
import type { IFaqData } from "shared/const/firebaseVariables"

export function FAQPage({ data }: { data: IFaqData[] }) {
    return (
        <>
            {data.map(item => (
                <FaqBlock data={item} />
            ))}
        </>
    )
}
