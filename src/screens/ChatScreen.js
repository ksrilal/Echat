import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, FlatList, Alert } from 'react-native';
import {auth, firebase, database, firestore} from '../../Setup';
import User from '../../User';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

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
                                    // console.log('xxxxxxxxxxxx');
                                    // //console.log( moment(chat[1].createdAt - 23400000 ).toDate()); 
                                    // console.log(text[0].createdAt); 
                                    setChat(text);
                                    //console.log('huththo meka '+text); 
                                });  
          
            // Unsubscribe from events when no longer in use
            return () => subscriber(); 
          }, []);

        async function submit() {
            //console.log("submit works");

            if(message.length > 0){

                const time = Date.now();
                //const t = new Date();
                //const time = t.valueOf();
                console.log('time ' + time);

                firestore()
                .collection('messages')
                .doc(phone)
                .collection(User.phone)
                .add({ 
                    message,
                    createdAt: time,
                    from: User.phone,
                    to: phone,
                    flag: '',
                });

                firestore()
                .collection('messages')
                .doc(User.phone)
                .collection(phone)
                .add({
                    message,
                    createdAt: time,
                    from: User.phone,
                    to: phone,
                    flag: '',
                });

                setMessage('');
            }
            else console.log("no message");
        }

        function deleteMsg(id, msg, time, userPhone, flag) {

            if(userPhone===User.phone && flag!='deleted'){

                Alert.alert(
                    msg,
                    moment(time).format('h:mm a, YYYY/MM/DD'),
                    [
                    {
                        text: 'Delete',
                        onPress: () => {
                            console.log('Delete pressed');

                            firestore()
                            .collection('messages')
                            .doc(phone)
                            .collection(User.phone)
                            .doc(id)
                            .update({
                                flag: 'deleted'
                            })
                            .then(() => {
                                console.log('එකක් නම් ඩිලීට් කලා!');
                            });

                            
                            firestore()
                            .collection('messages')
                            .doc(User.phone)
                            .collection(phone)
                            .where('createdAt', '==', time)
                            .get()
                            .then(querySnapshot => {
                                
                                const temp = []; 
            
                                        querySnapshot.forEach(documentSnapshot => {
                                                temp.push({
                                                    ...documentSnapshot.data(),
                                                    key: documentSnapshot.id,
                                                });
                                            
                                        });
                                        console.log('xxxxxxxxxxxx');
                                        console.log(temp[0].key);

                                        firestore()
                                        .collection('messages')
                                        .doc(User.phone)
                                        .collection(phone)
                                        .doc(temp[0].key)
                                        .update({
                                            flag: 'deleted'
                                        })
                                        .then(() => {
                                            console.log('අනිකත් නම් ඩිලීට් කලා!');
                                        });
                                
                            });

                        }
                    },
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    ],
                    { cancelable: false }
                );
            }
        }


        const x = 'dcdcdcd';

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
                                backgroundColor: item.from===User.phone ? '#663399' : '#800080',
                                borderRadius: 5,
                                marginBottom: 10,
                            }}>
                                <TouchableOpacity onLongPress={()=>{deleteMsg(item.key, item.message, item.createdAt, item.from, item.flag)}}>
                                    <Text style={{color: '#eee', padding: 3, fontSize: 14}}>
                                        {moment(item.createdAt).format('h:mm a, YYYY/MM/DD')}
                                    </Text>
                                    {item.flag == 'deleted'?
                                        <Text style={{color: '#FFB6C1', padding: 7, fontSize: 18, fontStyle: "italic"}}>
                                            This message was deleted.
                                        </Text>: <Text style={{color: '#fff', padding: 7, fontSize: 22}}>
                                            {item.message}
                                        </Text>
                                    }
                                </TouchableOpacity>
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
