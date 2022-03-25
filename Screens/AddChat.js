import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from '../firebase';
const AddChat = ({ navigation }) => {
    const [input, setInput] = useState("")
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a New Chat",
            headerBackTitle: "Chat",
        })
    }, [])
    const createChat = async () => {
        await db.collection('chat').add({
            chatName: input
        }).then(() => {
            navigation.goBack()
        }).catch(error => alert(error))
    }
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Icon
                name="add"
                color="#a5a5a5"
                size={20}
                style={{ position: 'absolute', marginTop: 21, marginLeft: 15 }}
            />
            <Input

                placeholder="Enter a chat  name"
                value={input}
                style={{ color: "#fff", marginLeft: 14 }}
                onSubmitEditing={createChat}
                onChangeText={(text) => setInput(text)}
            // leftIcon={
            //     <Icon name="wechat" type="antdesign" size={24} color="black" />
            // }
            />
            <View><Button disabled={!input} onPress={createChat} title="Create new chat" /></View>
        </View>


    )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        padding: 10,
        height: "100%"
    },
})
