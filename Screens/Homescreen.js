import { ScrollView, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react';
import CustomlistItem from '../component/CustomlistItem';
import { Avatar } from 'react-native-elements';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { auth, db } from '../firebase';
import { StatusBar } from 'expo-status-bar';
const Homescreen = ({ navigation }) => {
    const [chat, setChat] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        });
        alert('Logout successfully')
    };
    useEffect(() => {
        const unsubcribe = db.collection('chat').onSnapshot(snapshot => {
            setChat(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
        return unsubcribe;
    }, [])
    //
    // const status = '<StatusBar style="auto" />'
    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: '#bdc3c7' },
            headerTitleStyle: { color: "#000" },
            headerTintColor: "#000",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} headerTitle="Logout" />

                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camera" size={24} color="#28388f" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddChat')}
                        activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} color="#28388f" />
                    </TouchableOpacity>
                </View>
            )
        });

    }, [navigation])
    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id,
            chatName,
        });
    };
    return (
        <SafeAreaView >

            <ScrollView style={styles.container} >
                {chat.map(({ id, data: { chatName } }) => (
                    <CustomlistItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}

            </ScrollView>
        </SafeAreaView>
    )
}

export default Homescreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000'
    }
})
