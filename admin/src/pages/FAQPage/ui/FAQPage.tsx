import { FaqPageList } from "./FaqPageList/FaqPageList"
import { faqData } from "../const/faqData"
import { AddFaqTitle } from "./AddFaqTitle/AddFaqTitle"

export function FAQPage() {
    return (
        <>
            {/* <AddFaqModal faqData={faqData} /> */}
            <AddFaqTitle faqData={faqData} />
            <FaqPageList faqData={faqData} />
        </>
    )
}
