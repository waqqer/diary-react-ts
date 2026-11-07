import { memo, useContext } from "react"
import styles from "./Layout.module.css"
import { StorageContext } from "@/Contexts/StorageContext"
import Sheet from "@/Components/Sheet"
import RecordViewer from "../RecordViewer"

const Layout = () => {
    const { data, createEmptySheet } = useContext(StorageContext)

    return (
        <div className={styles.layout}>
            <aside className={styles.side}>
                <h1>Menu</h1>

                <hr />

                <div className={styles.list}>
                    {data.map(v => (
                        <Sheet sheet={v} key={v.id} />
                    ))}
                    <hr />
                    <button onClick={() => createEmptySheet("New sheet")}>
                        <span>New sheet</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </aside>

            <RecordViewer className={styles.main} />
        </div>
    )
}

export default memo(Layout)