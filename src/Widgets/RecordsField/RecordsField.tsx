import type { Classable } from "@/Shared/Types/Component"
import type { Record as RecordData } from "@/Shared/Types/Record"
import { memo, useContext, useLayoutEffect, useRef, useState, type PointerEvent } from "react"
import styles from "./RecordsField.module.css"
import Record from "@/Components/Record"
import { StorageContext } from "@/Contexts/StorageContext"
import AddRecord from "@/Components/AddRecord"

interface RecordsFieldProps extends Classable {}

const RecordsField = (props: RecordsFieldProps) => {
    const { className = "" } = props
    const { current, editSheetById } = useContext(StorageContext)
    const [draggedRecord, setDraggedRecord] = useState<RecordData | null>(null)
    const draggedRecordRef = useRef<RecordData | null>(null)
    const [dragOrder, setDragOrder] = useState<RecordData[] | null>(null)
    const dragOrderRef = useRef<RecordData[] | null>(null)
    const recordKeys = useRef(new WeakMap<RecordData, string>())
    const nextKey = useRef(0)
    const rowElements = useRef(new Map<string, HTMLDivElement>())
    const previousPositions = useRef<Map<string, number> | null>(null)

    const getRecordKey = (record: RecordData) => {
        let key = recordKeys.current.get(record)
        if (!key) {
            key = `record-${nextKey.current++}`
            recordKeys.current.set(record, key)
        }
        return key
    }

    const moveRecord = (event: PointerEvent<HTMLDivElement>) => {
        const record = draggedRecordRef.current
        if (!record || !dragOrderRef.current) return
        event.preventDefault()

        const order = dragOrderRef.current
        const fromIndex = order.indexOf(record)
        const targetIndex = order
            .filter(item => item !== record)
            .filter(item => {
                const row = rowElements.current.get(getRecordKey(item))
                if (!row) return false
                const bounds = row.getBoundingClientRect()
                return event.clientY > bounds.top + bounds.height / 2
            }).length
        if (fromIndex < 0 || targetIndex < 0 || fromIndex === targetIndex) return

        const positions = new Map<string, number>()
        order.forEach(item => {
            const key = getRecordKey(item)
            const row = rowElements.current.get(key)
            if (row) positions.set(key, row.getBoundingClientRect().top)
        })
        previousPositions.current = positions
        const next = [...order]
        const [moving] = next.splice(fromIndex, 1)
        next.splice(targetIndex, 0, moving)
        dragOrderRef.current = next
        setDragOrder(next)
    }

    useLayoutEffect(() => {
        const positions = previousPositions.current
        if (!positions || !dragOrder) return
        dragOrder.forEach(record => {
            const key = getRecordKey(record)
            const row = rowElements.current.get(key)
            const beforeTop = positions.get(key)
            if (!row || beforeTop === undefined) return
            const deltaY = beforeTop - row.getBoundingClientRect().top
            if (Math.abs(deltaY) < 1) return
            row.getAnimations().forEach(animation => animation.cancel())
            row.animate(
                [{ transform: `translateY(${deltaY}px)` }, { transform: "translateY(0)" }],
                { duration: 220, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }
            )
        })
        previousPositions.current = null
    }, [dragOrder])

    const endDrag = () => {
        const order = dragOrderRef.current
        if (current && order && draggedRecord) {
            editSheetById(current.id, sheet => ({ ...sheet, items: order }))
        }
        dragOrderRef.current = null
        draggedRecordRef.current = null
        setDragOrder(null)
        setDraggedRecord(null)
    }

    const beginDrag = (event: PointerEvent<HTMLDivElement>, record: RecordData) => {
        if (event.button !== 0 || !current) return
        event.preventDefault()
        const order = [...current.items]
        dragOrderRef.current = order
        draggedRecordRef.current = record
        setDragOrder(order)
        setDraggedRecord(record)
        event.currentTarget.parentElement?.setPointerCapture(event.pointerId)
    }

    const records = dragOrder ?? current?.items ?? []

    return (
        <div className={`${styles.field} ${className}`} onPointerMove={moveRecord} onPointerUp={endDrag} onPointerCancel={endDrag}>
            {records.map(record => (
                <div
                    className={`${styles.draggable} ${draggedRecord === record ? styles.dragging : ""}`}
                    key={getRecordKey(record)}
                    ref={element => {
                        const key = getRecordKey(record)
                        if (element) rowElements.current.set(key, element)
                        else rowElements.current.delete(key)
                    }}
                    onPointerDown={event => beginDrag(event, record)}
                >
                    <Record record={record} />
                </div>
            ))}
            <AddRecord />
        </div>
    )
}

export default memo(RecordsField)
