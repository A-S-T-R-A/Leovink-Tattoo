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

export function Artists() {
    return (
        <Section title="Artists">
            {/* <div className={styles.listContainer}>
                {data.map(item => (
                    <ArtistCard key={item.id} data={item} />
                ))}
            </div> */}

            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                modules={[Pagination, Navigation]}
                breakpoints={{
                    489: { slidesPerView: 2 },
                    769: { slidesPerView: 3 },
                    1200: { slidesPerView: 4 },
                }}
                /*  onSwiper={swiper => (swiperRef.current = swiper)}
                pagination={{
                    clickable: true,
                }} */
                className={classNames(styles.swiper, {}, ["pagination"])}
            >
                {data.map(item => {
                    return (
                        <SwiperSlide key={item.id} className={styles.slide}>
                            <ArtistCard key={item.id} data={item} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Section>
    )
}
