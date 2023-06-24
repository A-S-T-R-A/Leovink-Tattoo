import { useState } from "react"
import { ChangeDefaultLanguageBtn } from "../ChangeDefaultLanguageBtn/ChangeDefaultLanguageBtn"
import { EditBtn } from "../EditBtn/EditBtn"
import styles from "./OtherPageList.module.scss"
import { IOtherData } from "../../types/type"
import { AddBtn } from "../AddBtn/AddBtn"
import { useNavigate } from "react-router-dom"

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
            <div>
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
            </div>
            <div>
                <div className={styles.titleContainer} onClick={() => setSectionOpen("filters")}>
                    <div className={styles.title}>filters 🡇</div>
                </div>
                {sectionOpen === "filters" && (
                    <div>
                        <div className={styles.listContainer}>
                            <div className={styles.titleContainer}>Tattoo Artists</div>
                            {otherData.filters.artist.map(item => {
                                return (
                                    <div className={styles.infoContainer}>
                                        <p>Tattoo Artist: {item}</p>
                                        <button onClick={redirectToPage}>edit</button>
                                    </div>
                                )
                            })}
                            {/*  <a href="/artist">Add New Artist</a> */}
                            <button onClick={redirectToPage}>add new artist</button>
                        </div>
                        <div className={styles.listContainer}>
                            <div className={styles.titleContainer}>Tattoo Styles</div>
                            {otherData.filters.style.map(item => {
                                return (
                                    <div className={styles.infoContainer}>
                                        <p>Tattoo Style: {item}</p>
                                        <EditBtn label="Tattoo style" sectionName={item} />
                                    </div>
                                )
                            })}
                            <AddBtn label="New Tattoo Color" />
                        </div>
                        <div className={styles.listContainer}>
                            <div className={styles.titleContainer}>Tattoo Colors</div>
                            {otherData.filters.color.map(item => {
                                return (
                                    <div className={styles.infoContainer}>
                                        <p>Tattoo color: {item}</p>
                                        <EditBtn label="Tattoo color" sectionName={item} />
                                    </div>
                                )
                            })}
                            <AddBtn label="New Tattoo Color" />
                        </div>
                    </div>
                )}
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
