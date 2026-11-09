export interface Sheet {
    title: string
    id: number
    items: Record[]
}

export interface Record {
    type: RecordType
    content: any
}

export type RecordType = "TEXT" | "SEPARATOR" | "HEADER" | "PARAGRAPH" | "LIST" | "LINK" | "CHECKLIST"

export interface LinkContent {
    url: string
    label: string
}

export interface ChecklistItem {
    text: string
    checked: boolean
}

export type LoadingState = "LOADING" | "ERROR" | "OK"
