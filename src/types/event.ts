


export interface Event {

    id: number,
    title: string,
    description: string,
    location: string,
    eventDate: string,
    category: string,
    isPublished: boolean

}


export interface session {
    id: number,
    eventId: number,
    startAt: number
    endAt: number,
    room: string

}


export interface PaginatedEvents {
    items: Event[]
    total: number
    page: number
    limit: number
    totalPage: number 

}