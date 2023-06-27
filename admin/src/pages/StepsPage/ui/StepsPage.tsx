import { useEffect, useState } from "react"
import { StepsPageList } from "./StepsPageList/StepsPageList"
import { fetchSectionData } from "shared/const/firebaseVariables"
import { IStepsData, ITranslatedStepsData } from "../types/types"
import styles from "./StepsPage.module.scss"

export function StepsPage() {
    const [data, setData] = useState<ITranslatedStepsData | null>(null)
    const [isDataLoading, setIsDataLoading] = useState(false)

    async function fetch() {
        setIsDataLoading(true)
        const en = (await fetchSectionData("en", "steps")) as IStepsData[]
        const ro = (await fetchSectionData("ro", "steps")) as IStepsData[]
        const ru = (await fetchSectionData("ru", "steps")) as IStepsData[]
        setData({ en, ro, ru })
        setIsDataLoading(false)
    }

    function triggerRefetch() {
        setData(null)
        fetch()
    }

    useEffect(() => {
        fetch()
    }, [])

    if (isDataLoading) {
        return (
            <div className={styles.loadingContainer}>
                <h2>Loading...</h2>
            </div>
        )
    } else {
        return <StepsPageList data={data} triggerRefetch={triggerRefetch} />
    }
}
