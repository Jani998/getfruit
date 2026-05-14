import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Notificacao } from '@/src/types'
import { useAuthContext } from '../../hooks/use-auth-context'
import { supabase } from '../../lib/supabase'

export default function Notificacoes() {

  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([])
  const { profile } = useAuthContext()
  const [loadingNotificacoes, setLoadingNotificacoes] = useState(false)
  

  useEffect(() => {
    if (!profile?.id_user) return
      getNotificacoes()
  }, [profile?.id_user])

  async function getNotificacoes() {
  setLoadingNotificacoes(true)
  try {
    const { data, error } = await supabase
      .from('notificacoes')
      .select('*')
      .eq('id_user', profile.id_user)
      .order('created_at', { ascending: false })
    if (error) {
      console.error(error)
      setNotificacoes([])
      return
    }
    setNotificacoes(data ?? [])
  } finally {
    setLoadingNotificacoes(false)
  }
}

if (!notificacoes.length) {
    return (
      <SafeAreaView style={styles.container}>
          <Text style={styles.titulo}>Notificações</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Não tem notificações.</Text>
        </View>
      </SafeAreaView>
    )
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Notificações</Text>
      <FlatList
        data={notificacoes}
        keyExtractor={(item) => item.id_not.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.dot, item.lida && styles.dotLida]} />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.titulo}</Text>
              <Text style={styles.corpo}>{item.corpo}</Text>
              <Text style={styles.tempo}>{item.created_at}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f0' 
  },
  titulo: { 
    fontSize: 18, 
    fontWeight: '500', 
    padding: 16 },
  card: {
    flexDirection: 'row', 
    alignItems: 'flex-start',
    backgroundColor: '#fff', 
    borderRadius: 12,
    padding: 12, 
    marginHorizontal: 16, 
    marginBottom: 8,
    borderWidth: 0.5, 
    borderColor: '#e8e8e8', 
    gap: 10,
  },
  dot: {
    width: 8, 
    height: 8, 
    borderRadius: 4,
    backgroundColor: '#1D9E75', 
    marginTop: 4, 
    flexShrink: 0,
  },
  dotLida: { 
    backgroundColor: '#ddd' 
  },
  info: { 
    flex: 1 
  },
  nome: { 
    fontSize: 13, 
    fontWeight: '500', 
    color: '#111' 
  },
  corpo: { 
    fontSize: 12, 
    color: '#888', 
    marginTop: 2 
  },
  tempo: { 
    fontSize: 11, 
    color: '#bbb', 
    marginTop: 3 },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
})