import { LOCAL_STORAGE_PORTFOLIO_VIEW } from "../const/localStorageConst"
import { ViewType } from "../types/types"

export const localStorageView = {
    get(): ViewType | null {
        return localStorage.getItem(LOCAL_STORAGE_PORTFOLIO_VIEW) as ViewType
    },
    set(view: ViewType) {
        localStorage.setItem(LOCAL_STORAGE_PORTFOLIO_VIEW, view)
    },
}
