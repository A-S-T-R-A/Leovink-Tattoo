import { Route, Routes } from "react-router"
import { HomePage, FAQPage, ContactPage, PortfolioPage, TestimonialsPage, ArtistPage } from "pages"
import { Header } from "widgets/Header"
import { Footer } from "widgets/Footer/Footer"

export function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/artist" element={<ArtistPage />} />
            </Routes>
            <Footer />
        </div>
    )
}
