import { Typography } from "shared/ui/Typography/Typography"
import { Section } from "shared/ui/Section/Section"
import { map } from "shared/assets/images"
import styles from "./FindUs.module.scss"

export function FindUs() {
    return (
        <Section>
            <div className={styles.container}>
                <Typography tag="p" className={styles.text} size="l">
                    The studio is located approximately a 7-minute walk from the exit of the
                    underground passage at the intersection of{" "}
                    <strong>Stefan cel Mare Boulevard and Izmail Street</strong>. The landmark is
                    the <strong>Unic</strong> department store. You need to go up{" "}
                    <strong>Izmail Street towards the former Republican Stadium</strong>.
                    <br />
                    <br /> If you arrive by taxi, ask the driver to drop you off right in front of
                    the studio, located on the main <strong>Izmail Street at 40/2</strong>. The
                    address is exactly in the middle between{" "}
                    <strong>Bucharest Street and August 31 Street</strong>.
                    <br />
                    <br /> There are no parking spaces at the studio, but if you come by car, you
                    can find parking nearby. There is one parking spot on{" "}
                    <strong>August 31 Street</strong>, between{" "}
                    <strong>Izmail and Lev Tolstoy</strong>, or on <strong>Bucharest Street</strong>
                    , also between <strong>Lev Tolstoy and Izmail</strong>. Both parking lots are
                    within a 3-4 minute walk from the studio.
                </Typography>
                <div className={styles.mapContainer}>
                    <a
                        href="https://yandex.ru/maps/org/leovink_tattoo_studio/184496310101/?utm_medium=mapframe&utm_source=maps"
                        style="color:#eee;font-size:12px;position:absolute;top:0px;left:10px"
                    >
                        Leovink Tattoo Studio
                    </a>
                    <a
                        href="https://yandex.ru/maps/10313/kishinev/category/tattoo_studio/184105820/?utm_medium=mapframe&utm_source=maps"
                        style="color:#eee;font-size:12px;position:absolute;top:14px;left:10px"
                    >
                        Тату-салон в Кишиневе
                    </a>
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?ll=28.842155%2C47.013226&mode=search&oid=184496310101&ol=biz&z=17.03"
                        frameBorder="1"
                        className={styles.map}
                    ></iframe>
                </div>
            </div>
        </Section>
    )
}
