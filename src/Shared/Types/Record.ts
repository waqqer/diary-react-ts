export interface Sheet {
    title: string
    creationDate: Date
    items: string[]
}

export interface Record {
    type: "TEXT"
    content: string
}