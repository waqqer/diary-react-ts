export interface Sheet {
    title: string
    id: number
    items: string[]
}

export interface Record {
    type: "TEXT"
    content: string
}

export type LoadingState = "LOADING" | "ERROR" | "OK"