export interface Event {
    id?: string
    title: string
    description: string
    date: Date
    createdBy: string
    photographers: string[]
    photos?: string[]
}