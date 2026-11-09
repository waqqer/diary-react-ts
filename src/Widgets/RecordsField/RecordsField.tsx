import type { Classable } from "@/Shared/Types/Component"
import { memo, useContext } from "react"
import styles from "./RecordsField.module.css"
import { SheetContext } from "@/Contexts/SheetContext"
import Record from "@/Components/Record"

interface RecordsFieldProps extends Classable {

}

const RecordsField = (props: RecordsFieldProps) => {
    const {
        className = ""
    } = props

    const { sheet, appendRecord, reloadSheet } = useContext(SheetContext)

    return (
        <div className={`${styles.field} ${className}`}>
            {sheet?.items.map((v,i) => <Record record={v} key={i}/>)}
            
            <button className={styles.add} onClick={() => {
                appendRecord("Hello")
                reloadSheet()
            }}>
                Create new record
            </button>
        </div>
    )
}

export default memo(RecordsField)