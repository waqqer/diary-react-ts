import type { LinkContent, Record as RecordData } from "@/Shared/Types/Record"
import { memo } from "react"
import styles from "./Record.module.css"

interface RecordProps {
    record: RecordData
}

const safeHref = (url: string) => {
    const trimmed = url.trim()
    if (/^(https?:|mailto:)/i.test(trimmed)) return trimmed
    if (/^[a-z][a-z\d+.-]*:/i.test(trimmed)) return "#"
    return `https://${trimmed}`
}

const RecordView = ({ record }: RecordProps) => {
    switch (record.type) {
        case "TEXT":
            return <p className={styles.text}>{record.content}</p>
        case "PARAGRAPH":
            return <p className={styles.paragraph}>{record.content}</p>
        case "HEADER":
            return <h2 className={styles.header}>{record.content}</h2>
        case "SEPARATOR":
            return <hr className={styles.separator} />
        case "LIST":
            return Array.isArray(record.content) ? (
                <ul className={styles.list}>{record.content.map((item: string, index: number) => <li key={index}>{item}</li>)}</ul>
            ) : null
        case "LINK": {
            const content = record.content as LinkContent
            if (!content?.url) return null
            return <a className={styles.link} href={safeHref(content.url)} target="_blank" rel="noreferrer">{content.label || content.url}</a>
        }
        default:
            return null
    }
}

const Record = ({ record }: RecordProps) => {
    const label = record.type === "LIST"
        ? "List"
        : record.type === "PARAGRAPH"
            ? "Paragraph"
            : record.type === "LINK"
                ? "Link"
                : null

    return (
        <div className={`${styles.record} ${label ? styles.labeled : ""}`}>
            {label && <div className={styles.typeLabel}>{label}</div>}
            <RecordView record={record} />
        </div>
    )
}

export default memo(Record)
