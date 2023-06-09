import "./index.scss"
import { Sidebar } from "widgets/Sidebar"
import { Route, Routes } from "react-router-dom"
import { PortfolioPage } from "pages/PortfolioPage"

function App() {
    return (
        <div className="app">
            <Sidebar />
            <div className="page-wrapper">
                <Routes>
                    <Route path="/" element={<div>Home</div>} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
