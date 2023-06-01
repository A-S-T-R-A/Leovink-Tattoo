import { Route, Routes } from "react-router"
import { HomePage, FAQPage, ContactPage, PortfolioPage, TestimonialsPage, ArtistPage } from "pages"

export function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/artist" element={<ArtistPage />} />
            </Routes>
        </div>
    )
}
