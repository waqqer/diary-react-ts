import type { Record } from "@/Shared/Types/Record"
import { memo } from "react"

interface RecordProps {
    record: Record
}

const ProccessData = (record: Record) => {
    switch (record.type) {
        case "TEXT":
            return <p>{record.content}</p>
        case "PARAGRAPH":
            return <p>{record.content}</p>
        case "HEADER":
            return <h1>{record.content}</h1>
        case "SEPARATOR":
            return <hr />
        case "LIST":
            if (Array.isArray(record.content)) {
                return (
                    <ul>
                        {record.content.map(v => {
                            return <li>{v}</li>
                        })}
                    </ul>
                )
            }
    }
}

const Record = (props: RecordProps) => {
    const {
        record
    } = props

    return (
        <div>
            {ProccessData(record)}
        </div>
    )
}

export default memo(Record)