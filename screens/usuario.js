import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

export default function Usuario({ route }) {
  const { email } = route.params;
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar os dados do usuário pela API
    async function fetchUsuario() {
      try {
        const response = await fetch(`http://127.0.0.1:5000/user-info/${email}`);
        const data = await response.json();

        if (response.status === 200) {
          setUsuario(data);
        } else {
          alert(data.message || 'Erro ao buscar informações do usuário.');
        }
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
        alert('Erro ao buscar informações do usuário. Verifique se a API.py está rodando.');
      } finally {
        setLoading(false);
      }
    }

    fetchUsuario();
  }, [email]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {usuario ? (
        <>
          <Text style={styles.heading}>Informações da Conta</Text>
          <Text style={styles.label}>Nome: <Text style={styles.value}>{usuario.nome}</Text></Text>
          <Text style={styles.label}>Email: <Text style={styles.value}>{email}</Text></Text>
          <Text style={styles.label}>Senha: <Text style={styles.value}>{usuario.senha}</Text></Text>
        </>
      ) : (
        <Text style={styles.error}>Não foi possível encontrar as informações do usuário.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  value: {
    fontWeight: 'bold',
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});
