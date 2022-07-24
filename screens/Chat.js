import { useRoute } from '@react-navigation/native';
import React, { useState, useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { SafeAreaView } from "react-native-safe-area-context";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const Chat = () => {
  const route = useRoute();

  const [messages, setMessages] = useState([]);

  const [uid, setUID] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      setUID(user?.uid)
      setName(user?.displayName)
    })
  }, [])

  useEffect(() => {
    return firebase
    .firestore()
    .doc("chats/" + route.params.chatId)
    .onSnapshot((snapshot) => {
      setMessages(snapshot.data()?.messages ?? []);
    });
  }, [route.params.chatId]);

  const onSend = (m = []) => {
    firebase.firestore()
    .doc("chats/" + route.params.chatId)
    .set({
      messages: GiftedChat.append(messages, m)
    }, 
    {merge: true}
    );
  };

return (
  <View style={{flex: 1, backgroundColor: "lightgrey"}}>
    <GiftedChat
        messages={messages.map(x => ({...x, createdAt: x?.createdAt?.toDate(),
        }))}
        onSend={messages => onSend(messages)}
        user={{
          _id: uid,
          name: name,
        }}
    />
  </View>
  )
}

export default Chat;