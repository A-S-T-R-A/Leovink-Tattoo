import { FaqBlock } from "shared/components/FaqBlock/FaqBlock"
import { faqData } from "shared/const/faqData"

export default function FAQ() {
    return (
        <>
            {faqData.map(item => (
                <FaqBlock key={item.id} data={item} />
            ))}
        </>
    )
}
