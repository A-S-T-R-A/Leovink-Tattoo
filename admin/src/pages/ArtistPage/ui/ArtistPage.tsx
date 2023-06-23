import { AddArtistModal } from "./AddArtistModal/AddArtistModal"
import { ArtistPageList } from "./ArtistPageList/ArtistPageList"
import { data as artistData } from "../const/data"

export function ArtistPage() {
    return (
        <>
            <AddArtistModal artistData={artistData} />
            <ArtistPageList artistData={artistData} />
        </>
    )
}
