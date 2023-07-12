import { reformatArrayToObject, rewriteImagesDoc } from "shared/const/firebaseVariables"

export async function uploadTattooImages(array: any[]) {
    const dataToUpload = reformatArrayToObject(array)
    await rewriteImagesDoc(dataToUpload)
}
