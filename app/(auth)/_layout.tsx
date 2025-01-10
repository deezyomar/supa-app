import { View, Text, TouchableOpacity } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton, GestureHandlerRootView } from 'react-native-gesture-handler';
import {Tabs} from 'expo-router'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '@/utils/supabase'

const _layout = () => {
  return (
    <GestureHandlerRootView>
    <Tabs screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
            backgroundColor: '#151515'
        },
        headerTintColor: '#fff',
        tabBarActiveTintColor:'#fff',
        tabBarStyle:{
            backgroundColor: '#151515',
        },
        headerRight: () => (
            <TouchableOpacity onPress={() => supabase.auth.signOut()}>
                <Ionicons 
                name="log-out-outline"
                size={24}
                color="#fff"
                style={{marginRight: 16}}
                />
            </TouchableOpacity>
        )
    }}>
        <Tabs.Screen name="index" options={{
            title: "Home",
            tabBarIcon: ({size, color}) => (
                <Ionicons name="home-outline" size={size} color={color} />
            )
        }}/>
        <Tabs.Screen name="profile" options={{
            title: "Profile",
            tabBarIcon: ({size, color}) => (
                <Ionicons name="person-outline" size={size} color={color} />
            )
        }}/>
    </Tabs>
    </GestureHandlerRootView>
  )
}

export default _layout