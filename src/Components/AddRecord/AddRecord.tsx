import { memo, useCallback, useContext, useState, type FormEvent } from "react"
import styles from "./AddRecord.module.css"
import type { RecordType } from "@/Shared/Types/Record"
import { StorageContext } from "@/Contexts/StorageContext"

type AddRecordState = "TEXT" | "CHOOSE" | "ENTER"

const recordTypes: { type: RecordType; label: string }[] = [
    { type: "TEXT", label: "Text" },
    { type: "SEPARATOR", label: "Separator" },
    { type: "HEADER", label: "Header" },
    { type: "PARAGRAPH", label: "Paragraph" },
    { type: "LIST", label: "List" },
]

const RecordEnter = memo((props: { type: RecordType; onSubmit: (content: string | string[]) => void; onCancel: () => void }) => {
    const { type, onSubmit, onCancel } = props
    const [content, setContent] = useState("")
    const isMultiline = type === "PARAGRAPH" || type === "LIST"

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const value = type === "LIST"
            ? content.split("\n").map(item => item.trim()).filter(Boolean)
            : content.trim()

        if ((Array.isArray(value) && value.length === 0) || value === "") return
        onSubmit(value)
    }

    return (
        <form className={styles.input} onSubmit={submit} onClick={event => event.stopPropagation()}>
            {isMultiline ? (
                <textarea
                    autoFocus
                    aria-label={type === "LIST" ? "List items, one per line" : "Paragraph text"}
                    placeholder={type === "LIST" ? "One item per line" : "Enter paragraph"}
                    value={content}
                    onChange={event => setContent(event.target.value)}
                />
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
    const { appendRecord } = useContext(StorageContext)

    const reset = useCallback(() => setState("TEXT"), [])

    const chooseType = (type: RecordType) => {
        setChosen(type)
        if (type === "SEPARATOR") {
            appendRecord({ type, content: null })
            reset()
            return
        }
        setState("ENTER")
    }

    const addRecord = (content: string | string[]) => {
        appendRecord({ type: chosen, content })
        reset()
    }

    return (
        <div className={styles.add} onClick={() => {
            if (state === "TEXT") setState("CHOOSE")
        }} onMouseLeave={reset}>
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
