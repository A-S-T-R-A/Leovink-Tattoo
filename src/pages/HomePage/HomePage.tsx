import { Artists } from "widgets/Artists/Artists"
import { Main } from "widgets/Main/Main"
import { Portfolio } from "widgets/Portfolio/Portfolio"

export function HomePage() {
    return (
        <div>
            <Main />
            <Portfolio />
            <Artists />
            <div style={{ height: "300vh" }}></div>
        </div>
    )
}
