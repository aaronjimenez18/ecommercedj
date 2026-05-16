export interface Product {
  id: string
  name: string
  desc: string
  price: number
  category: string
  tag: string | null
  amazon: boolean
  img: string
}

export interface CartItem {
  id: string
  name: string
  price: number
}
