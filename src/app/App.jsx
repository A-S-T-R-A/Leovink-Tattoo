import { Route, Routes } from "react-router"
import { MainPage } from "../pages/MainPage/MainPage"

export function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
        </div>
    )
}
