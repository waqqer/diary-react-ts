import type { Parent } from "@/Shared/Types/Component"
import type { Sheet } from "@/Shared/Types/Record"
import { createContext, useEffect, useMemo, useRef, useState } from "react"

const storageKey = "record"

export const StorageContext = createContext({})

export const StorageProvider = ({ children }: Parent) => {
    const data = useRef<Sheet[]>([])
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    useEffect(() => {
        if(isLoaded) return
        
        const loaded: string | null = localStorage.getItem(storageKey)

        if(loaded == null) {
            data.current = []
            setIsLoaded(true)
            return
        }

        try {
            const parsed = JSON.parse(loaded) as Sheet[]
            data.current = parsed
        } catch (er: any) {
            localStorage.removeItem(storageKey)
            data.current = []
        }

        setIsLoaded(true)
    }, [])

    const values = useMemo(() => ({
        data,
        isLoaded
    }), [isLoaded])

    return (
        <StorageContext.Provider value={values}>
            {children}
        </StorageContext.Provider>
    )
}