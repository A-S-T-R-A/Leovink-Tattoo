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
        <div className={styles.socials}>
            <p className={styles.title}>Social Media</p>
            {data?.socialsData.map(item => {
                const { icon, link, id } = item
                return (
                    <div className={styles.socialContainer}>
                        <p>
                            icon: <img src={icon} alt="" className={styles.img} />
                        </p>
                        <p>link: {link}</p>
                        <div className={styles.btns}>
                            <Edit data={data} id={id} triggerRefetch={triggerRefetch} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
