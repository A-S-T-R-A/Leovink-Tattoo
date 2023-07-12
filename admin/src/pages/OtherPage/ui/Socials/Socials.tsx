import { IGlobalData } from "../../types/type"
import styles from "./Socials.module.scss"

import { Edit } from "./Edit/Edit"

export function Socials({
    data,
    triggerRefetch,
}: {
    data: IGlobalData | null
    triggerRefetch: () => void
}) {
    return (
        <div className={styles.socialsContainer}>
            <p className={styles.socialsTitle}>Social Media</p>
            {data?.socialsData.map(item => {
                const { icon, link, id } = item
                return (
                    <div className={styles.socialContainer}>
                        <div className={styles.icon}>
                            <strong>Icon:</strong> <img src={icon} alt="" className={styles.img} />
                        </div>
                        <p className={styles.link}>
                            <strong>Link:</strong> {link}
                        </p>
                        <div className={styles.btns}>
                            <Edit data={data} id={id} triggerRefetch={triggerRefetch} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
