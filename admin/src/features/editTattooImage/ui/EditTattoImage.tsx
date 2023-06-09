import { getDocs, query, updateDoc, where } from "firebase/firestore"
import { useState } from "react"
import { ITattooImage } from "shared/types/types"
import { EditModal } from "./EditModal/EditModal"
import {
    getFirestoreDocumentByFileId,
    getFirestoreDocumentById,
    portfolioPicturesRef,
} from "shared/const/firebaseVariables"

export function EditTattooImage({
    id,
    triggerRefetch,
}: {
    id: number
    triggerRefetch: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState<ITattooImage>({})

    async function openClickHandler() {
        try {
            const file = await getFirestoreDocumentById(id, portfolioPicturesRef)
            const fileData = file.data() as ITattooImage
            setData(fileData)
            setIsOpen(true)
        } catch (error) {
            alert("Unexpected Error")
            setIsOpen(false)
        }
    }

    async function saveClickHandler() {
        try {
            const file = await getFirestoreDocumentById(id, portfolioPicturesRef)

            if (id === data.id) {
                await updateDoc(getFirestoreDocumentByFileId(file.id), data)
                alert("Edit Success")
                setIsOpen(false)
                triggerRefetch?.()
            } else {
                const nq = query(portfolioPicturesRef, where("id", ">=", data.id))
                const nd = await getDocs(nq)
                if (!nd.empty) {
                    nd.docs.forEach(async (item, index) => {
                        await updateDoc(getFirestoreDocumentByFileId(item.id), {
                            id: data.id + index + 1,
                        })
                    })
                }

                await updateDoc(getFirestoreDocumentByFileId(file.id), data)
                alert("Success reorder")
                setIsOpen(false)
                triggerRefetch?.()
            }
        } catch (error) {
            alert("Unexpected Error")
            triggerRefetch?.()
        }
    }

    function discardClickHandler() {
        setData({})
        setIsOpen(false)
    }

    function onClose() {
        setIsOpen(false)
    }

    return (
        <>
            <EditModal
                data={data}
                isOpen={isOpen}
                onClose={onClose}
                setData={setData}
                saveClickHandler={saveClickHandler}
                discardClickHandler={discardClickHandler}
            />
            <button onClick={openClickHandler}>Edit</button>
        </>
    )
}
