import { Section } from "shared/ui/Section/Section"
import styles from "./Artists.module.scss"
import "swiper/scss"
import "swiper/scss/navigation"
import "swiper/scss/pagination"
import "swiper/scss/scrollbar"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper"
import { ArtistCard } from "./ArtistCard/ArtistCard"
import { classNames } from "shared/lib/classNames/classNames"
import type { IArtistsData } from "shared/const/firebaseVariables"
import type { LanguageType } from "shared/types/types"
import "./Artist.scss"

export function Artists({
    data,
    title,
    button,
    language,
    defaultLanguage,
}: {
    data: IArtistsData[]
    title: string
    button: string
    language: LanguageType
    defaultLanguage: LanguageType
}) {
    return (
        <Section title={title}>
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                modules={[Pagination, Navigation]}
                pagination={{ clickable: true }}
                breakpoints={{
                    489: { slidesPerView: 2 },
                    769: { slidesPerView: 3 },
                    1200: { slidesPerView: 4 },
                }}
                className={classNames(styles.swiper, {}, ["artistPagination"])}
            >
                {data.map(item => {
                    return (
                        <SwiperSlide className={styles.slide}>
                            <ArtistCard
                                data={item}
                                button={button}
                                language={language}
                                defaultLanguage={defaultLanguage}
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Section>
    )
}
