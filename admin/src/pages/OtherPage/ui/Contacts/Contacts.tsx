import { IGlobalData } from "pages/OtherPage"
import styles from "./Contacts.module.scss"
import { defaultLanguage } from "shared/const/languages"
import { Edit } from "./Edit/Edit"
import { Typography } from "shared/ui/Typography/Typography"

export function Contacts({
    data,
    triggerRefetch,
}: {
    data: IGlobalData | null
    triggerRefetch: () => void
}) {
    return (
        <div className={styles.container}>
            <p className={styles.contactsTitle}>Contacts & Location</p>
            <div className={styles.location}>
                <p>
                    <strong>Location:</strong> {data?.addressData.location[defaultLanguage] || ""}
                </p>
                <div className={styles.btns}>
                    <Edit data={data} triggerRefetch={triggerRefetch} addressType="location" />
                </div>
            </div>
            <div className={styles.phone}>
                <div className={styles.dataContainer}>
                    {data?.addressData.phone.map((item, index) => (
                        <Typography key={index}>
                            <strong>{index + 1}. Phone:</strong> {item}
                        </Typography>
                    ))}
                </div>
                <Edit data={data} triggerRefetch={triggerRefetch} addressType="phone" />
            </div>
            <div className={styles.mail}>
                <div className={styles.dataContainer}>
                    {data?.addressData.mail.map((item, index) => (
                        <Typography key={index}>
                            <strong>{index + 1}. Mail:</strong> {item}
                        </Typography>
                    ))}
                </div>
                <Edit data={data} triggerRefetch={triggerRefetch} addressType="mail" />
            </div>
        </div>
    )
}
