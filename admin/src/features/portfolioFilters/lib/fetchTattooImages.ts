import { ITattooImage } from "pages/PortfolioPage/types/types"
import { getImagesDoc, reformatAndSortObjectValuesToArray } from "shared/const/firebaseVariables"

export async function fetchAllImages(): Promise<ITattooImage[]> {
    const currentDoc = await getImagesDoc()
    if (!currentDoc) throw new Error()
    const currentData = currentDoc.data()
    const dataArray = reformatAndSortObjectValuesToArray(currentData) as ITattooImage[]
    return dataArray
}
