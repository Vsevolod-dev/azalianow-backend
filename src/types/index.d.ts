interface Message {
    id: number;
    text: string;
    author: string;
}
  
export interface File {
    messages?: Message[]
    numbers?: number[]
}

export interface NumbersResponse {
    current: number
    prev: number
    average: number
}