import { OtherPageList } from "./OtherPageList/OtherPageList"
import { otherData } from "../const/data"

export function OtherPage() {
    return (
        <>
            <OtherPageList otherData={otherData} />
        </>
    )
}
