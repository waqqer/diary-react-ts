import { memo, useCallback, useContext, useEffect, useState, type FormEvent } from "react"
import styles from "./AddRecord.module.css"
import type { LinkContent, RecordType } from "@/Shared/Types/Record"
import { StorageContext } from "@/Contexts/StorageContext"

type AddRecordState = "TEXT" | "CHOOSE" | "ENTER"

const recordTypes: { type: RecordType; label: string }[] = [
    { type: "TEXT", label: "Text" },
    { type: "SEPARATOR", label: "Separator" },
    { type: "HEADER", label: "Header" },
    { type: "PARAGRAPH", label: "Paragraph" },
    { type: "LIST", label: "List" },
    { type: "LINK", label: "Link" },
]

type RecordContent = string | string[] | LinkContent

const RecordEnter = memo((props: { type: RecordType; onSubmit: (content: RecordContent) => void; onCancel: () => void }) => {
    const { type, onSubmit, onCancel } = props
    const [content, setContent] = useState("")
    const [items, setItems] = useState([""])
    const [url, setUrl] = useState("")
    const [label, setLabel] = useState("")

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const value = type === "LINK"
            ? { url: url.trim(), label: label.trim() }
            : type === "LIST"
            ? items.map(item => item.trim()).filter(Boolean)
            : content.trim()

        if (type === "LINK" && !url.trim()) return
        if ((Array.isArray(value) && value.length === 0) || value === "") return
        onSubmit(value)
    }

    return (
        <form className={styles.input} onSubmit={submit} onClick={event => event.stopPropagation()}>
            {type === "LINK" ? (
                <div className={styles.linkFields}>
                    <input
                        autoFocus
                        type="url"
                        required
                        aria-label="Link URL"
                        placeholder="https://example.com"
                        value={url}
                        onChange={event => setUrl(event.target.value)}
                    />
                    <input
                        aria-label="Link text (optional)"
                        placeholder="Link text (optional)"
                        value={label}
                        onChange={event => setLabel(event.target.value)}
                    />
                </div>
            ) : type === "PARAGRAPH" ? (
                <textarea
                    autoFocus
                    aria-label="Paragraph text"
                    placeholder="Enter paragraph"
                    value={content}
                    onChange={event => setContent(event.target.value)}
                />
            ) : type === "LIST" ? (
                <div className={styles.listItems}>
                    {items.map((item, index) => (
                        <div className={styles.listItem} key={index}>
                            <span className={styles.bullet} aria-hidden="true">•</span>
                            <input
                                autoFocus={index === 0}
                                aria-label={`List item ${index + 1}`}
                                placeholder={`List item ${index + 1}`}
                                value={item}
                                onChange={event => setItems(current => current.map((value, i) => i === index ? event.target.value : value))}
                            />
                            {items.length > 1 && (
                                <button className={styles.removeItem} type="button" aria-label={`Remove item ${index + 1}`} onClick={() => setItems(current => current.filter((_, i) => i !== index))}>×</button>
                            )}
                        </div>
                    ))}
                    <button className={styles.addItem} type="button" onClick={() => setItems(current => [...current, ""])}>
                        + Add item
                    </button>
                </div>
            ) : (
                <input
                    autoFocus
                    aria-label={type === "HEADER" ? "Header text" : "Text"}
                    placeholder={type === "HEADER" ? "Enter header" : "Enter text"}
                    value={content}
                    onChange={event => setContent(event.target.value)}
                />
            )}
            <div className={styles.actions}>
                <button type="submit">Add</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
})

const AddRecord = () => {
    const [state, setState] = useState<AddRecordState>("TEXT")
    const [chosen, setChosen] = useState<RecordType>("TEXT")
    const { current, appendRecord } = useContext(StorageContext)

    const reset = useCallback(() => setState("TEXT"), [])

    useEffect(() => {
        reset()
    }, [current?.id, reset])

    const chooseType = (type: RecordType) => {
        setChosen(type)
        if (type === "SEPARATOR") {
            appendRecord({ type, content: null })
            reset()
            return
        }
        setState("ENTER")
    }

    const addRecord = (content: RecordContent) => {
        appendRecord({ type: chosen, content })
        reset()
    }

    return (
        <div className={styles.add} onClick={() => {
            if (state === "TEXT") setState("CHOOSE")
        }}>
            {state === "TEXT" && <span className={styles.text}>New record</span>}

            {state === "CHOOSE" && (
                <div className={styles.controls} onClick={event => event.stopPropagation()}>
                    {recordTypes.map(({ type, label }) => (
                        <button key={type} type="button" onClick={() => chooseType(type)}>{label}</button>
                    ))}
                </div>
            )}

            {state === "ENTER" && <RecordEnter type={chosen} onSubmit={addRecord} onCancel={reset} />}
        </div>
    )
}

export default memo(AddRecord)
