import { Modal } from "../../shared/ui/Modal"
import "swiper/scss"
import "swiper/scss/navigation"
import "swiper/scss/pagination"
import "swiper/scss/scrollbar"
import { Swiper, SwiperSlide } from "swiper/react"
import type SwiperCore from "swiper"
import { Swiper as SwiperClass } from "swiper/types"
import { Pagination, Navigation } from "swiper"
import styles from "./ModalGallery.module.scss"
import { useRef } from "preact/hooks"
import { classNames } from "../../shared/lib/classNames/classNames"
import type { ITattooImage } from "../../shared/types/types"
import { ChevronDownIcon, PlusIcon } from "../../shared/ui/Icons"
import { Typography } from "shared/ui/Typography/Typography"

interface IModalGallery {
    isOpen: boolean
    onClose: () => void
    data: ITattooImage[]
}

export function ModalGallery({ data, isOpen, onClose }: IModalGallery) {
    const swiperRef = useRef<SwiperCore>()

    return (
        <Modal isOpen={isOpen} onClose={onClose} contentClassName={styles.container}>
            <div className={styles.cross} onClick={onClose}>
                <PlusIcon />
            </div>
            <div className={styles.prev} onClick={() => swiperRef.current?.slidePrev()}>
                <ChevronDownIcon />
            </div>
            <div className={styles.next} onClick={() => swiperRef.current?.slideNext()}>
                <ChevronDownIcon />
            </div>
            <Swiper
                slidesPerView={1}
                loop
                modules={[Navigation]}
                onSwiper={(swiper: any) => (swiperRef.current = swiper)}
                /*  pagination={{
                    clickable: true,
                }} */
                className={classNames(styles.swiper, {}, ["pagination"])}
            >
                {data.map(item => {
                    const { id, img } = item
                    return (
                        <SwiperSlide key={id} className={styles.slide}>
                            <div className={styles.slideContainer}>
                                <img src={img} className={styles.img} />
                                <div className={styles.descriptionContainer}>
                                    <Typography className={styles.description}>
                                        Lorem ipsum dolor sit amet.
                                    </Typography>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Modal>
    )
}
