import { memo } from "react"

interface RecordProps {
    record: string
}

const Record = (props: RecordProps) => {
    const {
        record
    } = props

    return (
        <div>
            <h1>{record}</h1>
        </div>
    )
}

export default memo(Record)