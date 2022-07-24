import React, { useState } from "react";
import {Text, View, StyleSheet, TextInput, Button, Touchable} from 'react-native';
import { SafeAreaView} from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from "../config/constants";
import { Subheading } from "react-native-paper";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const navigation = useNavigation();


    const signin = async () => {
        setIsLoading(true)
       try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
       navigation.popToTop();
    } catch (e) {
        setIsLoading(false)
        setError(e.message);
       }
    };

    return (
        <View style={styles.container}>
         <SafeAreaView>
            
          <View style={styles.contentContainer}>
           <Text style={styles.title}> Sign In</Text>
           {!!error && (
           <Subheading style={{color: 'red', textAlign: 'center',}}>{error}</Subheading>)}
            <TextInput 
            style={styles.input} 
            placeholder="Enter your e-mail" 
            label="E-Mail"
            value={email}
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            />   
            <TextInput
            style={styles.input} 
            placeholder="Enter your password" 
            label="Password"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            />
         
          <View style={styles.buttonsContainers}>
          
           <Button
           title="Sign In"
           mode='contained'
           onPress={() => signin()} 
           loading={isLoading}
           />
            </View>
          </View>  
          <View style={styles.contentContainer}>  
          <View>
          <Text style={styles.title}>Do not have an account?</Text>
          <View style={styles.signupButtonContainer}>
          <Button  
           title="Sign Up" 
           loading={isLoading}
           compact
           onPress={() => navigation.navigate("Signup")}
           /></View>
          </View></View>  
         </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1,
    },
    title: {
        fontSize: 26,
        color: 'white',
        fontWeight: "600",
        marginBottom: 16,
    },
    contentContainer: {
        padding: 32,
    },
    input: {
        backgroundColor: 'white',
        fontSize: 16,
        marginTop: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 16,
    },
    buttonsContainers: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 32,
        borderRadius: 25,
    },
    button: {
        paddingVertical: 30,
        borderRadius: 16,
        fontSize: 18,
    },
})

export default SignIn;