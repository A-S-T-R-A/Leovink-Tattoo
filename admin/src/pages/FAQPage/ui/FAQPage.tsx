import { AddFaqModal } from "./AddFaqModal/AddFaqModal"
import { FaqPageList } from "./FaqPageList/FaqPageList"
import { faqData } from "../const/faqData"

export function FAQPage() {
    return (
        <>
            <AddFaqModal faqData={faqData} />
            <FaqPageList faqData={faqData} />
        </>
    )
}
