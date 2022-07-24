import React, {useState, useEffect} from "react";
import {View, StyleSheet} from "react-native";
import { List, TextInput, Avatar, Divider, FAB, Portal, Dialog, Button } from 'react-native-paper';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../config/constants";

const ChatList = () => {

  const [isDialogVisible, setIsDialogVisible] = useState(false)

const [email, setEmail] = useState('')
const [userEmail, setUserEmail] = useState('');

useEffect(() => {
  firebase.auth().onAuthStateChanged(user => {
setEmail(user?.email ?? "");
  })
}, []);

const [isLoading, setIsLoading] = useState(false);

const navigation = useNavigation();

const createChat = async () => {
  if(!email || !userEmail) return;
  setIsLoading(true);
  const response = await firebase
  .firestore()
  .collection('chats')
  .add({
    users: [email, userEmail],
  });
  setIsLoading(false);
  setIsDialogVisible(false);
  navigation.navigate("Chat", {chatId: response.id});
}

const [chats, setChats] = useState([]);
useEffect(() => {
  return firebase
  .firestore()
  .collection("chats")
  .where("users", "array-contains", email)
  .onSnapshot((querySnapshot) => {
    setChats(querySnapshot.docs);
  });
}, [email]);

    return (
      <View style={{flex: 1}}>
       {chats.map((chat) => (
        <React.Fragment>
          <List.Item
            title={chat
              .data()
              .users
              .find((x) => x !== email)}
            description={(chat.data().messages ?? [])[0]?.text ?? '"#No Messages Yet"'}
            left={() => ( 
            <Avatar.Text 
            label={chat
              .data()
              .users
              .find(x => x !== email)
              .split(' ')
              .reduce((prev, current) => prev + current[0], "")}
             size={56}
          />
       )}
       onPress={() => navigation.navigate("Chat", {chatId: chat.id})}
       />
        <Divider inset style={{backgroundColor: "green"}} />
      </React.Fragment>
  ))}       

  

  <Portal>
    <Dialog 
    onDismiss={() => setIsDialogVisible(false)}
    visible={isDialogVisible}>
    <Dialog.Title>New Chat</Dialog.Title>
            <Dialog.Content>
           <TextInput 
           label="Enter User E-Mail"
           value={userEmail}
           onChangeText={text => setUserEmail(text)}
           />
            </Dialog.Content>
            <Dialog.Actions>
            <Button 
            onPress={() => setIsDialogVisible(false)}
            >Cancel</Button>
              <Button 
              onPress={() => createChat()}
              loading={isLoading}
              >Add</Button>
            </Dialog.Actions>
    </Dialog>
  </Portal>

  <FAB 
  icon="plus" 
  style={styles.fab}
  onPress={() => setIsDialogVisible(true)}
  />
   </View>
    );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
  },})

export default ChatList;