import 'react-native-gesture-handler';
import { SafeAreaView, View, Text, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import STYLES from '../styles/index1';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { Input, Button } from 'react-native-elements'
import { auth, } from '../firebase';
const Registerscreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login"
        })
    }, [navigation])
    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(authUser => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGEQjb_t0S5C4b2B01eMGWRSSXNLoJBKKXOQ&usqp=CAU",
                })
            })
            .catch(error => alert(error.message))
        alert('Register Successfully')
    }
    // const dispatch = useDispatch();
    // const signUp = () => {
    //     auth.signInWithRedirect(provider)
    //         .then((user) => {
    //             (login({
    //                 displayName: user.displayName,
    //                 email: user.email,
    //                 photoURL: user.photoURL,
    //                 emailVerified: user.emailVerified,
    //             })
    //             )

    //         })
    //         .catch(error => alert(error.message));
    // }
    return (
        <SafeAreaView
            style={{ paddingHorizontal: 20, flex: 1, backgroundColor: "#000" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', marginTop: 26.5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: "#fff" }}>
                        FOX
                    </Text>
                    <Text
                        style={{ fontWeight: 'bold', fontSize: 22, color: "#64beff" }}>
                        HUB
                    </Text>
                </View>
                <View style={{ marginTop: 13 }} >
                    <Text style={{ fontSize: 27, fontWeight: 'bold', color: "#fff" }}>
                        Welcome,
                    </Text>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: "#a5a5a5" }}>
                        Sign up to continue
                    </Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={STYLES.inputContainer}>
                        <Icon
                            name="person-outline"
                            color="#a5a5a5"
                            size={20}
                            style={STYLES.inputIcon}
                        />
                        <Input
                            style={STYLES.input}
                            placeholder="Full Name"
                            autoFocus
                            type='text'
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
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
                        // onSubmitEditing={signIn}
                        />
                    </View>
                    <View style={STYLES.inputContainer}>
                        <Input
                            placeholder="Profile Picture URL (optional)"
                            autoFocus
                            type='text'
                            value={imageUrl}
                            style={{ color: '#a5a5a5' }}
                            onChangeText={(text) => setImageUrl(text)}
                            onSubmitEditing={register}
                        />
                    </View>
                    <View style={STYLES.btnPrimary}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }} onPress={register}>
                            Sign Up
                        </Text>
                    </View>
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
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <View style={STYLES.btnSecondary}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>
                                Sign up with
                            </Text>
                            <Image
                                style={STYLES.btnImage}
                                source={require('../assets/1.png')}
                            />
                        </View>
                        <View style={{ width: 10 }}></View>
                        <View style={STYLES.btnSecondary}>
                            <TouchableOpacity >
                                <Text style={{ fontWeight: 'bold', marginLeft: 3, fontSize: 12, color: '#fff' }}

                                >
                                    Continue with Google
                                </Text>
                            </TouchableOpacity>

                            <Image
                                style={STYLES.btnImage}
                                source={require('../assets/2.png')}
                            />
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        marginTop: 40,
                        marginBottom: 20,
                    }}>
                    <Text style={{ color: "#a5a5a5", fontWeight: 'bold' }}>
                        Already have an account ?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ color: "#ff2d5f", fontWeight: 'bold' }}>
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Registerscreen;