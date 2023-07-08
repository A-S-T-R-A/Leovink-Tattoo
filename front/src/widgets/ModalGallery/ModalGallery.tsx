import { Modal } from "../../shared/ui/Modal"
import "swiper/scss"
import "swiper/scss/navigation"
import "swiper/scss/pagination"
import "swiper/scss/scrollbar"
import { Swiper, SwiperSlide } from "swiper/react"
import type SwiperCore from "swiper"
import { Navigation } from "swiper"
import styles from "./ModalGallery.module.scss"
import { useRef } from "preact/hooks"
import { classNames } from "../../shared/lib/classNames/classNames"
import type { LanguageType } from "../../shared/types/types"
import { ChevronDownIcon, PlusIcon } from "../../shared/ui/Icons"
import { Typography } from "shared/ui/Typography/Typography"
import type { IImagesData } from "shared/const/firebaseVariables"

interface IModalGallery {
    isOpen: boolean
    onClose: () => void
    data: IImagesData[]
    language: LanguageType
}

export function ModalGallery({ data, isOpen, onClose, language }: IModalGallery) {
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
                className={classNames(styles.swiper, {}, ["pagination"])}
            >
                {data.map((item, index) => {
                    const { img, alt } = item
                    return (
                        <SwiperSlide key={index} className={styles.slide}>
                            <div className={styles.slideContainer}>
                                <img src={img} className={styles.img} alt={alt[language]} />
                                <div className={styles.descriptionContainer}>
                                    <Typography tag="p" className={styles.description}>
                                        {alt[language]}
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
