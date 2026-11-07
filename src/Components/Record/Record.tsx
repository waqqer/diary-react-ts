import { memo } from "react"
import type { Classable, Parent } from "@/Shared/Types/Component"
import type { Record } from "@/Shared/Types/Record"

interface RecordProps extends Classable, Parent {
    record: Record
}

const Record = () => {
    return (
        <div>

        </div>
    )
}

export default memo(Record)