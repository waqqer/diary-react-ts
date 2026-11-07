import type { Parent } from "@/Shared/Types/Component"
import type { Sheet } from "@/Shared/Types/Record"
import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { StorageContext } from "./StorageContext"

interface SheetContextValues {
    sheet: Sheet | null,
    changeSheet: (sheet: Sheet) => void
    changeSheetById: (id: number) => void
    deleteSheetById: (id: number) => void
}

export const SheetContext = createContext<SheetContextValues>({
    sheet: null,
    changeSheet: (sheet: Sheet) => sheet,
    changeSheetById: (id: number) => id,
    deleteSheetById: (id: number) => id,
})

export const SheetProvider = ({ children }: Parent) => {
    const [sheet, setSheet] = useState<Sheet | null>(null)

    const { data, removeSheetById } = useContext(StorageContext)

    const changeSheet = useCallback((sheet: Sheet) => {
        setSheet(sheet)
    }, [])

    const changeSheetById = useCallback((id: number) => {
        if(data.length === 0) return
        
        const sh = data.find((v) => v.id === id)
        if(sh !== undefined) {
            setSheet(sh)
        }
    }, [data])

    const deleteSheetById = useCallback((id: number) => {
        removeSheetById(id)
        setSheet(null)
    }, [removeSheetById])

    const values = useMemo(() => ({
        sheet,
        changeSheet,
        deleteSheetById,
        changeSheetById
    }), [sheet, changeSheet, deleteSheetById, changeSheetById])

    return (
        <SheetContext.Provider value={values}>
            {children}
        </SheetContext.Provider>
    )
}