import { AppLink } from "shared/ui/AppLink/AppLink"
import { Typography } from "shared/ui/Typography/Typography"

export function HomePage() {
    return (
        <div>
            <Typography>Hello World</Typography>
            <AppLink to={"www.google.com"}>CLIKC</AppLink>
        </div>
    )
}
