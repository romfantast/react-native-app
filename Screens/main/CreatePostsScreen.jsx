import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { FontAwesome } from '@expo/vector-icons'
import * as Location from 'expo-location'

export default function CreatePostsScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false)
  const [camera, setCamera] = useState(null)
  const [photo, setPhoto] = useState('')
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
      console.log('location', location)
    })()
  }, [])

  const takePhoto = async () => {
    // const { status } = await Camera.requestCameraPermissionsAsync()
    const photo = await camera.takePictureAsync()
    setPhoto(photo.uri)
  }

  const sendData = () => {
    console.log('navigation', navigation)
    navigation.navigate('Home', { photo, title, location })
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false)
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Camera style={styles.camera} ref={setCamera} type={CameraType.back}>
          {photo && (
            <View style={styles.takePhotoContainer}>
              <Image source={{ uri: photo }} style={styles.photo} />
            </View>
          )}
          {!photo && (
            <TouchableOpacity onPress={takePhoto} style={styles.snap}>
              <FontAwesome name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          )}
          {photo && (
            <TouchableOpacity
              onPress={() => {
                setPhoto('')
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesome name="camera" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </Camera>
        <Text style={styles.text}>
          {!photo ? 'Завантажити фото' : 'Редагувати фото'}
        </Text>
        <View>
          <TextInput
            style={styles.title}
            placeholder={'Назва...'}
            value={title}
            onChangeText={(value) => {
              setTitle((prev) => ({ ...prev, value }))
            }}
            onFocus={() => {
              setIsShowKeyboard(true)
            }}
          />
        </View>
        <TouchableOpacity style={styles.btnSubmit} onPress={sendData}>
          <Text style={styles.btnText}>Опублікувати</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  camera: {
    height: 240,
    marginHorizontal: 16,
    marginTop: 32,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  snap: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  takePhotoContainer: {
    position: 'absolute',
  },
  photo: {
    height: 240,
    width: Dimensions.get('window').width - 32,
    borderRadius: 8,
  },
  text: {
    color: '#BDBDBD',
    marginLeft: 16,
    marginTop: 8,
    fontFamily: 'Roboto-Regular',
    marginBottom: 32,
    fontSize: 16,
    lineHeight: 19,
  },
  btnSubmit: {
    marginTop: 32,
    marginHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 16,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'Roboto-Regular',

    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFF',
  },
  title: {
    paddingBottom: 16,
    paddingTop: 16,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
})
