import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Picker } from 'react-native';

export default function detalhesComentario() {
  const [comentarios, setComentarios] = useState([]);
  const [sentimentoFiltro, setSentimentoFiltro] = useState('todos');

  useEffect(() => {
    async function fetchComentarios() {
      try {
        const response = await fetch('http://127.0.0.1:5000/comentarios');
        const data = await response.json();
        setComentarios(data);
      } catch (error) {
        console.error('Erro ao buscar comentários:', error);
      }
    }

    fetchComentarios();
  }, []);

  const filtrarComentarios = () => {
    if (sentimentoFiltro === 'todos') {
      return comentarios;
    }
    return comentarios.filter(comentario => comentario.sentimento === sentimentoFiltro);
  };

  const comentariosFiltrados = filtrarComentarios();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Comentários</Text>
      <Picker
        selectedValue={sentimentoFiltro}
        style={styles.picker}
        onValueChange={(itemValue) => setSentimentoFiltro(itemValue)}
      >
        <Picker.Item label="Todos" value="todos" />
        <Picker.Item label="Positivos" value="positivo" />
        <Picker.Item label="Negativos" value="negativo" />
      </Picker>

      {comentariosFiltrados.map((comentario) => (
        <View key={comentario.id_comentario} style={styles.commentBox}>
          <Text style={styles.commentText}>{comentario.texto_comentario}</Text>
          <Text style={styles.commentInfo}>Sentimento: {comentario.sentimento}</Text>
          <Text style={styles.commentInfo}>Rede Social: {comentario.rede_social}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: 200,
    marginBottom: 20,
  },
  commentBox: {
    width: '90%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 10,
  },
  commentInfo: {
    fontSize: 14,
    color: '#666',
  },
});
