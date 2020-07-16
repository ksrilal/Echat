import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import {auth, firebase, database, firestore} from '../../Setup';
import User from '../../User';

    const ChatScreen = ({route, navigation}) => {

        const [message, setMessage] = useState('');

        const {name} = route.params;
        const {phone} = route.params;
        //console.log(phone + " here " + name);

        async function submit() {
            //console.log("submit works");

            if(message.length > 0){

                const time = firestore.Timestamp.now();
                console.log('time' + time);

                firestore()
                .collection('messages')
                .doc(phone)
                .collection(User.phone)
                .add({
                    message,
                    time,
                    senderName: User.name,
                    receiverName: name
                });

                setMessage('');
            }
            else console.log("no message");
        }

        return(
            <SafeAreaView>
                <View style={styles.container}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Type Message here..."
                        value={message}
                        onChangeText={setMessage}
                    />

                    <TouchableOpacity onPress={submit}>
                        <Text style={styles.btnText}>SEND</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
        
    };

    const styles = StyleSheet.create({
        container:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 15,
        },
        input: {
            padding: 15,
            padding: 10,
            borderWidth: 1,
            borderColor: '#6495ED',
            width: '80%',
            color: '#6495ED',
            fontSize: 20,
            marginBottom: 10,
            borderRadius: 5,
        },
        btnText: {
            fontSize: 20,
            color: '#6495ED',
            padding: 10,
        },
    });
    
    export default ChatScreen;
