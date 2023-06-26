import { app } from "../../../../../firebase"
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import styles from "./AuthComponent.module.scss"
import { checkIsEmailWhitelisted } from "../../lib/checkIsEmailWhitelisted"
import { Alert } from "shared/ui/CustomNotifications"

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export function AuthComponent() {
    const { user, updateUser } = useContext(AuthContext)

    function logOutWithGoogle() {
        updateUser(null)
        signOut(auth)
    }

    function signInWithGoogle() {
        signInWithPopup(auth, provider)
            .then(({ user }) => {
                const name = user.displayName || "Anonimus"
                const img = user.photoURL || ""
                const email = user.email || ""

                if (!checkIsEmailWhitelisted(email)) throw new Error()

                updateUser({ name, img, email })
            })
            .catch(err => {
                Alert.error("Auth error")
                logOutWithGoogle()
            })
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!checkIsEmailWhitelisted(user?.email)) {
                logOutWithGoogle()
            }

            if (!user) {
                updateUser(null)
            } else {
                updateUser({
                    name: user.displayName || "Anonimus",
                    img: user.photoURL || "",
                    email: user.email || "",
                })
            }
        })
    }, [])

    return (
        <>
            {user ? (
                <div className={styles.logOut}>
                    <div>
                        {user.name} <img src={user.img} />
                    </div>
                    <button onClick={logOutWithGoogle}>Log Out</button>
                </div>
            ) : (
                <button onClick={signInWithGoogle}>Sign in</button>
            )}
        </>
    )
}
