import { Input } from "shared/ui/Input/Input"
import { useState, useRef, useCallback, useMemo } from "preact/hooks"
import { Typography } from "shared/ui/Typography/Typography"
import styles from "./Form.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import emailjs from "@emailjs/browser"
import { NAME_REG_EX, PHONE_REG_EX } from "./const/regex"
import { initialFormData } from "./const/const"
import { Button } from "shared/ui/Button/Button"
import { ArrowDownIcon } from "shared/ui/Icons"
import { FormStatus } from "./FormStatus/FormStatus"
import AnimatedLoadingIcon from "./AnimatedLoadingIcon/AnimatedLoadingIcon"
import { BiErrorCircle } from "react-icons/bi"
import { AiOutlineCheckCircle } from "react-icons/ai"

export function Form({
    isVertical,
    className,
    data,
    title,
    cta,
}: {
    className?: string
    isVertical?: boolean
    data: {
        name: string
        phone: string
        loading: string
        success: string
        error: string
        validName: string
        validPhone: string
    }
    title: string
    cta: string
}) {
    const [formData, setFormData] = useState(initialFormData)
    const [formErrors, setFormErrors] = useState(initialFormData)

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const formRef = useRef<HTMLFormElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)

    function checkInputsValid(formData: any): boolean {
        const { name, phone } = formData

        if (!NAME_REG_EX.test(name)) {
            setFormErrors(prev => ({ ...prev, name: data.validName }))
            nameRef.current?.scrollIntoView()
            return false
        }
        if (!PHONE_REG_EX.test(phone)) {
            setFormErrors(prev => ({ ...prev, phone: data.validPhone }))
            phoneRef.current?.scrollIntoView()
            return false
        }

        return true
    }

    function sendEmail() {
        setIsLoading(true)
        emailjs
            .sendForm(
                import.meta.env.PUBLIC_SERVICE_ID,
                import.meta.env.PUBLIC_TEMPLATE_ID,
                formRef.current || "",
                import.meta.env.PUBLIC_PUBLIC_KEY
            )
            .then(
                () => {
                    setIsSuccess(true)
                    setTimeout(() => {
                        setIsSuccess(false)
                    }, 3000)
                    setFormData(initialFormData)
                    setFormErrors(initialFormData)
                },
                () => {
                    setIsError(true)
                    setTimeout(() => {
                        setIsError(false)
                    }, 3000)
                }
            )
            .finally(() => {
                setIsLoading(false)
            })
    }

    const submitHandler = useCallback(
        (e: any) => {
            e.preventDefault()
            if (!checkInputsValid(formData)) return
            sendEmail()
        },
        [formData]
    )

    const content = useMemo(() => {
        switch (true) {
            case isLoading:
                return (
                    <FormStatus
                        icon={<AnimatedLoadingIcon className={styles.loadingIcon} />}
                        text={data.loading}
                    />
                )
            case isError:
                return (
                    <FormStatus
                        /* @ts-ignore */
                        icon={<BiErrorCircle className={styles.failIcon} />}
                        text={data.error}
                    />
                )
            case isSuccess:
                return (
                    <FormStatus
                        /* @ts-ignore */
                        icon={<AiOutlineCheckCircle className={styles.successIcon} />}
                        text={data.success}
                    />
                )
            default:
                return (
                    <>
                        <div className={styles.formContent}>
                            <Input
                                placeholder={data.name}
                                className={styles.input}
                                value={formData.name}
                                error={formErrors.name}
                                name="name"
                                onChange={name => {
                                    console.log("fired on Change")
                                    setFormData(prev => ({ ...prev, name }))
                                    setFormErrors(prev => ({ ...prev, name: "" }))
                                }}
                            />
                            <Input
                                placeholder={data.phone}
                                className={styles.input}
                                value={formData.phone}
                                name="phone"
                                error={formErrors.phone}
                                onChange={phone => {
                                    setFormData(prev => ({ ...prev, phone }))
                                    setFormErrors(prev => ({ ...prev, phone: "" }))
                                }}
                            />
                            <Button className={styles.btn} type="submit">
                                {cta} <ArrowDownIcon className={styles.icon} />
                            </Button>
                        </div>
                    </>
                )
        }
    }, [formData, formErrors, isLoading, isError, isSuccess, submitHandler])

    return (
        <form
            id="formSection"
            className={classNames(styles.form, { [styles.vertical]: isVertical }, [className])}
            ref={formRef}
            onSubmit={submitHandler}
        >
            <Typography tag="h2" size="xxl" className={styles.title}>
                {title}
            </Typography>
            {content}
        </form>
    )
}
