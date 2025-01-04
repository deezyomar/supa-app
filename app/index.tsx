import { View, Text, StyleSheet, TextInput, Alert,  TouchableOpacity, Button, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState} from 'react'
import { supabase } from '@/utils/supabase';

const index = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSignInPress = async () => {
        setLoading(true);
        const {error} = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            Alert.alert(error.message);
        }
        setLoading(false);
    };
    const onSignUpPress = async () => {
        setLoading(true);
        const {error, data: {session},} = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            Alert.alert(error.message);
        }
        if (!session) {
            Alert.alert('Check your email for the confirmation link');
        }


        setLoading(false);
    };

  return (
    <View style={styles.container}>
         {loading && ( 
            <View style={styles.overlay}>
                <ActivityIndicator size='large' color='#fff'/>
                <Text style={{color: '#fff'}}>Loading...</Text>
            </View>
        )}

      <Text style={styles.header}>Deezy.com</Text>
      <TextInput
      style={styles.inputField}
      placeholder='Email'
      placeholderTextColor={'#fff'}
      onChangeText={setEmail}
      value={email}
      autoCapitalize='none'/>
      <TextInput
      style={styles.inputField}
      placeholder='Password'
      placeholderTextColor={'#fff'}
      onChangeText={setPassword}
      value={password}
      secureTextEntry/>
      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={{color: '#fff'}}>Sign In</Text>
    </TouchableOpacity>
    <Button title="Sign Up" onPress={onSignUpPress} color={'#fff'}/>
    </View>
    

  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 200,
        padding: 20,
        backgroundColor: '#151515',

    },
    header: {
        fontSize: 30,
        color: '#fff',
        textAlign: 'center',
        margin: 50,
    },
    inputField: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderColor: '#2b825b',
        borderRadius: 4,
        padding: 10,
        color: '#fff',
        backgroundColor: '#363636',
    },
    button: {
        marginVertical: 15,
        alignItems: 'center',
        backgroundColor: "#2b825b",
        padding: 12,
        borderRadius: 4,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems:'center',
        justifyContent: 'center',
        zIndex: 1,
        elevation: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        gap: 10,
    }

});

export default index