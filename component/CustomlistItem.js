import { StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
const CustomlistItem = ({ id, chatName, enterChat }) => {
    const [chatMessage, setChatMessage] = useState([]);
    useEffect(() => {
        const unsubscribe = db
            .collection('chat')
            .doc(id)
            .collection('message')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setChatMessage(snapshot.docs.map((doc) => doc.data()))
            });
        return unsubscribe;
    }, [])
    return (
        <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri: chatMessage[0]?.photoURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "bold" }}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {chatMessage?.[0]?.displayNmame}{chatMessage?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomlistItem

const styles = StyleSheet.create({})

