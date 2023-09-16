import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native'
import React from 'react'
import colors from '../config/colors'
import LoginButton from '../component/LoginButton'
import routes from '../navigation/routes'

export default function Welcome({ navigation }) {
    return (
        <ImageBackground
            style={styles.background}
            blurRadius={5}
            source={{
                uri: "https://images.unsplash.com/photo-1650374637270-c618f707cc07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=366&q=80"
            }}
        >
            <View style={styles.logContainer}>
                <Text style={styles.tagLine}>Welcome Namaste</Text>
            </View>


            <View style={styles.buttonContainer} >
                <LoginButton title="Login" onPress={() => navigation.navigate(routes.LOGIN)} />
                <LoginButton title="Register" color="secondary" onPress={() => navigation.navigate(routes.REGISTER)} />
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: 360,
        resizeMode: 'contain',
        height: 780,
        justifyContent: 'flex-end',
        alignItems: 'center'

    },
    buttonContainer: {
        padding: 20,
        width: '100%'
    },
    logo: {
        width: 100,
        height: 100,


    },
    logContainer: {
        position: 'absolute',
        top: 70,
        alignItems: 'center'
    },
    tagLine: {
        fontSize: 25,
        fontWeight: "600",
        paddingVertical: 20,
        color: colors.white
    }
})