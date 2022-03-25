import React, { useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { auth, db } from '../firebase';
import { firebase } from '@firebase/app';
const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection("chat").doc(route.params.id).collection("message").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL

        })
        setInput('')
    };

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection('chat')
            .doc(route.params.id)
            .collection('message')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            ));
        return unsubscribe;
    }, [route])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Avatar
                        rounded
                        source={{
                            uri: messages[0]?.data.photoURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                        }}
                    />
                    <Text style={{ color: "#000", marginLeft: 10, fontWeight: "700" }}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="#000" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })

    }, [navigation, messages])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
            <StatusBar style="auto" />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <>
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                            {/* chat goes here */}
                            {messages.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar
                                            position="absolute"
                                            // web
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                right: -5,
                                            }}
                                            bottom={-15}
                                            right={-5}
                                            rounded
                                            size={30}
                                            source={{
                                                uri: data.photoURL,
                                            }} />
                                        <Text style={styles.recieverText}>
                                            {data.message}
                                        </Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                        <Avatar
                                            position="absolute"
                                            // web
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                right: -5,
                                            }}
                                            bottom={-15}
                                            right={-5}
                                            rounded
                                            size={30}
                                            source={{
                                                uri: data.photoURL,
                                            }}
                                        />
                                        <Text style={styles.sendText}>
                                            {data.message}
                                        </Text>
                                        <Text style={styles.sendName}>
                                            {data.displayName}
                                        </Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Type Message"
                                value={input}
                                onSubmitEditing={sendMessage}
                                onChangeText={text => setInput(text)}
                            />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Ionicons name="send" size={24} color="#ff2d5f" style={{ bottom: 30 }} />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: 10
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        width: "100%",

    },
    textInput: {
        bottom: 30,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30
    },
    reciever: {
        padding: 15,
        marginRight: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative"
    },
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative"
    },
    sendName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white"
    },
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10
    },
    sendText: {
        marginBottom: 15,
        fontWeight: "500",
        marginLeft: 10,
        color: "white"
    },

})
