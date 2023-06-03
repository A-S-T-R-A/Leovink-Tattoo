import { Main } from "widgets/Main/Main"
import { Portfolio } from "widgets/Portfolio/Portfolio"

export function HomePage() {
    return (
        <div>
            <Main />
            <Portfolio />
            <div style={{ height: "300vh" }}></div>
        </div>
    )
}
