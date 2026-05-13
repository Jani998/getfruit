import { useCartContext } from '@/src/hooks/use-cart-context'
import { router } from 'expo-router'
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Carrinho() {
  const { items, total, totalItens, increaseItem, decreaseItem, removeItem, clearCart } = useCartContext()

  if (!items.length) {
    return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.titulo}>Carrinho</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>O carrinho está vazio.</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      
    <Text style={styles.titulo}>Carrinho</Text>
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.id_produto.toString()}
        contentContainerStyle={{paddingVertical: 12}}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem ?? '' }} style={styles.imagem} />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.precoUnitario}>{item.preco.toFixed(2)}€ / {item.unidade}</Text>
            </View>

            <View style={styles.actions}>
              <Pressable onPress={() => decreaseItem(item.id_produto)} style={styles.qtyBtn}>
                <Text style={styles.qtyText}>-</Text>
              </Pressable>
              <Text style={styles.quantidade}>{item.quantidadeCarrinho}</Text>
              <Pressable onPress={() => increaseItem(item.id_produto)} style={styles.qtyBtn}>
                <Text style={styles.qtyText}>+</Text>
              </Pressable>
            </View>

            <Pressable onPress={() => removeItem(item.id_produto)}>
              <Text style={styles.remove}>Remover</Text>
            </Pressable>
          </View>
          
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.totalItens}>{totalItens} item(ns)</Text>
        <Text style={styles.total}>Total: {total.toFixed(2)}€</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginBottom: 8 }}>
        <Pressable onPress={clearCart}>
          <Text style={styles.clearText}>Limpar carrinho</Text>
        </Pressable>
      </View>

      <TouchableOpacity style={styles.botaoContinuar} onPress={() => router.push('/(tabs)/checkout')}>
        <Text style={styles.botaoContinuarText}>Proceder para checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f0' },
  titulo: { fontSize: 18, fontWeight: '500', padding: 16 },
  clearText: {
    color: '#b91c1c',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  botaoContinuar: {
      
      height: 48, 
      backgroundColor: 'black',
      borderRadius: 8, 
      alignItems: 'center', 
      justifyContent: 'center', 
      marginBottom: 10,
      marginHorizontal: 16
    },
    botaoContinuarText: { 
      color: 'white', 
      fontSize: 15, 
      fontWeight: '600' 
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
    gap: 12,
  },
  imagem: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111',
  },


  precoUnitario: {
    fontSize: 13,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#808483',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 20,
  },
  quantidade: {
    minWidth: 20,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  remove: {
    color: '#b91c1c',
    fontSize: 13,
    fontWeight: '500',
  },
  footer: {
    marginHorizontal:16,
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalItens: {
    fontSize: 14,
    color: '#666',
  },
  total: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
})