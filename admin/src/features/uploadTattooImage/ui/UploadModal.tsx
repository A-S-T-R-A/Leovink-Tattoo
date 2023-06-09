import { useState } from "react"
import { Modal } from "shared/ui/Modal"
import styles from "./UploadModal.module.scss"
import { Filepond } from "./Filepond/Filepond"
import { Button } from "shared/ui/Button/Button"
import { FilePondFile } from "filepond"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../../../../firebase"
import { addDoc, getDocs, orderBy, query } from "firebase/firestore"
import { TATTOO_IMAGES_BUCKET, portfolioPicturesRef } from "shared/const/firebaseVariables"
import { ITattooImage } from "shared/types/types"

export function UploadModal({ triggerRefetch }: { triggerRefetch: () => void }) {
    const [isOpen, setIsOpen] = useState(false)
    const [files, setFiles] = useState<FilePondFile[]>([])
    const [progress, setProgress] = useState<string[]>([])

    const isLoading = !progress.every(item => item === "100")

    async function getLastId() {
        const q = query(portfolioPicturesRef, orderBy("id", "asc"))
        const d = await getDocs(q)

        return d.docs.pop()?.data().id
    }

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
            alert("error uploading to bucket")
            return Promise.reject()
        }
    }

    async function uploadImagesToDatabase(images: string[]) {
        const uploadPromises = images.map(async (item, index) => {
            const newId = (await getLastId()) + index + 1

            return new Promise((res, rej) => {
                const schema: ITattooImage = {
                    artist: "",
                    color: "",
                    id: newId,
                    img: item,
                    style: "",
                    isLive: false,
                }

                addDoc(portfolioPicturesRef, schema)
                    .then(() => res(true))
                    .catch(err => alert("error uploading to database"))
            })
        })

        try {
            await Promise.all(uploadPromises)
        } catch (error) {
            alert("error uploading to database")
            return Promise.reject(error)
        }
    }

    async function saveClickHandler() {
        try {
            const urls = await uploadImagesToBucket(files)
            if (!urls.length) return
            setFiles([])
            setProgress([])
            await uploadImagesToDatabase(urls)
            alert("Successful Loading")
            setIsOpen(false)
            triggerRefetch?.()
        } catch (error) {
            alert("Unexpected Error")
            triggerRefetch?.()
            return
        }
    }

    function discardClickHandler() {
        setFiles([])
        setProgress([])
        setIsOpen(false)
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} contentClassName={styles.modal}>
                <p>Filepond</p>
                {isLoading ? (
                    <p>
                        {progress?.map(item => (
                            <p>{item}</p>
                        ))}
                    </p>
                ) : (
                    <>
                        <Filepond setFiles={setFiles} files={files} />
                        <div className={styles.buttons}>
                            <Button onClick={saveClickHandler}>Save</Button>
                            <Button onClick={discardClickHandler}>Discard</Button>
                        </div>
                    </>
                )}
            </Modal>
            <button onClick={() => setIsOpen(true)}>Upload Image</button>
        </>
    )
}
