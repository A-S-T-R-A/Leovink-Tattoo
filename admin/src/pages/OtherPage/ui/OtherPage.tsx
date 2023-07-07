import { PortfolioFilters } from "features/portfolioFilters"
import styles from "./OtherPage.module.scss"
import { useEffect, useState } from "react"
import { IGlobalData } from "../types/type"
import { fetchGlobalData } from "shared/const/firebaseVariables"
import { Socials } from "./Socials/Socials"
import { Contacts } from "./Contacts/Contacts"
import { ContactsGuide } from "./ContactsGuide/ContactsGuide"
import { FormData } from "./FormData/FormData"

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
            {/*   <div>
                <div
                    className={styles.titleContainer}
                    onClick={() => setSectionOpen("sectionsName")}
                >
                    <div className={styles.title}>Sections name 🡇</div>
                </div>
                {sectionOpen === "sectionsName" && (
                    <div className={styles.listContainer}>
                        {sectionsName.map(item => {
                            return (
                                <div className={styles.infoContainer}>
                                    <p>Section name: {item}</p>
                                    <div className={styles.buttons}>
                                        <EditBtn label="Section Name" sectionName={item} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
            <div>
                <div className={styles.titleContainer} onClick={() => setSectionOpen("buttons")}>
                    <div className={styles.title}>buttons 🡇</div>
                </div>
                {sectionOpen === "buttons" && (
                    <div className={styles.listContainer}>
                        {buttons.map(item => {
                            return (
                                <div className={styles.infoContainer}>
                                    <p>Button name: {item}</p>
                                    <div className={styles.buttons}>
                                        <EditBtn label="Button Name" sectionName={item} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div> */}

            {/* <div className={styles.languageContainer}>
                <div className={styles.title}>Default language: {otherData.defaultLanguage}</div>
                <div className={styles.buttons}>
                    <ChangeDefaultLanguageBtn />
                </div>
            </div> */}
        </div>
    )
}
