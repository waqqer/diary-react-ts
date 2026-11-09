import type { Record } from "@/Shared/Types/Record"
import { memo } from "react"

interface RecordProps {
    record: Record
}

const Record = (props: RecordProps) => {
    const {
        record
    } = props

    return (
        <div>
            <h1>{record.type}</h1>
        </div>
    )
}

export default memo(Record)