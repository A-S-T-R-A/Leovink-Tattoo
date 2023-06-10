import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app/App.js"
import { BrowserRouter } from "react-router-dom"
import { AuthContextProvider } from "features/authByGoogle"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
)
