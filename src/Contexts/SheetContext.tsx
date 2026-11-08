import type { Parent } from "@/Shared/Types/Component"
import type { Sheet } from "@/Shared/Types/Record"
import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { StorageContext } from "./StorageContext"

interface SheetContextValues {
    sheet: Sheet | null,
    changeSheet: (sheet: Sheet) => void
    changeSheetById: (id: number) => void
    deleteSheetById: (id: number) => void
    changeSheetToNull: () => void
}

export const SheetContext = createContext<SheetContextValues>({
    sheet: null,
    changeSheet: (sheet: Sheet) => sheet,
    changeSheetById: (id: number) => id,
    deleteSheetById: (id: number) => id,
    changeSheetToNull: () => null
})

export const SheetProvider = ({ children }: Parent) => {
    const [sheet, setSheet] = useState<Sheet | null>(null)

    const { data, removeSheetById } = useContext(StorageContext)

    const changeSheet = useCallback((sheet: Sheet) => {
        setSheet(sheet)
    }, [setSheet])

    const changeSheetToNull = useCallback(() => {
        setSheet(null)
    }, [setSheet])

    const changeSheetById = useCallback((id: number) => {
        if(data.length === 0) return
        
        const sh = data.find((v) => v.id === id)
        if(sh !== undefined) {
            setSheet(sh)
        }
    }, [data, setSheet])

    const deleteSheetById = useCallback((id: number) => {
        removeSheetById(id)
        setSheet(null)
    }, [removeSheetById, setSheet])

    const values = useMemo(() => ({
        sheet,
        changeSheet,
        deleteSheetById,
        changeSheetById,
        changeSheetToNull
    }), [sheet, changeSheet, deleteSheetById, changeSheetById, changeSheetToNull])

    return (
        <SheetContext.Provider value={values}>
            {children}
        </SheetContext.Provider>
    )
}