import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Produto } from '../types'

export function ProdutoCard({ item, onAdd }: { item: Produto, onAdd: (item: Produto) => void }) {
  return (
    <View style={styles.card}>
      <Image source={item.imagem ? {uri: item.imagem } : require('../../assets/images/nao_disponivel.jpg') } style={styles.imagem} />
      <View style={styles.info}>
        <Text style={styles.texto}>{item.nome}</Text>
        <Text style={styles.qtd}>Qtd. disponível: {item.quantidade} · {item.unidade}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.texto}>{item.preco.toFixed(2)}€</Text>
        <Pressable style={styles.addBtn} onPress={() => onAdd(item)}>
          <Text style={styles.addBtnText}>+</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
    gap: 12,
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  info: {
    flex: 1,
  },
  texto: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111',
  },
  qtd: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
    gap: 8,
  },
  
  addBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0f0e0e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 22,
    fontWeight: '400',
  },
})