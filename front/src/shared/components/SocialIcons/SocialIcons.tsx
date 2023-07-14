import type { ISocialMedia } from "shared/types/IGlobalData"
import styles from "./SocialIcons.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { reformatAndSortObjectValuesToArray } from "shared/const/firebaseVariables"
import { Image } from "shared/ui/Image/Image"

interface ISocialIconsProps {
    onClick?: () => void
    className?: string
    data: ISocialMedia[]
}

export function SocialIcons({ onClick, className, data }: ISocialIconsProps) {
    const containerClassName = classNames(styles.socials, {}, [className])
    const socialsData = reformatAndSortObjectValuesToArray(data)
    return (
        <div onClick={onClick} className={containerClassName}>
            {socialsData.map((item, index) => {
                const alt = index === 0 ? "instagram" : index === 1 ? "facebook" : "viber"
                return (
                    <a
                        key={index}
                        className={styles.item}
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image src={item.icon} alt={alt} className={styles.icons} />
                    </a>
                )
            })}
        </div>
    )
}
