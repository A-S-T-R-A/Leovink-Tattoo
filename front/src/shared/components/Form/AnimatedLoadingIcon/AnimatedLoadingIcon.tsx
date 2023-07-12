import styles from "./AnimatedLoadingIcon.module.css"
import { LoadingQuarters } from "./LoadingQarters"

function AnimatedLoadingIcon({ className }: { className?: string }) {
    return <LoadingQuarters className={`${styles.icon} ${className}`} />
}

export default AnimatedLoadingIcon
