import { PageWrapper } from "shared/ui/PageWrapper/PageWrapper"
import styles from "./PageNotFound.module.scss"
import { AppLink } from "shared/ui/AppLink/AppLink"
import { ArrowLeftIcon } from "shared/ui/Icons"
import type { LanguageType } from "shared/types/types"
import { Section } from "shared/ui/Section/Section"
import { pageNotFoundData } from "./const"

export function PageNotFound({ language }: { language: LanguageType }) {
    return (
        <PageWrapper title="404" main={pageNotFoundData[language].link}>
            <Section containerClassName={styles.container}>
                <p className={styles.error}>404</p>
                <p className={styles.description}>{pageNotFoundData[language].description}</p>
                <AppLink to="/" className={styles.link}>
                    <ArrowLeftIcon /> {pageNotFoundData[language].link}
                </AppLink>
            </Section>
        </PageWrapper>
    )
}
