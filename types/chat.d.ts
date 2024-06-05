export interface Chat {
    id: string
    title: string
    updateTime: number
}

export interface Message {
    id: string
    role: "user" | "system"
    content: string
    chatId: string
}

export interface MessageRequestBody {
    messages: Message[]
    model: string
}