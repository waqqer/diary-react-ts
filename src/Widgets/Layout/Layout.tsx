import { memo, useContext, useState } from "react"
import styles from "./Layout.module.css"
import { StorageContext } from "@/Contexts/StorageContext"
import Sheet from "@/Components/Sheet"
import RecordViewer from "../RecordViewer"

const Layout = () => {
    const { data, createSheet } = useContext(StorageContext)
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className={styles.layout}>
            <button
                className={styles.menuToggle}
                type="button"
                aria-label={menuOpen ? "Close sheets menu" : "Open sheets menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(open => !open)}
            >
                {menuOpen ? "Close" : "Sheets"}
            </button>
            {menuOpen && <button className={styles.backdrop} aria-label="Close sheets menu" onClick={() => setMenuOpen(false)} />}
            <aside className={`${styles.side} ${menuOpen ? styles.sideOpen : ""}`}>
                <h1>Menu</h1>

                <hr />

                <div className={styles.list}>
                    {data.map(v => (
                        <Sheet sheet={v} key={v.id} onSelect={() => setMenuOpen(false)} />
                    ))}
                    <hr />
                    <button onClick={() => {
                        createSheet({
                        title: "New sheet",
                        id: Date.now(),
                        items: []
                        })
                        setMenuOpen(false)
                    }}>
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
