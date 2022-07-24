import React, { useState } from "react";
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import { SafeAreaView} from "react-native-safe-area-context";
import { colors } from "../config/constants";
import { Subheading } from "react-native-paper";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import SignIn from "./SignIn";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const navigation = useNavigation();

    const createAccount = async () => {
        setIsLoading(true)
       try {
        const response = await firebase
       .auth()
       .createUserWithEmailAndPassword(email, password);

       await response.user.updateProfile({displayName: name});
       navigation.popToTop();
    }  catch (e) {
        setIsLoading(false)
        setError(e.message);
       }
    };

    return (
        <View style={styles.container}>
         <SafeAreaView>
            
          <View style={styles.contentContainer}>
           <Text style={styles.title}> Create a new account</Text>
           {!!error && (
           <Subheading style={{color: 'red', textAlign: 'center',}}>{error}</Subheading>)}
            <TextInput 
            style={styles.input} 
            placeholder="Enter your name"
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            /> 
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
            placeholder="Set a new password" 
            label="Password"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            />    
         
          <View style={styles.buttonsContainers}>
          
           <Button
           title="Sign Up"
           mode='contained'
           onPress={() => createAccount()} 
           loading={isLoading}
           />
            </View>
            </View>  
          <View style={styles.bottomContentContainer}>  
          <View>
          <Text style={styles.title}> Already have an account?</Text>
          <View style={styles.signinButtonContainer}>
           <Button  
           title="Sign In" 
           loading={isLoading}
           color="lightgrey"
           onPress={() => navigation.navigate("SignIn")}
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
    bottomContentContainer: {
        padding: 32,
        marginTop: 30,
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
        justifyContent: "flex-end",
        marginTop: 32,
        borderRadius: 25,
    },
    button: {
        paddingVertical: 30,
        borderRadius: 16,
        fontSize: 18,
    },
})

export default SignUp;