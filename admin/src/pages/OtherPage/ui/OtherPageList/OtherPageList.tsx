import { ChangeDefaultLanguageBtn } from "../ChangeDefaultLanguageBtn/ChangeDefaultLanguageBtn"
import { EditName } from "../EditName/EditName"
import styles from "./OtherPageList.module.scss"
import { IOtherData } from "../../types/type"

export function OtherPageList({ otherData }: { otherData: IOtherData }) {
    const sectionsName = Object.values(otherData.sectionNames)
    const buttons = Object.values(otherData.buttons)

    return (
        <div className={styles.table}>
            <div className={styles.titleContainer}>
                <div className={styles.title}>Sections name</div>
            </div>
            <div className={styles.listContainer}>
                {sectionsName.map(item => {
                    return (
                        <div className={styles.infoContainer}>
                            <p>Section name: {item}</p>
                            <div className={styles.buttons}>
                                <EditName sectionName={item} />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.titleContainer}>
                <div className={styles.title}>buttons</div>
            </div>
            <div className={styles.listContainer}>
                {buttons.map(item => {
                    return (
                        <div className={styles.infoContainer}>
                            <p>Button name: {item}</p>
                            <div className={styles.buttons}>
                                <EditName sectionName={item} />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.languageContainer}>
                <div className={styles.title}>Default language: {otherData.defaultLanguage}</div>
                <div className={styles.buttons}>
                    <ChangeDefaultLanguageBtn />
                </div>
            </div>
        </div>
    )
}
