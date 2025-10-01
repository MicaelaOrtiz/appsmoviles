import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import MovieCard from './MovieCard';
import { API_KEY } from '@env';

const MOVIES = [597];

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchMovies = async () => {
    try {
      const results = await Promise.all(
        MOVIES.map(async id => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES`
          );
          return await res.json();
        })
      );
      setMovies(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  fetchMovies();
}, []);


  if (loading) {
    return <ActivityIndicator 
    size="large" 
    style={{ flex: 1, 
      justifyContent: 'center' }} />;
  }

  return (
    <View 
    style={styles.container}>

      <FlatList
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => navigation.navigate('Detail', { movieId: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, 
    padding: 10 },
});
