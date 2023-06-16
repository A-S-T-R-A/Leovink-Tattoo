import { AddServiceModal } from "./AddServiceModal/AddServiceModal"
import { ServicesPageList } from "./ServicesPageList/ServicesPageList"
import { care, consult, drawing } from "shared/assets/images"
const data = [
    {
        id: 1,
        title: "Tattoo",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sed quidem molestias voluptates reprehenderit totam incidunt doloribus eius nemo maiores.",
        img: [care, consult, drawing],
    },
    {
        id: 2,
        title: "Fixing a Bad Tattoo",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sed quidem molestias voluptates reprehenderit totam incidunt doloribus eius nemo maiores.",
        img: [care, consult, drawing],
    },
    {
        id: 3,
        title: "Cover up Tattoo",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sed quidem molestias voluptates reprehenderit totam incidunt doloribus eius nemo maiores.",
        img: [care, consult, drawing],
    },
    {
        id: 4,
        title: "Covering Scars",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sed quidem molestias voluptates reprehenderit totam incidunt doloribus eius nemo maiores.",
        img: [care, consult, drawing],
    },
    {
        id: 5,
        title: "Piercing",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sed quidem molestias voluptates reprehenderit totam incidunt doloribus eius nemo maiores.",
        img: [care, consult, drawing],
    },
]

export function ServicesPage() {
    return (
        <>
            <AddServiceModal serviceData={data} />
            <ServicesPageList serviceData={data} />
        </>
    )
}
