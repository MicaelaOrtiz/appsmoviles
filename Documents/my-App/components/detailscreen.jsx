import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';
import { API_KEY } from '@env';
import { LinearGradient } from 'expo-linear-gradient';

export default function DetailScreen({ route }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`)
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, [movieId])

  if (loading) {
    return <ActivityIndicator 
    size="large" 
    style={styles.loading} 
    />;
  }

  const gradientColors = ['#202020', '#101010', '#000000']; 

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.fullScreen} 
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.imageContainer}> 
          <Image
            source={
              movie.poster_path
                ? { uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }
                : require('../assets/placeholder.png')
            }
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={styles.detail}>Fecha de estreno: {movie.release_date}</Text>
        <Text style={styles.detail}>Duración: {movie.runtime} minutos</Text>
        <Text style={styles.detail}>Rating: {movie.vote_average} / 10</Text>
        <Text style={styles.detail}>Géneros: {movie.genres.map(g => g.name).join(', ')}</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fullScreen: { 
    flex: 1, 
  },
  contentContainer: { 
    flex: 1,
    padding: 15 
  },
  
  title: { 
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  image: { 
    width: '100%', 
    height: 400, 
    marginBottom: 15, 
    borderRadius: 10 
  },
  overview: { 
    fontSize: 16, 
    marginBottom: 10,
    color: '#ddd' 
  },
  detail: { 
    fontSize: 16, 
    marginBottom: 5,
    color: '#ddd' 
  },
  loading: { 
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: '#000' 
  }
});
