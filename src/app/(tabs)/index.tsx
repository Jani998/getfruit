import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ProdutoCard } from "@/src/components/ProdutoCard";
import { useCartContext } from "@/src/hooks/use-cart-context";
import Procurar from "../../components/procurar";
import { useAuthContext } from "../../hooks/use-auth-context";
import { supabase } from '../../lib/supabase';
import { Categoria, TopProduto } from "../../types";



export default function Index() {

  const { addItem } = useCartContext()
  const {profile} = useAuthContext()
  const [categorias, setCategorias] = useState<Categoria[]>([])
  
    useEffect(() => {
      getCategorias()
    }, [])
  
    async function getCategorias() {
      const { data, error } = await supabase.from('categorias').select('*')
      if (error) console.error(error)
      if (data) setCategorias(data)
    }

    //obter os 4 produtos mais vendidos
    const [topProdutos, setTopProdutos] = useState<TopProduto[]>([])

    useEffect(() => {
      getTopProdutos()
    }, [])

    async function getTopProdutos() { 
      const { data, error } = await supabase.rpc('top_produtos_vendidos', {
    limit_count: 4,
  })
    if (error) {
        console.error('Erro ao buscar top produtos:', error)
        return
      }

      const rows = data ?? []

      const mapped: TopProduto[] = rows.map((row: any) => ({
        total_vendido: Number(row.total_vendido),
        produto: {
        id_produto: row.id_produto,
        nome: row.nome,
        preco: Number(row.preco),
        quantidade: Number(row.quantidade),
        unidade: row.unidade,
        imagem: row.imagem,
        id_cat: row.id_cat,
        categoria: '', // ou buscar/join na SQL se precisares do nome real
        },
  }))
  setTopProdutos(mapped)
  //console.log('topProdutos count:', mapped.length, mapped)
}

  return ( 
   
    <SafeAreaView style={styles.container}>
      
      <Procurar />
      
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categorias</Text>
        </View>
        <View>
            <FlatList
              data={categorias}
              numColumns={3}
              keyExtractor={(item) => item.id_cat.toString()}
              columnWrapperStyle={styles.linha}
              contentContainerStyle={styles.gridContent}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.celula}
                  onPress={() => router.push(`/categoria/${item.id_cat}`)}
                >
                  <Image style={styles.circle} source={{ uri: item.imagem }} />
                  <Text style={styles.nomeCategoria} numberOfLines={2}>
                    {item.nome}
                  </Text>
                </Pressable>
              )}
            />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mais Vendidos</Text>
          
        </View>


        <View style={{flex:1}}>
            <FlatList
            data={topProdutos}
            keyExtractor={(item) => item.produto.id_produto.toString()}
            renderItem={({ item }) => (
                <View>   
                  <ProdutoCard item={item.produto}
                    onAdd={(p) => addItem(p)}/>  
                </View>
            )}
        />
        </View> 
    
    </SafeAreaView>
  );

}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f0' },

  gridContent: {
  paddingHorizontal: 16,
  paddingBottom: 16,
},
linha: {
  justifyContent: 'space-between', // ou 'space-around' / 'center'
  marginBottom: 16,
},
celula: {
  flex: 1,
  alignItems: 'center',
  marginHorizontal: 4,
},
circle: {
  width: 72,
  height: 72,
  borderRadius: 36,
},
nomeCategoria: {
  marginTop: 6,
  fontSize: 12,
  textAlign: 'center',
},






  sectionHeader: {
    flexDirection: 'row',
    
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  sectionTitle: { 
    fontWeight: '700', 
    fontSize: 18,
  },
  
  item: {
    padding: 16,
    borderBottomColor: '#ccc',
    alignItems:'center'
  },

  
  


});


