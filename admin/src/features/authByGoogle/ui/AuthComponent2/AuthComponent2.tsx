import { app } from "../../../../../firebase"
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import styles from "./AuthComponent2.module.scss"
import { checkIsEmailWhitelisted } from "../../lib/checkIsEmailWhitelisted"
import { Alert } from "shared/ui/CustomNotifications"
import { DownArrowIcon, ExitIcon } from "shared/assets/icons"

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export function AuthComponent2() {
    const [dropdownCheckbox, setDropdownCheckbox] = useState(false)
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

    const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    function dropdownSwitcher() {
        setDropdownCheckbox(prev => {
            if (!prev) {
                if (dropdownTimeout.current) {
                    clearTimeout(dropdownTimeout.current)
                }
                dropdownTimeout.current = setTimeout(() => setDropdownCheckbox(false), 5000)
                return true
            } else {
                return false
            }
        })
    }

    console.log(dropdownCheckbox)

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
                <div className={styles.container}>
                    <div className={styles.sliderContainer}>
                        <div>
                            <label htmlFor="dropdowncheckbox" className={styles.slider}>
                                <img src={user.img} alt="user image" className={styles.avatar} />
                                <p className={styles.name}>{user.name}</p>
                                <DownArrowIcon className={styles.downarrow} />
                            </label>
                            <input
                                type="checkbox"
                                id="dropdowncheckbox"
                                checked={dropdownCheckbox}
                                onChange={() => dropdownSwitcher()}
                                className={styles.dropdownCheckbox}
                            />
                        </div>
                        <div
                            className={`${styles.dropdown} ${
                                dropdownCheckbox ? styles.dropdownVisible : styles.dropdownInvisible
                            }`}
                        >
                            <button className={styles.logOutBtn} onClick={logOutWithGoogle}>
                                Log Out
                                <ExitIcon className={styles.exitIcon} />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <button onClick={signInWithGoogle}>Sign in</button>
            )}
        </>
    )
}
