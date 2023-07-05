import { classNames } from "shared/lib/classNames/classNames"
import styles from "./LazyLoadingImage.module.scss"
import { useState } from "preact/hooks"

interface ILazyLoadingImage {
    src: string
    backgroundImage: string
    className?: string
    imgClassName?: string
}

export function LazyLoadingImage(props: ILazyLoadingImage) {
    const { src, backgroundImage, className, imgClassName } = props

    const [isLoad, setIsLoad] = useState(false)

    return (
        <div
            className={classNames(styles.blurImg, { [styles.unBlur]: isLoad }, [className])}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <img
                src={src}
                className={classNames(
                    styles.image,
                    {
                        [styles.loaded]: isLoad,
                    },
                    [imgClassName]
                )}
                onLoad={() => setIsLoad(true)}
            />
        </div>
    )
}
