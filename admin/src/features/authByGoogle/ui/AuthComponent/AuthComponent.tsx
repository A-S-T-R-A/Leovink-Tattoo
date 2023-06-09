import { app } from "../../../../../firebase"
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import styles from "./AuthComponent.module.scss"
import { checkIsEmailWhitelisted } from "../../lib/checkIsEmailWhitelisted"
import { Alert } from "shared/ui/CustomNotifications"
import { DownArrowIcon, ExitIcon } from "shared/assets/icons"
import { DELAY } from "../../const/delay"

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export function AuthComponent() {
    const [dropdownCheckbox, setDropdownCheckbox] = useState(false)
    const { user, updateUser } = useContext(AuthContext)
    function logOutWithGoogle() {
        updateUser(null)
        signOut(auth)
        setDropdownCheckbox(false)
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
                dropdownTimeout.current = setTimeout(() => setDropdownCheckbox(false), DELAY)
                return true
            } else {
                return false
            }
        })
    }

    function mouseEnterHandler() {
        clearTimeout(dropdownTimeout.current as any)
    }

    function mouseLeaveHandler() {
        dropdownTimeout.current = setTimeout(() => setDropdownCheckbox(false), DELAY)
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
                                onChange={dropdownSwitcher}
                                className={styles.dropdownCheckbox}
                            />
                        </div>
                        <div
                            className={`${styles.dropdown} ${
                                dropdownCheckbox ? styles.dropdownVisible : styles.dropdownInvisible
                            }`}
                        >
                            <button
                                className={styles.logOutBtn}
                                onClick={logOutWithGoogle}
                                onMouseEnter={mouseEnterHandler}
                                onMouseLeave={mouseLeaveHandler}
                            >
                                Log Out
                                <ExitIcon className={styles.exitIcon} />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <button onClick={signInWithGoogle} className={styles.loginBtn}>
                    Sign in
                </button>
            )}
        </>
    )
}
