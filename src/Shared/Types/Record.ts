export interface Sheet {
    title: string
    id: number
    items: Record[]
}

export interface Record {
    type: RecordType
    content: any
}

export type RecordType = "TEXT" | "SEPARATOR" | "HEADER" | "PARAGRAPH" | "LIST"

export type LoadingState = "LOADING" | "ERROR" | "OK"