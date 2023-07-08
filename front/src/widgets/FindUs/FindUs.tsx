import { Typography } from "shared/ui/Typography/Typography"
import { Section } from "shared/ui/Section/Section"
import { map } from "shared/assets/images"
import styles from "./FindUs.module.scss"
import { DecodeMarkdown } from "./lib/DecodeMarkdown"

export function FindUs({ data }: { data: string }) {
    return (
        <Section>
            <div className={styles.container}>
                <DecodeMarkdown data={data} />
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
