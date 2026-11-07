import { memo } from "react"
import styles from "./CreateLayout.module.css"

const CreateLayout = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.form}>
                <div className={styles.info}>
                    <h1 className={styles.head}>
                        <span>Your</span>
                        <span>first</span>
                        <span>Sheet</span>
                        <span>starts</span>
                        <span>here!</span>
                    </h1>
                    <h3 className={styles.sub}>A Sheet is where your data lives. Create one to begin.</h3>
                </div>

                <button className={styles.btn}>Get started</button>
            </div>
        </div>
    )
}

export default memo(CreateLayout)