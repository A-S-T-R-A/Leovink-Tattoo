import { BrowserRouter } from "react-router-dom"
import ReactDOM from "react-dom/client"
import { App } from "./app/App"
import "./app/index.scss"

const root = document.getElementById("root") as HTMLElement
ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
