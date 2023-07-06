import { IGlobalData } from "pages/OtherPage"
import styles from "./Contacts.module.scss"
import { defaultLanguage } from "shared/const/languages"
import { Fragment } from "react"
import { Edit } from "./Edit/Edit"

export function Contacts({
    data,
    triggerRefetch,
}: {
    data: IGlobalData | null
    triggerRefetch: () => void
}) {
    data?.addressData.location
    return (
        <div>
            <div className={styles.location}>
                Location: {data?.addressData.location[defaultLanguage] || ""}
                <div className={styles.btns}>
                    <Edit />
                    {/* <EditContact label="location" contact={contactData.location} /> */}
                </div>
            </div>
            <div className={styles.phone}>
                Phone:
                {data?.addressData.phone.map((item, index) => (
                    <Fragment key={index}>
                        {item}
                        <div className={styles.btns}>
                            <Edit />
                            {/* <EditContact label="phone" contact={contactData.phone} /> */}
                        </div>
                    </Fragment>
                ))}
            </div>
            <div className={styles.mail}>
                Mail:
                {data?.addressData.mail.map((item, index) => (
                    <Fragment key={index}>
                        {item}
                        <div className={styles.btns}>
                            <Edit />
                            {/* <EditContact label="phone" contact={contactData.phone} /> */}
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    )
}
