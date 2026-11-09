import type { ChecklistItem, LinkContent, Record as RecordData } from "@/Shared/Types/Record"
import { memo } from "react"
import styles from "./Record.module.css"

interface RecordProps {
    record: RecordData
    onChange?: (content: ChecklistItem[]) => void
    onDelete?: () => void
}

const safeHref = (url: string) => {
    const trimmed = url.trim()
    if (/^(https?:|mailto:)/i.test(trimmed)) return trimmed
    if (/^[a-z][a-z\d+.-]*:/i.test(trimmed)) return "#"
    return `https://${trimmed}`
}

const RecordView = ({ record, onChange }: RecordProps) => {
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
        case "CHECKLIST":
            return Array.isArray(record.content) ? (
                <ul className={styles.checklist}>
                    {(record.content as ChecklistItem[]).map((item, index) => (
                        <li className={item.checked ? styles.checked : ""} key={index}>
                            <input
                                type="checkbox"
                                checked={item.checked}
                                aria-label={`Mark ${item.text} ${item.checked ? "incomplete" : "complete"}`}
                                onChange={() => onChange?.(record.content.map((task: ChecklistItem, taskIndex: number) => taskIndex === index ? { ...task, checked: !task.checked } : task))}
                            />
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>
            ) : null
        default:
            return null
    }
}

const Record = ({ record, onChange, onDelete }: RecordProps) => {
    const label = record.type === "LIST"
        ? "List"
        : record.type === "PARAGRAPH"
            ? "Paragraph"
            : record.type === "LINK"
                ? "Link"
                : record.type === "CHECKLIST"
                    ? "Checklist"
                : null

    return (
        <div className={`${styles.record} ${label ? styles.labeled : ""}`}>
            <button
                className={styles.removeRecord}
                type="button"
                aria-label={`Delete ${record.type.toLowerCase()} record`}
                title="Delete record"
                onClick={event => {
                    event.stopPropagation()
                    onDelete?.()
                }}
            >
                ×
            </button>
            {label && <div className={styles.typeLabel}>{label}</div>}
            <RecordView record={record} onChange={onChange} />
        </div>
    )
}

export default memo(Record)
