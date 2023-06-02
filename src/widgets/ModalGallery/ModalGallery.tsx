import { Modal } from "shared/ui/Modal"
import { ITattooImage } from "./types/types"
import "swiper/scss"
import "swiper/scss/navigation"
import "swiper/scss/pagination"
import "swiper/scss/scrollbar"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore from "swiper"
import { Swiper as SwiperClass } from "swiper/types"
import { Pagination, Navigation } from "swiper"
import { data } from "./const/data"
import styles from "./ModalGallery.module.scss"
import { useRef } from "react"
import { classNames } from "shared/lib/classNames/classNames"

interface IModalGallery {
    isOpen: boolean
    onClose: () => void
    // data: ITattooImage[]
}

export function ModalGallery({ isOpen, onClose }: IModalGallery) {
    const swiperRef = useRef<SwiperCore>()

    return (
        <Modal isOpen={isOpen} onClose={onClose} contentClassName={styles.container}>
            <div className={styles.cross} onClick={onClose}>
                x
            </div>
            <div className={styles.prev} onClick={() => swiperRef.current?.slidePrev()}>
                {"<"}
            </div>
            <div className={styles.next} onClick={() => swiperRef.current?.slideNext()}>
                {">"}
            </div>
            <Swiper
                slidesPerView={1}
                loop
                modules={[Pagination, Navigation]}
                onSwiper={swiper => (swiperRef.current = swiper)}
                pagination={{
                    clickable: true,
                }}
                className={classNames(styles.swiper, {}, ["pagination"])}
            >
                {data.map(item => {
                    const { id, img } = item
                    return (
                        <SwiperSlide key={id} className={styles.slide}>
                            <img src={img} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Modal>
    )
}
