import { Section } from "shared/ui/Section/Section"
import styles from "./Artists.module.scss"
import "swiper/scss"
import "swiper/scss/navigation"
import "swiper/scss/pagination"
import "swiper/scss/scrollbar"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore from "swiper"
import { Swiper as SwiperClass } from "swiper/types"
import { Pagination, Navigation } from "swiper"
import { ArtistCard } from "./ArtistCard/ArtistCard"
import { data } from "./const/data"
import { classNames } from "shared/lib/classNames/classNames"
import type { IArtistsData } from "shared/const/firebaseVariables"

export function Artists({
    data,
    title,
    button,
}: {
    data: IArtistsData[]
    title: string
    button: string
}) {
    return (
        <Section title={title}>
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                modules={[Pagination, Navigation]}
                breakpoints={{
                    489: { slidesPerView: 2 },
                    769: { slidesPerView: 3 },
                    1200: { slidesPerView: 4 },
                }}
                className={classNames(styles.swiper, {}, ["pagination"])}
            >
                {data.map(item => {
                    return (
                        <SwiperSlide className={styles.slide}>
                            <ArtistCard data={item} button={button} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Section>
    )
}
