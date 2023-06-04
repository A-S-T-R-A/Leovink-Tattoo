import { Main } from "widgets/Main/Main"
import { Steps } from "widgets/Steps/Steps"

export function HomePage() {
    return (
        <div>
            <Main />
            <Steps />
            <div style={{ height: "300vh" }}></div>
        </div>
    )
}
