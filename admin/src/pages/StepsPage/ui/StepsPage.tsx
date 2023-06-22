import { useEffect, useState } from "react"
import { AddStepModal } from "./AddStepModal/AddStepModal"
import { StepsPageList } from "./StepsPageList/StepsPageList"
import { fetchSectionData } from "shared/const/firebaseVariables"
import { IStepsData, ITranslatedStepsData } from "../types/types"

const dummyData = [
    {
        id: 1,
        title: "Texssst",
        description: "alalalalalalalal",
        img: "https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        id: 1,
        title: "Texssst",
        description: "alalalalalalalal",
        img: "https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        id: 1,
        title: "Texssst",
        description: "alalalalalalalal",
        img: "https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
]

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

    return (
        <>
            <AddStepModal length={data?.["en"]?.length || 0} />
            <StepsPageList data={data} triggerRefetch={triggerRefetch} />
        </>
    )
}
