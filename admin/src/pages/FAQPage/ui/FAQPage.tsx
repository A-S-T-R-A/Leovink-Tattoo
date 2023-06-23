import { FaqPageList } from "./FaqPageList/FaqPageList"
import { faqData as dummyData } from "../const/faqData"
import { AddFaqTitle } from "./AddFaqTitle/AddFaqTitle"

export function FAQPage() {
    return (
        <>
            <AddFaqTitle faqData={dummyData} />
            <FaqPageList faqData={dummyData} />
        </>
    )
}
