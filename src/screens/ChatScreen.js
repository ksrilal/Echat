import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import {auth, firebase, database, firestore} from '../../Setup';
import User from '../../User';
import Icon from 'react-native-vector-icons/FontAwesome5';

    const ChatScreen = ({route, navigation}) => {

        React.useLayoutEffect(() => {
            navigation.setOptions({
                headerStyle: {
                    backgroundColor: '#8A2BE2',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                headerRight: () => (
                <TouchableOpacity style={{paddingRight: 10}} onPress={() => navigation.navigate("Profile")}>
                    <Icon name="user" size={35} color="#fff" />
                </TouchableOpacity>
                ),
            });
          }, [navigation]);



        const [message, setMessage] = useState('');

        const {name} = route.params;
        const {phone} = route.params;   //this name and phone is from receiver 
        //console.log(phone + " here " + name);
        const [chat, setChat] = useState([]);

        useEffect(() => {
            const subscriber = firestore()
                                .collection('messages')
                                .doc(phone)
                                .collection(User.phone)
                                .orderBy('createdAt')
                                .onSnapshot(querySnapshot => {
                                    const text = []; 
          
                                    querySnapshot.forEach(documentSnapshot => {
                                            text.push({
                                                ...documentSnapshot.data(),
                                                key: documentSnapshot.id,
                                            });
                                        
                                    });
          
                                    setChat(text);
                                    //console.log(text); 
                                }); 
          
            // Unsubscribe from events when no longer in use
            return () => subscriber();
          }, []);

        async function submit() {
            //console.log("submit works");

            if(message.length > 0){

                const time = firebase.firestore.FieldValue.serverTimestamp();
                //const t = new Date(createdAt);
                console.log('time ' + time);

                firestore()
                .collection('messages')
                .doc(phone)
                .collection(User.phone)
                .add({
                    message,
                    createdAt: time,
                    from: User.phone,
                    to: phone
                });

                firestore()
                .collection('messages')
                .doc(User.phone)
                .collection(phone)
                .add({
                    message,
                    createdAt: time,
                    from: User.phone,
                    to: phone
                });

                setMessage('');
            }
            else console.log("no message");
        }


        return(
            <View style={styles.container}>

                <View style={styles.container_get}>
                    <FlatList
                        data={chat}
                        renderItem={({ item }) =>(
                            <View style={{
                                flexDirection: 'row',
                                width: '60%',
                                alignSelf: item.from===User.phone ? 'flex-end' : 'flex-start',
                                backgroundColor: item.from===User.phone ? '#008080' : '#40E0D0',
                                borderRadius: 5,
                                marginBottom: 10,
                            }}>
                                <Text style={{color: '#fff', padding: 7, fontSize: 22}}>
                                    {item.message}
                                </Text>
                                <Text style={{color: '#eee', padding: 3, fontSize: 14}}>
                                   {item.from}
                                </Text>
                            </View>
                        )}
                    /> 
                </View>

                <View style={styles.container_send}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Type Message here..."
                        value={message}
                        onChangeText={setMessage}
                    />

                    <TouchableOpacity onPress={submit}>
                        <Text style={styles.btnText}>
                            <Icon name="paper-plane" size={35} color="#6495ED" />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
        
    };

    //let {height, width} = Dimensions.get('window');

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 5,

        },
        container_get: {
            flex: 5,
            flexDirection: 'row',
        },
        container_send: {
           // height: height * 1.5,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5,
        },
        input: {
            padding: 10,
            borderWidth: 1,
            borderColor: '#6495ED',
            width: '80%',
            color: '#6495ED',
            fontSize: 18,
            marginBottom: 10,
            borderRadius: 5,
        },
        btnText: {
            fontSize: 30,
            color: '#6495ED',
            padding: 5,
            marginBottom: 10,
        },
    });
    
    export default ChatScreen;
