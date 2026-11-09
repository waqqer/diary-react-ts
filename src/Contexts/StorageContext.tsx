import type { Parent } from "@/Shared/Types/Component"
import type { Sheet } from "@/Shared/Types/Record"
import { createContext, useCallback, useEffect, useMemo, useState } from "react"

const storageKey = "record"

interface StorageValues {
    data: Sheet[],
    isLoaded: boolean,
    createEmptySheet: (title: string) => number
    removeSheetById: (id: number) => void
    renameSheetById: (id: number, name: string) => void
    appendRecordToSheet: (id: number, record: string) => Sheet | undefined
    getSheetById: (id: number) => Sheet | undefined
}

export const StorageContext = createContext<StorageValues>({
    data: [],
    isLoaded: false,
    createEmptySheet: (title: string) => title.length,
    removeSheetById: (id: number) => id,
    renameSheetById: (id: number, name: string) => id + name,
    appendRecordToSheet: () => undefined,
    getSheetById: () => undefined
})

export const StorageProvider = ({ children }: Parent) => {
    const [data, setData] = useState<Sheet[]>([])
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

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

    const createEmptySheet = useCallback((title: string): number => {
        const id = Date.now()
        setData(prev => [
            ...prev,
            {
                title: title,
                id,
                items: ["hello"]
            }
        ])
        return id
    }, [setData])

    const appendRecordToSheet = useCallback((id: number, record: string): Sheet | undefined => {
        setData(prev => {
            return prev.map(v => v.id === id ? { ...v, items: [...v.items, record] } : v)
        })

        return getSheetById(id)
    }, [setData, getSheetById])

    const removeSheetById = useCallback((id: number) => {
        setData(prev => prev.filter(v => v.id !== id))
    }, [setData])

    const renameSheetById = useCallback((id: number, name: string) => {
        setData(prev => {
            return prev.map(v => v.id === id ? { ...v, title: name } : v)
        })
    }, [setData])

    const values = useMemo(() => ({
        data,
        isLoaded,
        createEmptySheet,
        removeSheetById,
        renameSheetById,
        appendRecordToSheet,
        getSheetById
    }), [data, isLoaded, createEmptySheet, renameSheetById, removeSheetById, appendRecordToSheet, getSheetById])

    return (
        <StorageContext.Provider value={values}>
            {children}
        </StorageContext.Provider>
    )
}