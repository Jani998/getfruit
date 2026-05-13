import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthContext } from '../../hooks/use-auth-context';
import { useCartContext } from '../../hooks/use-cart-context';




export default function Checkout() {
    const { items, total, totalItens } = useCartContext() 
    const { profile } = useAuthContext()

    const [modalMorada, setModalMorada] = useState(false)
    const [moradaSelecionada, setMoradaSelecionada] = useState(profile?.morada ?? '')
    const [novaMorada, setNovaMorada] = useState('')
    const [novaModalidade, setNovaModalidade] = useState<'guardada' | 'nova'>('guardada')

    const envio = 0
    const totalFinal = total + envio
    

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.topbar}>
            <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>‹</Text>
            </Pressable>
            <Text style={styles.titulo}>Checkout</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>

        {/* Morada, Entrega, Pagamento */}
        <View style={styles.section}>
            <Pressable style={styles.row} onPress={() => setModalMorada(true)}>
                <Text style={styles.rowLabel}>Morada</Text>
                <Text style={[styles.rowValue, !moradaSelecionada && styles.placeholder]}>
                    {moradaSelecionada || 'Adicione morada'}
                </Text>
                <Text style={styles.arrow}>›</Text>
            </Pressable>

        {/* Modal */}
            <Modal
            visible={modalMorada}
            animationType="slide"
            transparent
            onRequestClose={() => setModalMorada(false)}
            >
            <Pressable style={styles.overlay} onPress={() => setModalMorada(false)} />
            <View style={styles.bottomSheet}>
                <Text style={styles.sheetTitulo}>Morada de entrega</Text>

            {/* Morada guardada no perfil */}
    {profile?.morada && (
      <>
        <Text style={styles.sheetLabel}>Morada guardada</Text>
        <Pressable
          style={[styles.moradaOption, moradaSelecionada === profile.morada && styles.moradaSelected]}
          onPress={() => {
            setMoradaSelecionada(profile.morada)
            setNovaModalidade('guardada')
          }}
        >
          <View style={styles.moradaOptionInfo}>
            <Text style={styles.moradaOptionTitulo}>{profile.morada}</Text>
            <Text style={styles.moradaOptionSub}>{profile.cidade} · {profile.codigo_postal}</Text>
          </View>
          {moradaSelecionada === profile.morada && (
            <Text style={styles.checkmark}>✓</Text>
          )}
        </Pressable>
      </>
    )}

        {/* Nova morada */}
    <Text style={styles.sheetLabel}>Outra morada</Text>
    <TextInput
      style={styles.sheetInput}
      placeholder="Rua, número, andar..."
      placeholderTextColor="#bbb"
      value={novaMorada}
      onChangeText={(text) => {
        setNovaMorada(text)
        setNovaModalidade('nova')
        setMoradaSelecionada(text)
      }}
    />

    <Pressable
      style={styles.sheetBtn}
      onPress={() => setModalMorada(false)}
    >
      <Text style={styles.sheetBtnText}>Confirmar</Text>
    </Pressable>
  </View>
</Modal>


          <View style={styles.row}>
            <Text style={styles.rowLabel}>Entrega</Text>
            <View style={styles.rowContent}>
              <Text style={styles.rowValue}>Grátis</Text>
              <Text style={styles.rowSub}>3-4 dias</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Pagamento</Text>
            <Text style={styles.rowValue}>Visa *1234</Text>
            <Text style={styles.arrow}>›</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.itemsHeader}>
            <Text style={styles.headerText}>ITENS</Text>
            <Text style={styles.headerText}>DESCRIÇÃO</Text>
            <Text style={styles.headerText}>PREÇO</Text>
          </View>
          {items.map((item) => (
            <View key={item.id_produto} style={styles.itemRow}>
              <Image source={{ uri: item.imagem ?? '' }} style={styles.itemImg} />
              <View style={styles.itemInfo}>
                <Text style={styles.fornecedor}>Fornecedor</Text>
                <Text style={styles.itemNome}>{item.nome}</Text>
                <Text style={styles.itemQty}>Quantidade: {String(item.quantidadeCarrinho).padStart(2, '0')}</Text>
              </View>
              <Text style={styles.itemPreco}>{(item.preco * item.quantidadeCarrinho).toFixed(2)}€</Text>
            </View>
          ))}
        </View>

  
        <View style={styles.totais}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal ({totalItens})</Text>
            <Text style={styles.totalVal}>{total.toFixed(2)}€</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Totais de envio</Text>
            <Text style={styles.totalVal}>{envio === 0 ? 'Grátis' : `${envio.toFixed(2)}€`}</Text>
          </View>
          <View style={[styles.totalRow, styles.totalFinal]}>
            <Text style={styles.totalFinalLabel}>Total</Text>
            <Text style={styles.totalFinalVal}>{totalFinal.toFixed(2)}€</Text>
          </View>
        </View>

      </ScrollView>

      <Pressable style={styles.confirmBtn}>
        <Text style={styles.confirmText}>Confirmar encomenda</Text>
      </Pressable>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f0' },
  
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center',  paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: '#e8e8e8' },
  backBtn: { position: 'absolute', left: 16 },
  backText: { fontSize: 22, color: '#111' },
  titulo: { fontSize: 16, fontWeight: '500', color: '#111' },
  scroll: { paddingBottom: 16 },
  section: { backgroundColor: '#fff', marginHorizontal: 12, marginTop: 10, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8', overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' },
  rowLabel: { fontSize: 13, color: '#888', width: 80 },
  rowContent: { flex: 1 },
  rowValue: { flex: 1, fontSize: 13, fontWeight: '500', color: '#111' },
  rowSub: { fontSize: 11, color: '#888', marginTop: 1 },
  placeholder: { color: '#bbb', fontWeight: '400' },
  arrow: { fontSize: 16, color: '#bbb' },
  itemsHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' },
  headerText: { fontSize: 11, color: '#888', fontWeight: '500' },
  itemRow: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0', gap: 10 },
  itemImg: { width: 48, height: 48, borderRadius: 8 },
  itemInfo: { flex: 1 },
  fornecedor: { fontSize: 10, color: '#aaa' },
  itemNome: { fontSize: 13, fontWeight: '500', color: '#111' },
  itemQty: { fontSize: 11, color: '#888' },
  itemPreco: { fontSize: 13, fontWeight: '500', color: '#111' },
  totais: { backgroundColor: '#fff', marginHorizontal: 12, marginTop: 10, borderRadius: 10, borderWidth: 0.5, borderColor: '#e8e8e8', padding: 14 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  totalLabel: { fontSize: 13, color: '#888' },
  totalVal: { fontSize: 13, color: '#111' },
  totalFinal: { borderTopWidth: 0.5, borderTopColor: '#eee', marginTop: 4, paddingTop: 8 },
  totalFinalLabel: { fontSize: 14, fontWeight: '500', color: '#111' },
  totalFinalVal: { fontSize: 14, fontWeight: '500', color: '#111' },
  confirmBtn: { margin: 12, backgroundColor: '#111', borderRadius: 10, padding: 16, alignItems: 'center' },
  confirmText: { color: '#fff', fontSize: 14, fontWeight: '500' },



  overlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
},
bottomSheet: {
  backgroundColor: '#fff',
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  padding: 20,
  paddingBottom: 32,
},
sheetTitulo: {
  fontSize: 16,
  fontWeight: '500',
  color: '#111',
  marginBottom: 16,
  textAlign: 'center',
},
sheetLabel: {
  fontSize: 12,
  color: '#888',
  marginBottom: 8,
  marginTop: 12,
},
moradaOption: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 12,
  borderRadius: 10,
  borderWidth: 0.5,
  borderColor: '#e0e0e0',
  backgroundColor: '#fff',
},
moradaSelected: {
  borderColor: '#1D9E75',
  backgroundColor: '#f0faf6',
},
moradaOptionInfo: { flex: 1 },
moradaOptionTitulo: { fontSize: 14, fontWeight: '500', color: '#111' },
moradaOptionSub: { fontSize: 12, color: '#888', marginTop: 2 },
checkmark: { fontSize: 16, color: '#1D9E75' },
sheetInput: {
  height: 48,
  borderWidth: 0.5,
  borderColor: '#e0e0e0',
  borderRadius: 8,
  paddingHorizontal: 14,
  fontSize: 14,
  color: '#111',
  backgroundColor: '#fff',
},
sheetBtn: {
  backgroundColor: '#111',
  borderRadius: 10,
  padding: 14,
  alignItems: 'center',
  marginTop: 16,
},
sheetBtnText: { color: '#fff', fontSize: 14, fontWeight: '500' },
})