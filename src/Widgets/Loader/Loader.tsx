import { memo, type ReactNode } from "react"
import type { Parent } from "@/Shared/Types/Component"
import styles from "./Loader.module.css"
import type { LoadingState } from "@/Shared/Types/Record"

interface LoaderProps extends Parent {
    status: LoadingState
    isOK: ReactNode
    isErr: ReactNode
}

const Loader = (props: LoaderProps) => {
    const {
        children,
        status = "LOADING",
        isErr,
        isOK
    } = props

    if (status != "LOADING") {
        return status === "OK" ? isOK : isErr
    }

    return (
        <div className={styles.loader}>
            {children ?? (
                <div className={styles.icon}>
                    <div className={styles["inner-icon"]}>
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(Loader)