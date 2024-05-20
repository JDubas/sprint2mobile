import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

export default function ChartsPage({ route }) {
  const navigation = useNavigation();
  const [comentarios, setComentarios] = useState([]);
  const { email } = route.params;
  

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

  const getRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };

  const navigationDetalhesComentario = () => {
    navigation.navigate('detalhesComentario');
  };

  const navigationUsuario = () => {
    navigation.navigate('usuario', { email: email });
  };

  const filtrarPorSentimento = (sentimento) => {
    return comentarios.filter(comentario => comentario.sentimento === sentimento);
  };

  const contarPorRedeSocial = (sentimento) => {
    const comentariosFiltrados = filtrarPorSentimento(sentimento);
    const contagemPorRedeSocial = {};
    
    comentariosFiltrados.forEach(comentario => {
      if (contagemPorRedeSocial[comentario.rede_social]) {
        contagemPorRedeSocial[comentario.rede_social]++;
      } else {
        contagemPorRedeSocial[comentario.rede_social] = 1;
      }
    });

    return contagemPorRedeSocial;
  };

  const dataTodos = [
    { name: 'Positivo', population: filtrarPorSentimento('positivo').length, color: '#FF5733', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Negativo', population: filtrarPorSentimento('negativo').length, color: '#C70039', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  const dataPositivos = Object.keys(contarPorRedeSocial('positivo')).map(redeSocial => ({
    name: redeSocial,
    population: contarPorRedeSocial('positivo')[redeSocial],
    color: getRandomColor(),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  const dataNegativos = Object.keys(contarPorRedeSocial('negativo')).map(redeSocial => ({
    name: redeSocial,
    population: contarPorRedeSocial('negativo')[redeSocial],
    color: getRandomColor(),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigationDetalhesComentario}>
          <Text style={styles.link}>Detalhes de Comentário</Text>
        </TouchableOpacity>
        <Text>    |    </Text>
        <TouchableOpacity onPress={navigationUsuario}>
          <Text style={styles.link}>Usuário</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.emailText}>Email do usuário: {email}</Text>
      <Text style={styles.sectionTitle}>Todos os Comentários</Text>
      <PieChart
        data={dataTodos}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: '#FFFFFF',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />

      <Text style={styles.sectionTitle}>Comentários Positivos</Text>
      <PieChart
        data={dataPositivos}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: '#FFFFFF',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />

      <Text style={styles.sectionTitle}>Comentários Negativos</Text>
      <PieChart
        data={dataNegativos}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: '#FFFFFF',
          backgroundGradientFrom: '#FFFFFF',
          backgroundGradientTo: '#FFFFFF',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />
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
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 20,
      backgroundColor: '#EFEFEF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    link: {
      fontSize: 18,
      color: 'blue',
    },
    sectionTitle: {
      fontSize: 20,
      marginBottom: 10,
      fontWeight: 'bold',
    },
  });
