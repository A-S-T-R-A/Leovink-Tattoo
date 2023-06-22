import "./index.scss"
import { Sidebar } from "widgets/Sidebar"
import { Route, Routes } from "react-router-dom"
import { PortfolioPage } from "pages/PortfolioPage"
import { Header } from "widgets/Header/Header"
import { RequireAuth } from "features/authByGoogle"
import { StepsPage } from "pages/StepsPage"
import { ServicesPage } from "pages/ServicesPage"
import { ReviewPage } from "pages/ReviewPage/ui/ReviewPage"
import { OtherPage } from "pages/OtherPage"

function App() {
    return (
        <div className="app">
            <Sidebar />
            <Header />
            <div className="page-wrapper">
                <Routes>
                    <Route path="/" element={<div>Home</div>} />
                    <Route
                        path="/portfolio"
                        element={
                            <RequireAuth>
                                <PortfolioPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/steps"
                        element={
                            <RequireAuth>
                                <StepsPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/services"
                        element={
                            <RequireAuth>
                                <ServicesPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/review"
                        element={
                            <RequireAuth>
                                <ReviewPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/other"
                        element={
                            <RequireAuth>
                                <OtherPage />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </div>
        </div>
    )
}

export default App
