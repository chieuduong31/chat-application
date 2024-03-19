export interface Reader {
  id: string
  name: string
  isOnline: boolean
  price: number
  rate: number
  avatar?: string
}

export interface Message {
  from: string
  to: string
  msg: string
}
