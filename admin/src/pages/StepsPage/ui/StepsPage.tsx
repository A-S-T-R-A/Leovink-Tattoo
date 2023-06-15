import { AddStepModal } from "./AddStepModal/AddStepModal"
import { StepsPageList } from "./StepsPageList/StepsPageList"

const data = [
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
    return (
        <>
            <AddStepModal />
            <StepsPageList data={data} />
        </>
    )
}
