interface IImageProps {
    src: string
    alt: string
    className?: string
    onClick?: () => void
}

export function Image(props: IImageProps) {
    const imageUrl = `${props.src}?timestamp=${Date.now()}`

    return (
        <img src={imageUrl} className={props.className} alt={props.alt} onClick={props.onClick} />
    )
}
