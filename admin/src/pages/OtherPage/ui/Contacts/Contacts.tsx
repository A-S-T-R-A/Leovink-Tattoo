import { IGlobalData } from "pages/OtherPage"
import styles from "./Contacts.module.scss"
import { defaultLanguage } from "shared/const/languages"
import { Fragment, useState } from "react"
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
        <div>
            <div className={styles.location}>
                Location: {data?.addressData.location[defaultLanguage] || ""}
                <div className={styles.btns}>
                    <Edit data={data} triggerRefetch={triggerRefetch} addressType="location" />
                </div>
            </div>
            <div className={styles.phone}>
                Phone:
                {data?.addressData.phone.map((item, index) => (
                    <Typography key={index}>{item}</Typography>
                ))}
                <Edit data={data} triggerRefetch={triggerRefetch} addressType="phone" />
            </div>
            <div className={styles.mail}>
                Mail:
                {data?.addressData.mail.map((item, index) => (
                    <Typography key={index}>{item}</Typography>
                ))}
                <Edit data={data} triggerRefetch={triggerRefetch} addressType="mail" />
            </div>
        </div>
    )
}
