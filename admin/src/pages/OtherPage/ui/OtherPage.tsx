import { OtherPageList } from "./OtherPageList/OtherPageList"
import { AddFaqTitle } from "./AddFaqTitle/AddFaqTitle"
import { otherData } from "../const/data"

export function OtherPage() {
    return (
        <>
            {/* <AddFaqModal faqData={faqData} /> */}
            {/* <AddFaqTitle otherData={otherData} /> */}
            <OtherPageList otherData={otherData} />
        </>
    )
}
