import { care, consult, drawing, prepare, treatment, update } from "shared/assets/images"

export const stepsData = [
    {
        id: 1,
        step: "01",
        stepContainer: "firstStep",
        title: "Consultation",
        img: consult,
    },
    {
        id: 2,
        step: "02",
        stepContainer: "secondStep",
        title: "Preparation",
        img: prepare,
    },
    {
        id: 3,
        step: "03",
        stepContainer: "thirdStep",
        title: "Drawing a Picture",
        img: drawing,
    },
    {
        id: 4,
        step: "04",
        stepContainer: "fourthStep",
        title: "Treatment",
        img: treatment,
    },
    {
        id: 5,
        step: "05",
        stepContainer: "fifthStep",
        title: "Care",
        img: care,
    },
    {
        id: 6,
        step: "06",
        stepContainer: "sixthStep",
        title: "Tattoo Update",
        img: update,
    },
]
