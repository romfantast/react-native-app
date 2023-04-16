import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../nestedScreens/Home'
import CommentsScreen from '../nestedScreens/CommentsScreen'
import MapScreen from '../nestedScreens/MapScreen'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

const NestedScreen = createStackNavigator()

export default function PostsScreen() {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Публікації',
          headerTitleStyle: {
            color: '#212121',
            fontFamily: 'Roboto-Medium',
            fontSize: 17,
            lineHeight: 22,
            letterSpacing: -0.408,
            background: '#FFFFFF',
          },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              // onPress={signOut}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  )
}
