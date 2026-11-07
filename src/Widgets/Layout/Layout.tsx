import { memo } from "react"
import styles from "./Layout.module.css"

const controll_buttons: {text: string, sym: string, onclick?: () => void}[] = [
    {
        text: "New list",
        sym: "+"
    },
]

const Layout = () => {
    return (
        <div className={styles.layout}>
            <aside className={styles.side}>
                <h1>Menu</h1>

                <hr />

                <div className={styles.controlls}>
                    {controll_buttons.map(v => (
                        <button onClick={v.onclick}>
                            <span>{v.text}</span>
                            <span>{v.sym}</span>
                        </button>
                    ))}
                </div>

                <hr />
                
                <div>
                    
                </div>
            </aside>

            <main className={styles.main}>

            </main>
        </div>
    )
}

export default memo(Layout)