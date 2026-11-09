import type { Classable } from "@/Shared/Types/Component"
import { memo, useContext } from "react"
import styles from "./RecordsField.module.css"
import Record from "@/Components/Record"
import { StorageContext } from "@/Contexts/StorageContext"

interface RecordsFieldProps extends Classable {

}

const RecordsField = (props: RecordsFieldProps) => {
    const {
        className = ""
    } = props

    const { current } = useContext(StorageContext)

    return (
        <div className={`${styles.field} ${className}`}>
            {current?.items.map((v,i) => <Record record={v} key={i}/>)}
            
            <button className={styles.add} onClick={() => {
            }}>
                Create new record
            </button>
        </div>
    )
}

export default memo(RecordsField)