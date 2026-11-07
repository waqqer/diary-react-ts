import type { Parent } from "@/Shared/Types/Component"
import type { Sheet } from "@/Shared/Types/Record"
import { createContext, useEffect, useMemo, useRef, useState } from "react"

const storageKey = "record"

interface StorageValues {
    data: Sheet[],
    isLoaded: boolean
}

export const StorageContext = createContext<StorageValues>({
    data: [],
    isLoaded: false
})

export const StorageProvider = ({ children }: Parent) => {
    const [data, setData] = useState<Sheet[]>([])
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    useEffect(() => {
        const loaded: string | null = localStorage.getItem(storageKey)

        if(loaded == null) {
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

    const values = useMemo(() => ({
        data,
        isLoaded
    }), [data, isLoaded])

    return (
        <StorageContext.Provider value={values}>
            {children}
        </StorageContext.Provider>
    )
}