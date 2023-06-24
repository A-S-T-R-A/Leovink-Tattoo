import { contactData } from "../const/data"
import { ContactsPageList } from "./ContactsPageList/ContactsPageList"

export function ContactsPage() {
    return <ContactsPageList contactData={contactData} />
}
