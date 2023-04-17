import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'

import { Feather } from '@expo/vector-icons'

export default function Home({ route, navigation }) {
  const [posts, setPosts] = useState([])
  console.log('route.params', route.params)

  useEffect(() => {
    if (route.params) {
      setPosts((prev) => [...prev, route.params])
    }
  }, [route.params])
  console.log('posts', posts)

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <View style={{ marginTop: 32 }}>
              <Image source={{ uri: item.photo }} style={styles.img} />
              <Text style={styles.title}>{item.title.value}</Text>
            </View>
            <View style={styles.wraper}>
              <TouchableOpacity
                style={styles.comments}
                onPress={() =>
                  navigation.navigate('Comments', {
                    postId: item.id,
                    photo: item.photo,
                  })
                }
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={styles.commentsCount}>0</Text>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  style={{ display: 'flex', flexDirection: 'row' }}
                  onPress={() =>
                    navigation.navigate('Map', {
                      location: item.location,
                    })
                  }
                >
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                  <Text style={styles.place}>{item.place.value}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  img: {
    marginHorizontal: 16,
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
    marginHorizontal: 16,
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  wraper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  comments: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsCount: {
    marginLeft: 6,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#BDBDBD',
  },
  place: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'right',
    textDecorationLine: 'underline',

    color: '#212121',
  },
})
