import 'react-native-gesture-handler';
import { Dimensions, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import STYLES from '../styles/index1';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import ForgetScreen from './ForgetScreen';
import { StatusBar } from 'expo-status-bar';

import { Image, Input, Button } from 'react-native-elements';
import { auth } from '../firebase';
import Registerscreen from './Registerscreen';
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home")
            }
        });
        return unsubscribe;
    }, []);
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch(error => alert(error))
    }

    return (
        <SafeAreaView
            KeyboardAvoidingView
            style={{ paddingHorizontal: 20, flex: 1, backgroundColor: "#000" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', marginTop: 40 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: "#fff" }}>
                        GEMINI
                    </Text>
                    <Text
                        style={{ fontWeight: 'bold', fontSize: 22, color: "#64beff" }}>
                        HUB
                    </Text>
                </View>

                <View style={{ marginTop: 70 }}>
                    <Text style={{ fontSize: 27, fontWeight: 'bold', color: "#fff" }}>
                        Welcome Back,
                    </Text>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: "#a5a5a5" }}>
                        Sign in to continue
                    </Text>
                </View>

                <View style={{ marginTop: 20 }}>
                    <View style={STYLES.inputContainer}>
                        <Icon
                            name="mail-outline"
                            color="#a5a5a5"
                            size={20}
                            style={STYLES.inputIcon}
                        />
                        <Input
                            placeholder='Enter your email'
                            autoCapitalize='none'
                            autoCompleteType='email'
                            keyboardType='email-address'
                            keyboardAppearance='dark'
                            returnKeyType='next'
                            returnKeyLabel='next'
                            autoFocus
                            style={STYLES.input}
                            type="email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View style={STYLES.inputContainer}>
                        <Icon
                            name="lock-outline"
                            color="#a5a5a5"
                            size={20}
                            style={STYLES.inputIcon}
                        />

                        <Input
                            icon='key'
                            placeholder='Enter your password'
                            secureTextEntry
                            autoCompleteType='password'
                            autoCapitalize='none'
                            keyboardAppearance='dark'
                            returnKeyType='go'
                            returnKeyLabel='go'
                            type="password"
                            value={password}
                            style={STYLES.textInput}
                            onChangeText={(text) => setPassword(text)}
                            onSubmitEditing={signIn}
                        />
                    </View>
                    <View style={STYLES.btnPrimary}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }} onPress={signIn}>
                            Sign In
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Forget')} >
                        <Text style={{ color: '#ff2d5f', fontWeight: 'bold', fontSize: 18, marginTop: 15 }} >
                            Forget password
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            marginVertical: 20,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View style={STYLES.line}></View>
                        <Text style={{ marginHorizontal: 5, fontWeight: 'bold', color: '#fff' }}>OR</Text>
                        <View style={STYLES.line}></View>
                    </View>

                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        marginTop: 5,
                        marginBottom: 20,
                    }}>
                    <Text style={{ color: "#a5a5a5", fontWeight: 'bold' }}>
                        Don`t have an account ?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: "#ff2d5f", fontWeight: 'bold', marginLeft: 5 }}>
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;
// https://github.com/expo-community/expo-firebase-starter/releases/tag/0.7.0