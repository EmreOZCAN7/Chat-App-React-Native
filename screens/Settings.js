import React, {useEffect, useState} from 'react';
import {Text, View, BackHandler} from 'react-native';
import { colors } from '../config/constants';
import Cell from '../components/Cell';
import { Avatar, Title, Subheading, Button, Portal, Dialog } from 'react-native-paper';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useNavigation } from '@react-navigation/native';

const Settings = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setName(user?.displayName);
            setEmail(user?.email);
            user.displayName
            user.email
        })
    }, []);

    const navigation = useNavigation();

    const signoutProcess = () => {
        firebase.auth().signOut()
        };
        
    const navigateProcess = () => {
        return(
        navigation.navigate("SignIn")
        )  };
        
    const signoutButton = () => {
        navigateProcess();
        signoutProcess();
         } ; 
    const [isDialogVisible, setIsDialogVisible] = useState(false)
    const [isSureDialogVisible, setIsSureDialogVisible] = useState(false)

    return (
        <View style={{alignItems: "center", marginTop: 20}}>
            <Avatar.Text label={name.split(' ').reduce((prev, current) => `${prev}${current[0]}`,'')} />
            <Title>{name}</Title>
            <Subheading>{email}</Subheading>
            <Button onPress={signoutButton}>Sign Out</Button>
            <Cell
                title="Info"
                icon="help-outline"
                tintColor={colors.primary}
                onPress={() => setIsDialogVisible(true)}
                style={{backgroundColor: "lightgrey",}}
                />
                <Portal>
    <Dialog 
    onDismiss={() => setIsDialogVisible(false)}
    visible={isDialogVisible}>
    <Dialog.Title>Info</Dialog.Title>
            <Dialog.Content>
           <Text>Coded by Emre Özcan</Text>
           <Text>github/EmreOZCAN7</Text>
            </Dialog.Content>
            <Dialog.Actions>
            <Button 
            onPress={() => setIsDialogVisible(false)}
            >Close</Button>
             <Button 
            onPress={() => setIsSureDialogVisible(true)}
            >Quit App</Button>
            </Dialog.Actions>
    </Dialog>
  </Portal>

  <Portal>
    <Dialog 
    onDismiss={() => setIsSureDialogVisible(false)}
    visible={isSureDialogVisible}>
    <Dialog.Title>Are you sure want to quit ?</Dialog.Title>
            <Dialog.Content>
           
           
            </Dialog.Content>
            <Dialog.Actions>
            <Button 
            onPress={() => setIsSureDialogVisible(false)}
            style={{marginEnd: 10}}
            >No</Button>
             <Button 
            onPress={() => BackHandler.exitApp()}
            style={{backgroundColor: colors.primary}}
            color={'#fff'}
            >Yes, Quit</Button>
            </Dialog.Actions>
    </Dialog>
  </Portal>
        </View>
    )
};
      
export default Settings;