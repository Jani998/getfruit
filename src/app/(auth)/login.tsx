import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';

export default function Login() {
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading]   = useState(false);

    async function SignInWithEmail () {
        setLoading(true);
        const {error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            console.log("Erro ao tentar entrar", error.message);
        }
        setLoading(false);
    }

    // OAUth Google
      const handleGoogleAuth = async () => {
        setLoading(true);
        try {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: 'getfruit://auth/callback' },
          });
          if (error) throw error;
        } catch (err: any) {
          Alert.alert('Erro Google', err.message);
        } finally {
          setLoading(false);
        }
      };
    
      // OAUth Apple
      const handleAppleAuth = async () => {
        setLoading(true);
        try {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'apple',
            options: { redirectTo: 'getfruit://auth/callback' },
          });
          if (error) throw error;
        } catch (err: any) {
          Alert.alert('Erro Apple', err.message);
        } finally {
          setLoading(false);
        }
      };

    

  return (
      <SafeAreaView style={styles.container}>
          
            {/* Nome App */}
            <Text style={styles.nomeApp}>GetFruit</Text>
  
            {/* Título */}
            <Text style={styles.titulo}>Faça login</Text>
  
            <TextInput
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@dominio.pt"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCorrect={false}
              textContentType="emailAddress"
            />

            <TextInput
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry
              placeholder="password"
              placeholderTextColor="#aaa"
              autoCapitalize="none"
              textContentType="password"
            />

            <TouchableOpacity style={[styles.botaoContinuar, loading && styles.btnDisabled]}
                disabled={loading}
                onPress={() => SignInWithEmail()}>              
              <Text style={styles.botaoContinuarText}>Continuar</Text>               
            </TouchableOpacity>
  
            
              <Pressable onPress={() => router.replace('/(auth)/registo')}>
                  <Text style={styles.linkRegisto}> Ainda não tem conta. Faça o registo.</Text>
              </Pressable>
            
              
            {/* Divisor */}
                      <View style={styles.dividerRow}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>ou</Text>
                        <View style={styles.dividerLine} />
                      </View>
            
                      {/* Google */}
                      <TouchableOpacity
                        style={styles.btnSocial}
                        onPress={handleGoogleAuth}
                        disabled={loading}
                        activeOpacity={0.85}
                      >
                        <Image 
                            source={require('../../../assets/images/LoginGoogle.png')}
                            style={styles.socialIcon} />
                        <Text style={styles.btnSocialText}>Continuar com Google</Text>
                      </TouchableOpacity>
            
                      {/* Apple */}
                      <TouchableOpacity
                        style={styles.btnSocial}
                        onPress={handleAppleAuth}
                        disabled={loading}
                        activeOpacity={0.85}
                      >
                        <Image
                        source={require('../../../assets/images/LoginApple.png')}
                        style={styles.socialIcon} />
                        <Text style={styles.btnSocialText}>Continuar com Apple</Text>
                      </TouchableOpacity>
            
                      {/* Nota legal */}
                      <Text style={styles.legalText}>
                        Ao pressionar continuar, está a concordar com os nossos{' '}
                        <Text style={styles.legalLink}>Termos de Serviço</Text>
                        {' '}e{' '}
                        <Text style={styles.legalLink}>Política de Privacidade</Text>
                      </Text>
        </SafeAreaView>
  
            
  )}
  
  const styles = StyleSheet.create({
    
    container: { 
      backgroundColor: 'white',
      flex:1,
      paddingHorizontal: 32,
      paddingTop: 50,
      alignItems: 'center',
    },
    nomeApp: {
      fontSize: 28, 
      fontWeight: '700', 
      color: 'black',
      marginBottom: 40, 
    },
    titulo: {
      fontSize: 16, 
      fontWeight: '500', 
      color: 'black',
      marginBottom: 20, 
    },
    input: {
      width: '100%', 
      height: 48,
      borderWidth: 1, 
      borderColor: '#ddd', 
      borderRadius: 8,
      paddingHorizontal: 14, 
      fontSize: 15, 
      color: 'black',
      marginBottom: 12,
    },
    botaoContinuar: {
      width: '100%', 
      height: 48, 
      backgroundColor: 'black',
      borderRadius: 8, 
      alignItems: 'center', 
      justifyContent: 'center', 
      marginBottom: 10,
      
    },
    botaoContinuarText: { 
      color: 'white', 
      fontSize: 15, 
      fontWeight: '600' 
  },
      btnDisabled:{ 
          opacity: 0.6 
  },
    linkRegisto:{
      color:'blue'

    },
    dividerRow: {
      flexDirection: 'row', 
      alignItems: 'center',
      width: '100%', 
      marginVertical: 20,
    },
    dividerLine: { 
      flex: 1, 
      height: 1, 
      backgroundColor: '#ddd' 
  },
    dividerText: { 
      marginHorizontal: 12, 
      color: '#888', 
      fontSize: 13 },
    btnSocial: {
      width: '100%', 
      height: 48,
      borderWidth: 1, 
      borderColor: '#ddd', 
      borderRadius: 8,
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center',
      marginBottom: 12,
    },
    socialIcon:{ 
      width:20, 
      height:20, 
      marginRight: 10 
  },
    btnSocialText: { 
      fontSize: 15, 
      color: '#111', 
      fontWeight: '500' },
    legalText: {
      fontSize: 11, 
      color: '#888', 
      textAlign: 'center',
      lineHeight: 16, 
      marginTop: 12, 
      paddingHorizontal: 8,
    },
    legalLink: { 
      color: '#555', 
      textDecorationLine: 'underline' },
  });