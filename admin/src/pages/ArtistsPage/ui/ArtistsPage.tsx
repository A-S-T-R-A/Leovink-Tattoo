import { AddArtistsModal } from "./AddArtistsModal/AddArtistsModal"
import { ArtistsPageList } from "./ArtistsPageList/ArtistsPageList"
import { data as artistsData } from "../const/data"

export function ArtistsPage() {
    return (
        <>
            <AddArtistsModal artistsData={artistsData} />
            <ArtistsPageList artistsData={artistsData} />
        </>
    )
}
