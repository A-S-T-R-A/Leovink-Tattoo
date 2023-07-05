import { useState } from "react"
import { ChangeDefaultLanguageBtn } from "../ChangeDefaultLanguageBtn/ChangeDefaultLanguageBtn"
import { EditBtn } from "../EditBtn/EditBtn"
import styles from "./OtherPageList.module.scss"
import { IOtherData } from "../../types/type"
import { AddBtn } from "../AddBtn/AddBtn"
import { useNavigate } from "react-router-dom"
import { PortfolioFilters } from "features/portfolioFilters"

export function OtherPageList({ otherData }: { otherData: IOtherData }) {
    const sectionsName = Object.values(otherData.sectionNames)
    const buttons = Object.values(otherData.buttons)
    const [sectionOpen, setSectionOpen] = useState("sectionsName")

    const navigate = useNavigate()

    function redirectToPage() {
        navigate("/artist")
    }

    return (
        <div className={styles.table}>
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
            <div>
                <PortfolioFilters
                    isExpanded={sectionOpen === "filters"}
                    onOpen={() => setSectionOpen("filters")}
                />
            </div>
            {/* <div className={styles.languageContainer}>
                <div className={styles.title}>Default language: {otherData.defaultLanguage}</div>
                <div className={styles.buttons}>
                    <ChangeDefaultLanguageBtn />
                </div>
            </div> */}
        </div>
    )
}
