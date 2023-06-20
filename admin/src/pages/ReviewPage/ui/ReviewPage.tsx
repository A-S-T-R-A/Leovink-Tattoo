import { AddReviewModal } from "./AddReviewModal/AddReviewModal"
import { ReviewPageList } from "./ReviewPageList/ReviewPageList"
import video from "./const/testimonial.mp4"
import preview from "./const/testimonial1.jpg"

const data = [
    {
        preview: preview,
        video: video,
        title: "Polynesian tribe tattoo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        tattoo_artist: "Nastia",
        duration: "14 hours",
    },
    {
        preview: preview,
        video: video,
        title: "Polynesian tribe tattoo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        tattoo_artist: "Nastia",
        duration: "14 hours",
    },
]

export function ReviewPage() {
    return (
        <>
            <AddReviewModal reviewData={data} />
            <ReviewPageList reviewData={data} />
        </>
    )
}
