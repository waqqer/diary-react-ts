import type { Parent } from "@/Shared/Types/Component"
import type { Record, Sheet } from "@/Shared/Types/Record"
import { createContext, useCallback, useEffect, useMemo, useState } from "react"

const storageKey = "record"

interface StorageValues {
    current: Sheet | null,
    data: Sheet[],
    isLoaded: boolean,
    createSheet: (sheet: Sheet) => Sheet
    removeSheetById: (id: number) => void
    editSheetById: (id: number, change: (v: Sheet) => Sheet) => void
    getSheetById: (id: number) => Sheet | undefined,
    setSheetById: (id: number) => Sheet | undefined,
    appendRecord: (record: Record) => void,
}

export const StorageContext = createContext<StorageValues>({
    current: null,
    data: [],
    isLoaded: false,
    createSheet: (sheet: Sheet) => sheet,
    removeSheetById: () => undefined,
    editSheetById: () => undefined,
    getSheetById: () => undefined,
    setSheetById: () => undefined,
    appendRecord: () => undefined
})

export const StorageProvider = ({ children }: Parent) => {
    const [currentId, setCurrentId] = useState<number | null>(null)
    const [data, setData] = useState<Sheet[]>([])
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const current = data.find(sheet => sheet.id === currentId) ?? null

    useEffect(() => {
        const loaded: string | null = localStorage.getItem(storageKey)

        if (loaded == null) {
            setIsLoaded(true)
            setData([])
            return
        }

        try {
            const parsed = JSON.parse(loaded) as Sheet[]
            setData(parsed)
        } catch (er: any) {
            localStorage.removeItem(storageKey)
            setData([])
        }

        setIsLoaded(true)
    }, [])

    useEffect(() => {
        if (!isLoaded) return

        if (data.length == 0) {
            localStorage.removeItem(storageKey)
            return
        }

        localStorage.setItem(storageKey, JSON.stringify(data))
    }, [data])

    const getSheetById = useCallback((id: number): Sheet | undefined => {
        return data.find(v => v.id === id)
    }, [data])

    const setSheetById = useCallback((id: number): Sheet | undefined => {
        const sh = getSheetById(id)
        if (sh)
            setCurrentId(id)
        return sh
    }, [getSheetById])

    const createSheet = useCallback((sheet: Sheet): Sheet => {
        setData(prev => [...prev, sheet])
        setCurrentId(sheet.id)
        return sheet
    }, [])

    const removeSheetById = useCallback((id: number) => {
        if(current && current.id === id) {
            setCurrentId(null)
        }
        setData(prev => prev.filter(v => v.id !== id))
    }, [current])

    const editSheetById = useCallback((id: number, change: (v: Sheet) => Sheet) => {
        setData(prev => {
            return prev.map(v => v.id === id ? change(v) : v)
        })
    }, [])

    const appendRecord = useCallback((record: Record) => {
        if(current === null)
            return

        editSheetById(current.id, (v) => ({
            ...v,
            items: [...v.items, record]
        }))

    }, [current, editSheetById])

    const values = useMemo(() => ({
        current,
        data,
        isLoaded,
        createSheet,
        removeSheetById,
        editSheetById,
        getSheetById,
        setSheetById,
        appendRecord
    }), [current, data, isLoaded, createSheet, editSheetById, removeSheetById, getSheetById, setSheetById, appendRecord])

    return (
        <StorageContext.Provider value={values}>
            {children}
        </StorageContext.Provider>
    )
}
