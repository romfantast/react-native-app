import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
} from 'react-native'
import { useSelector } from 'react-redux'
import db from '../../firebase/config'
import { AntDesign } from '@expo/vector-icons'

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState('')
  const [allComments, setAllComments] = useState([])
  const { postId } = route.params
  const { photo } = useSelector((state) => state.auth)

  useEffect(() => {
    getAllComments()
  }, [])

  const createComment = async () => {
    db.firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .add({ comment, photo })

    setComment('')
  }

  const getAllComments = async () => {
    db.firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 32 }}>
        <Image source={{ uri: route.params.photo }} style={styles.img} />
      </View>

      <SafeAreaView>
        <FlatList
          style={styles.list}
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.boxComment}>
              <Image source={{ uri: item.photo }} style={styles.avatar} />
              <View style={styles.boxText}>
                <Text style={styles.textComment}>{item.comment}</Text>
                <Text style={styles.dateComment}></Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>

      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <View style={{ marginTop: 6, marginHorizontal: 16 }}>
          <TextInput
            value={comment}
            onChangeText={(value) => setComment(value)}
            style={styles.comment}
            placeholder="Коментувати..."
            placeholderTextColor="#BDBDBD"
          />

          <TouchableOpacity onPress={createComment} style={styles.btn}>
            <AntDesign name="arrowup" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  img: {
    marginHorizontal: 16,
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  comment: {
    position: 'relative',
    height: 50,
    width: Dimensions.get('window').width - 32,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 100,
    backgroundColor: '#F6F6F6',
  },
  btn: {
    position: 'absolute',
    top: 8,
    right: 8,
    height: 34,
    width: 34,
    backgroundColor: '#FF6C00',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  },
  list: {
    marginBottom: 32,
  },
  boxComment: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 24,
  },
  avatar: {
    marginRight: 16,
    width: 28,
    height: 28,
    borderRadius: '50%',
  },
  boxText: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    width: 299,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  textComment: {
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
  },
})
