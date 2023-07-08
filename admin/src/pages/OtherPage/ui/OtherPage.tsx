import { PortfolioFilters } from "features/portfolioFilters"
import styles from "./OtherPage.module.scss"
import { useEffect, useState } from "react"
import { IGlobalData } from "../types/type"
import { fetchGlobalData } from "shared/const/firebaseVariables"
import { Socials } from "./Socials/Socials"
import { Contacts } from "./Contacts/Contacts"
import { ContactsGuide } from "./ContactsGuide/ContactsGuide"
import { FormData } from "./FormData/FormData"
import { SectionNames } from "./SectionNames/SectionNames"
import { Buttons } from "./Buttons/Buttons"
import { LayoutData } from "./LayoutData/LayoutData"

export function OtherPage() {
    const [data, setData] = useState<IGlobalData | null>(null)

    async function fetch() {
        const d = (await fetchGlobalData()) as IGlobalData
        setData(d)
    }

    function triggerRefetch() {
        fetch()
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div className={styles.table}>
            <PortfolioFilters
                data={data}
                triggerRefetch={triggerRefetch}
                isExpanded={true /* sectionOpen === "filters" */}
                onOpen={() => null /* setSectionOpen("filters") */}
            />
            <Socials data={data} triggerRefetch={triggerRefetch} />
            <Contacts data={data} triggerRefetch={triggerRefetch} />
            <ContactsGuide data={data} triggerRefetch={triggerRefetch} />
            <FormData data={data} triggerRefetch={triggerRefetch} />
            <SectionNames data={data} triggerRefetch={triggerRefetch} />
            <Buttons data={data} triggerRefetch={triggerRefetch} />
            <LayoutData data={data} triggerRefetch={triggerRefetch} />
        </div>
    )
}
