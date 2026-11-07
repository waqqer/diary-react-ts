import type { Parent } from "@/Shared/Types/Component"
import type { Sheet } from "@/Shared/Types/Record"
import { createContext, useCallback, useEffect, useMemo, useState } from "react"

const storageKey = "record"

interface StorageValues {
    data: Sheet[],
    isLoaded: boolean,
    createEmptySheet: (title: string) => void,
    removeSheetById: (id: number) => void,
}

export const StorageContext = createContext<StorageValues>({
    data: [],
    isLoaded: false,
    createEmptySheet: (title: string) => title,
    removeSheetById: (id: number) => id
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
        if(!isLoaded) return

        if (data.length == 0) {
            localStorage.removeItem(storageKey)
            return
        }

        localStorage.setItem(storageKey, JSON.stringify(data))
    }, [data])

    const createEmptySheet = useCallback((title: string) => {
        setData(prev => [
            ...prev,
            {
                title: title,
                id: Date.now(),
                items: []
            }
        ])
    }, [])

    const removeSheetById = useCallback((id: number) => {
        setData(prev => prev.filter(v => v.id !== id))
    }, [])

    const values = useMemo(() => ({
        data,
        isLoaded,
        createEmptySheet,
        removeSheetById
    }), [data, isLoaded, createEmptySheet])

    return (
        <StorageContext.Provider value={values}>
            {children}
        </StorageContext.Provider>
    )
}