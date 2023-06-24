import "./index.scss"
import { Sidebar } from "widgets/Sidebar"
import { Route, Routes } from "react-router-dom"
import { PortfolioPage } from "pages/PortfolioPage"
import { Header } from "widgets/Header/Header"
import { RequireAuth } from "features/authByGoogle"
import { StepsPage } from "pages/StepsPage"
import { ServicesPage } from "pages/ServicesPage"
import { ReviewsPage } from "pages/ReviewPage"
import { FAQPage } from "pages/FAQPage"
import { OtherPage } from "pages/OtherPage"
import { ContactsPage } from "pages/ContactPage/ui/ContactsPage"
import { ArtistsPage } from "pages/ArtistsPage"
import { alert } from "shared/ui/Alert"

function App() {
    return (
        <div className="app">
            <Sidebar />
            <Header />
            <div className="page-wrapper">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                Home
                                <button onClick={() => alert.error("Something goes wrong...")}>
                                    click err
                                </button>
                                <button onClick={() => alert.warning("oh, are u sure?")}>
                                    click war
                                </button>
                                <button onClick={() => alert.success("everything is ok")}>
                                    click suc
                                </button>
                                <button onClick={() => alert.info("some information")}>
                                    click info
                                </button>
                            </div>
                        }
                    />
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
                        path="/reviews"
                        element={
                            <RequireAuth>
                                <ReviewsPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/artists"
                        element={
                            <RequireAuth>
                                <ArtistsPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/faq"
                        element={
                            <RequireAuth>
                                <FAQPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/contacts"
                        element={
                            <RequireAuth>
                                <ContactsPage />
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
