import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { fetchImages, InterfaceImage } from '../store/slices/gallarySlice.ts';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export type RootStackParamList = {
  Gallery: undefined;
  PhotoDetail: { image: InterfaceImage };
};

export const GalleryComponent = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { images, loading, error } = useSelector(
    (state: RootState) => state.gallery,
  );

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {loading && <Text style={styles.message}>Loading...</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}
      <FlatList
        data={images}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate('PhotoDetail', { image: item })
            }>
            <Text style={styles.title}>
              {item.title} by {item.author}
            </Text>
            <Image source={{ uri: item.url }} style={styles.image} />
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    padding: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
  error: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
});
