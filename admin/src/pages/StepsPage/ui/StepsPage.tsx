import { useEffect, useState } from "react"
import { StepsPageList } from "./StepsPageList/StepsPageList"
import { fetchSectionData } from "shared/const/firebaseVariables"
import { IStepsData, ITranslatedStepsData } from "../types/types"

export function StepsPage() {
    const [data, setData] = useState<ITranslatedStepsData | null>(null)

    async function fetch() {
        const en = (await fetchSectionData("en", "steps")) as IStepsData[]
        const ro = (await fetchSectionData("ro", "steps")) as IStepsData[]
        const ru = (await fetchSectionData("ru", "steps")) as IStepsData[]
        setData({ en, ro, ru })
    }

    function triggerRefetch() {
        fetch()
    }

    useEffect(() => {
        fetch()
    }, [])

    return <StepsPageList data={data} triggerRefetch={triggerRefetch} />
}
