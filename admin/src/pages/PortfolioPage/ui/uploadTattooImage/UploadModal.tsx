import { useEffect, useState } from "react"
import { Modal } from "shared/ui/Modal"
import styles from "./UploadModal.module.scss"
import { Filepond } from "./Filepond"
import { Button } from "shared/ui/Button/Button"
import { FilePondFile } from "filepond"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { db, storage } from "../../../../../firebase"
import { doc, updateDoc } from "firebase/firestore"
import {
    PORTFOLIO_PICTURES_DB,
    TATTOO_IMAGES_BUCKET,
    getImagesDoc,
} from "shared/const/firebaseVariables"
import { Alert } from "shared/ui/CustomNotifications"
import { UploadTattooImageType } from "../../types/types"

export function UploadModal({ triggerRefetch }: { triggerRefetch: () => void }) {
    const [isOpen, setIsOpen] = useState(false)
    const [files, setFiles] = useState<FilePondFile[]>([])
    const [progress, setProgress] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    async function uploadImagesToBucket(files: FilePondFile[]): Promise<string[]> {
        const uploadPromises = files.map((item, index) => {
            return new Promise<string>((res, rej) => {
                const file = item.file
                const rand = (Math.random() * 100000000).toFixed()
                const fileRef = ref(storage, `${TATTOO_IMAGES_BUCKET}/ta${rand}`)

                const uploadTask = uploadBytesResumable(fileRef, file)

                uploadTask.on(
                    "state_changed",
                    snapshot => {
                        const progress = (
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100
                        ).toFixed()
                        setProgress(prev => {
                            const arr = [...prev]
                            arr[index] = progress
                            return arr
                        })

                        switch (snapshot.state) {
                            case "paused":
                                console.log("Upload is paused")
                                break
                            case "running":
                                console.log("Upload is running")
                                break
                        }
                    },
                    error => {
                        console.log("error")
                        rej(error)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url: string) => res(url))
                    }
                )
            })
        })

        try {
            return await Promise.all(uploadPromises).then(values => values)
        } catch (error) {
            Alert.error("error uploading to bucket")
            return Promise.reject()
        }
    }

    async function uploadImagesToDatabase(images: string[]) {
        const currentDoc = await getImagesDoc()
        if (!currentDoc) return
        const currentData = currentDoc.data()
        const docLength = Object.keys(currentData).length || 0

        const uploadPromises = images.map(async (item, index) => {
            const newId = docLength + index

            return new Promise((res, rej) => {
                const newData: UploadTattooImageType = {
                    [newId]: {
                        img: item,
                        alt: { en: "", ro: "", ru: "" },
                        filters: {
                            isLive: false,
                        },
                    },
                }

                updateDoc(doc(db, PORTFOLIO_PICTURES_DB, currentDoc.id), {
                    ...currentData,
                    ...newData,
                })
                    .then(() => res(true))
                    .catch(err => Alert.error("error uploading to database"))
            })
        })

        try {
            await Promise.all(uploadPromises)
        } catch (error) {
            Alert.error("error uploading to database")
            return Promise.reject(error)
        }
    }

    async function saveClickHandler() {
        setIsLoading(true)
        try {
            const urls = await uploadImagesToBucket(files)
            if (!urls.length) {
                setIsLoading(false)
                return
            }
            setFiles([])
            setProgress([])
            await uploadImagesToDatabase(urls)
            Alert.success("Successful Loading")
            setIsOpen(false)
            triggerRefetch?.()
        } catch (error) {
            Alert.error("Unexpected Error")
            triggerRefetch?.()
        }
        setIsLoading(false)
    }

    function discardClickHandler() {
        setFiles([])
        setProgress([])
        setIsOpen(false)
    }

    return (
        <>
            <Modal
                isOpen={isOpen || isLoading}
                onClose={() => setIsOpen(false)}
                contentClassName={styles.modal}
            >
                <div className={styles.container}>
                    {isLoading ? (
                        <div className={styles.loading}>
                            <div>Loading...</div>
                            <div className={styles.progress}>
                                {progress?.map((item, index) => (
                                    <p key={index}>{item}%</p>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            <Filepond setFiles={setFiles} files={files} />
                            <div className={styles.buttons}>
                                <Button onClick={saveClickHandler}>Save</Button>
                                <Button onClick={discardClickHandler}>Discard</Button>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
            <button onClick={() => setIsOpen(true)}>Upload Image</button>
        </>
    )
}
