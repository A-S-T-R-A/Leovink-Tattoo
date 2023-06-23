import { IContactData } from "../../types/type"
import styles from "./ContactsPageList.module.scss"
import { EditContact } from "../EditContact/EditContact"
import { EditDescription } from "../EditDescription/EditDescription"
import { EditSocialMedia } from "../EditSocialMedia/EditSocialMedia"

export function ContactsPageList({ contactData }: { contactData: IContactData }) {
    return (
        <div className={styles.table}>
            <div className={styles.location}>
                Location: {contactData.location}
                <div className={styles.btns}>
                    <EditContact label="location" contact={contactData.location} />
                </div>
            </div>
            <div className={styles.phone}>
                Phone: {contactData.phone}
                <div className={styles.btns}>
                    <EditContact label="phone" contact={contactData.phone} />
                </div>
            </div>
            <div className={styles.mail}>
                Mail: {contactData.mail}
                <div className={styles.btns}>
                    <EditContact label="mail" contact={contactData.mail} />
                </div>
            </div>
            <div className={styles.description}>
                Description: {contactData.description}
                <div className={styles.btns}>
                    <EditDescription description={contactData.description} />
                </div>
            </div>
            <div className={styles.socials}>
                <p className={styles.title}>Social Media</p>
                {contactData.socials.map(item => {
                    const { icon, link } = item
                    return (
                        <div className={styles.socialContainer}>
                            <p>
                                icon: <img src={icon} alt="" />
                            </p>
                            <p>link: {link}</p>
                            <div className={styles.btns}>
                                <EditSocialMedia social={item} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
