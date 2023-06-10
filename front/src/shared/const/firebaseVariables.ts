import { db } from "../../../firebase"
import { collection } from "firebase/firestore"

const PORTFOLIO_PICTURES_DB = "portfolio_pictures"
export const portfolioPicturesRef = collection(db, PORTFOLIO_PICTURES_DB)
