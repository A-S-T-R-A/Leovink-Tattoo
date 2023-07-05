import { useEffect, useState } from "react"
import { AddArtistsModal } from "./AddArtistsModal/AddArtistsModal"
import { ModalImage } from "shared/components/ModalImage/ModalImage"
import { EditParagraph } from "./EditParagraph/EditParagraph"
import styles from "./ArtistsPage.module.scss"
import { IArtistData, ITranslatedArtistsData } from "../types/types"
import { fetchGlobalData, fetchSectionData } from "shared/const/firebaseVariables"
import { defaultLanguage } from "shared/const/languages"
import { DeleteParagraph } from "./DeleteParagraph/DeleteParagraph"
import { IFiltersData } from "features/portfolioFilters/types/types"

export function ArtistsPage() {
    const [data, setData] = useState<ITranslatedArtistsData | null>(null)
    const [filtersData, setFiltersData] = useState<IFiltersData | null>(null)

    async function fetch() {
        const en = (await fetchSectionData("en", "artists")) as IArtistData[]
        const ro = (await fetchSectionData("ro", "artists")) as IArtistData[]
        const ru = (await fetchSectionData("ru", "artists")) as IArtistData[]
        setData({ en, ro, ru })
        const { filtersData } = await fetchGlobalData()
        setFiltersData(filtersData)
    }

    function triggerRefetch() {
        fetch()
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <>
            <AddArtistsModal
                data={data}
                filtersData={filtersData}
                triggerRefetch={triggerRefetch}
            />
            <div className={styles.table}>
                {data?.[defaultLanguage].map((item, index) => (
                    <div className={styles.item} key={index}>
                        <div>id: {index}</div>
                        <div className={styles.imgContainer}>
                            <ModalImage className={styles.img} url={item.img} />
                        </div>
                        <div>Name: {item.name}</div>
                        <div>Specialization: {item.specialization}</div>
                        <div className={styles.description}>Description: {item.description}</div>
                        <div className={styles.buttons}>
                            <EditParagraph
                                data={data}
                                filtersData={filtersData}
                                id={index}
                                triggerRefetch={triggerRefetch}
                            />
                            <DeleteParagraph
                                name={item.name}
                                data={data}
                                filtersData={filtersData}
                                id={index}
                                triggerRefetch={triggerRefetch}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
