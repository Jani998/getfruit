import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { supabase } from '../../../lib/supabase'

import { ProdutoCard } from '@/src/components/ProdutoCard'
import { useCartContext } from '@/src/hooks/use-cart-context'
import { Produto } from '@/src/types'
import Paginas from '../../../components/paginas'
import Procurar from "../../../components/procurar"

export default function Categoria() {
  const { id_cat } = useLocalSearchParams()  // recebe o id_cat da URL
  const [produtos, setProdutos] = useState<Produto[]>([])
  const { addItem } = useCartContext()

  useEffect(() => {
    getProdutos()
  }, [id_cat])

  async function getProdutos() {
    const categoriaId = Array.isArray(id_cat) ? id_cat[0] : id_cat
    if (!categoriaId) return


    const { data, error } = await supabase
      .from('produtos')       
      .select('*')
      .eq('id_cat', categoriaId)  // filtra produtos onde id_cat = categoria pressionada

    if (error) console.error(error)
    if (data) setProdutos(data)
  }

  function handleAdd (item: Produto) {
    addItem(item)
  }

  return (
    <SafeAreaView style={styles.container}>    
      <Procurar />
      <Paginas />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </Pressable>
      </View>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id_produto.toString()}
        renderItem={({ item }) => (
          <ProdutoCard item={item} onAdd={handleAdd} />
        )}
        contentContainerStyle={{paddingVertical: 12}}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f0' },
  header: {
  paddingHorizontal: 16,
  paddingVertical: 10,
},

back: {
  fontSize: 22,
},
})