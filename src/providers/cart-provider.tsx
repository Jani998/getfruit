import { PropsWithChildren, useMemo, useState } from 'react'
import { CartContext } from '../hooks/use-cart-context'
import { ItemCarrinho, Produto } from '../types'

export default function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<ItemCarrinho[]>([])

  const addItem = (produto: Produto) => {
    setItems((prev) => {
      const index = prev.findIndex((item) => item.id_produto === produto.id_produto)
      if (index !== -1) {
        return prev.map((item) =>
          item.id_produto === produto.id_produto
            ? { ...item, quantidadeCarrinho: item.quantidadeCarrinho + 1 }
            : item
        )
      }
      return [...prev, { ...produto, quantidadeCarrinho: 1 }]
    })
  }

  const removeItem = (idProduto: number) => {
    setItems((prev) => prev.filter((item) => item.id_produto !== idProduto))
  }

  const increaseItem = (idProduto: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id_produto === idProduto
          ? { ...item, quantidadeCarrinho: item.quantidadeCarrinho + 1 }
          : item
      )
    )
  }

  const decreaseItem = (idProduto: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id_produto === idProduto
            ? { ...item, quantidadeCarrinho: item.quantidadeCarrinho - 1 }
            : item
        )
        .filter((item) => item.quantidadeCarrinho > 0)
    )
  }

  const clearCart = () => setItems([])

  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.preco * item.quantidadeCarrinho, 0),
    [items]
  )

  const totalItens = useMemo(
    () => items.reduce((acc, item) => acc + item.quantidadeCarrinho, 0),
    [items]
  )

  return (
    <CartContext.Provider
      value={{ items, total, totalItens, addItem, removeItem, increaseItem, decreaseItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
