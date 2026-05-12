import { createContext, useContext } from 'react'
import { ItemCarrinho, Produto } from '../types'

export type CartData = {
  items: ItemCarrinho[]
  total: number
  totalItens: number
  addItem: (produto: Produto) => void
  removeItem: (idProduto: number) => void
  increaseItem: (idProduto: number) => void
  decreaseItem: (idProduto: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartData>({
  items: [],
  total: 0,
  totalItens: 0,
  addItem: () => {},
  removeItem: () => {},
  increaseItem: () => {},
  decreaseItem: () => {},
  clearCart: () => {},
})

export const useCartContext = () => useContext(CartContext)
