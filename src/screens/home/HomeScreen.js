import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Alert } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const HomeScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // firebase.initializeApp(options)
    const signInWithEmail = () => {
        try {
            auth()
                .signInWithEmailAndPassword(email, password)
                .then((userDetails) => {
                    navigation.navigate('Dashboard', {
                        userId: userDetails.user._user.uid
                    });
                })

        } catch (e) {
            console.log("error", e);
            Alert.alert("please check your credentails!!")
        }

    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Enter your email'
                label='Email'
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
                style={{ width: '80%', height: '7%', borderWidth: 1, borderRadius: 5 }}
            />
            <TextInput
                placeholder='Enter your password'
                label='Password'
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
                style={{ width: '80%', height: '7%', borderWidth: 1, borderRadius: 5, marginTop: 15 }}
            />
            <View style={{ backgroundColor: '#000', width: '70%', marginTop: 20 }}>

                <Button title="Sign in" color='#FFFF' onPress={() => signInWithEmail()} />
            </View>
            <View style={{ backgroundColor: '#000', width: '70%', marginTop: 15 }}>

                <Button title="Register" color='#FFFF' onPress={() => navigation.navigate('Signup')} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        marginTop: 100,
    },
    button: {
        width: 450,
        marginTop: 10
    }
});

export default HomeScreen;
