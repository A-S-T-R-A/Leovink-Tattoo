import { Alert, Confirm } from "shared/ui/CustomNotifications"

export function DevPage() {
    async function saveClickHandler() {
        const isConfirmed = await Confirm("Are you sure you want to delete selected images?")
        if (isConfirmed) {
            return
        }
    }
    return (
        <div>
            Dev Page
            <button onClick={() => Alert.error("Something goes wrong...")}>click err</button>
            <button onClick={() => Alert.warning("oh, are u sure?")}>click war</button>
            <button onClick={() => Alert.success("everything is ok")}>click suc</button>
            <button onClick={() => Alert.info("some information")}>click info</button>
            <button onClick={saveClickHandler}>click info</button>
        </div>
    )
}
