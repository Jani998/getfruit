// app/(tabs)/perfil.tsx
import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthContext } from '../../hooks/use-auth-context'
import { supabase } from '../../lib/supabase'


export default function Perfil() {
  
    const { profile, refreshProfile } = useAuthContext()

    const [editing, setEditing] = useState(false)
    const [morada, setMorada] = useState('')
    const [cidade, setCidade] = useState('')
    const [codigoPostal, setCodigoPostal] = useState('')

    useEffect(() => {
    if (profile) {
        setMorada(profile.morada ?? '')
        setCidade(profile.cidade ?? '')
        setCodigoPostal(profile.codigo_postal ?? '')
    }
}, [profile])

    async function guardarPerfil() {
        if (!profile?.id_user) return;

    const { error } = await supabase
    .from('profiles')
    .update({ morada, cidade, codigo_postal: codigoPostal })
    .eq('id_user', profile?.id_user)

    if (error) {
        console.log('Erro:', error.message)
        return
    }
    
    // sincroniza com o contexto
    await refreshProfile(profile?.id_user)
  
    setEditing(false)
}

    const iniciais = profile?.username?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) ?? '?' 

    async function onSignOutButtonPress () {
      const {error} = await supabase.auth.signOut();
      if (error) {
        console.log("Erro ao sair", error.message);
      }
    }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Perfil</Text>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{iniciais}</Text>
      </View>
      <Text style={styles.nome}>{profile?.username}</Text>
      <Text style={styles.email}>{profile?.email}</Text>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.val}>{profile?.username}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.val}>{profile?.email}</Text>
        </View>
        </View>
        
        
        {editing ? (
  <>
    <TextInput style={styles.input} value={morada} onChangeText={setMorada} placeholder="Morada" />
    <TextInput style={styles.input} value={cidade} onChangeText={setCidade} placeholder="Cidade" />
    <TextInput style={styles.input} value={codigoPostal} onChangeText={setCodigoPostal} placeholder="Código postal" />
    <Pressable style={styles.saveBtn} onPress={guardarPerfil}>
      <Text style={styles.saveBtnText}>Guardar</Text>
    </Pressable>
  </>
) : (
  <>
    <View style={styles.section}>
      <View style={styles.row}>
        <Text style={styles.label}>Morada</Text>
        <Text style={styles.val}>{profile?.morada ?? '—'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Cidade</Text>
        <Text style={styles.val}>{profile?.cidade ?? '—'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Código Postal</Text>
        <Text style={styles.val}>{profile?.codigo_postal ?? '—'}</Text>
      </View>
      <View style={styles.editar}>
        <Pressable onPress={() => setEditing(true)}>
            <Text style={styles.editarTexto}>Editar morada</Text>
        </Pressable>

      </View>
    </View >

    
  </>
)}
    

    <Pressable style={styles.logoutBtn} onPress={onSignOutButtonPress}>
        <Text style={styles.logoutText}>Terminar sessão</Text>
    </Pressable>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: { backgroundColor: '#f5f5f0' },
  titulo: { fontSize: 18, fontWeight: '500', padding: 16 },
  avatar: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: '#E1F5EE', alignItems: 'center',
    justifyContent: 'center', alignSelf: 'center', marginBottom: 8,
  },
  avatarText: { fontSize: 20, fontWeight: '500', color: '#0F6E56' },
  nome: { fontSize: 16, fontWeight: '500', color: '#111', textAlign: 'center' },
  email: { fontSize: 13, color: '#888', textAlign: 'center', marginTop: 2, marginBottom: 16 },
  section: {
    backgroundColor: '#fff', borderRadius: 12,
    marginHorizontal: 16, marginBottom: 10,
    borderWidth: 0.5, borderColor: '#e8e8e8', paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 10,
    borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0',
  },
  editar: {
    alignItems: 'flex-end', 
    paddingVertical: 10,  
  },
  editarTexto: {
    color:'blue',
  },
  label: { fontSize: 13, color: '#111' },
  val: { fontSize: 13, color: '#888' },
  input: {
    marginHorizontal: 16,
    height: 48,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#111',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  saveBtn: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#1D9E75',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  editBtn: {
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
    marginBottom: 10,
  },
  editBtnText: {
    fontSize: 14,
    color: '#111',
    fontWeight: '500',
  },
  logoutBtn: {
    marginHorizontal: 16, borderRadius: 12,
    padding: 14, alignItems: 'center',
    backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#f5c1c1',
  },
  logoutText: { fontSize: 14, color: '#E24B4A', fontWeight: '500' },
})