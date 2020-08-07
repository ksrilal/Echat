import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import User from '../../User';
import {auth, firebase, database, firestore} from '../../Setup';
import Icon from 'react-native-vector-icons/FontAwesome5';


const HomeScreen = ({navigation}) => {

    React.useLayoutEffect(() => {

        navigation.setOptions({
            title: 'EChat',
            headerStyle: {
                backgroundColor: '#8A2BE2',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            headerLeft: null,
            headerRight: () => (
            <TouchableOpacity style={{paddingRight: 10}} onPress={() => navigation.navigate("Profile")}>
                <Icon name="user" size={35} color="#fff" />
            </TouchableOpacity>
            ),
        });
      }, [navigation]);

    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users

    useEffect(() => {
        const subscriber = firestore()
                            .collection('users')
                            .onSnapshot(querySnapshot => {
                                const users = [];
       
                                querySnapshot.forEach(documentSnapshot => {
                                    if(documentSnapshot.id!=User.phone){
                                        users.push({
                                            ...documentSnapshot.data(),
                                            key: documentSnapshot.id,
                                        });
                                    }
                                    
                                });
      
                                setUsers(users);
                                setLoading(false);
                                console.log(User.name);
                            }); 
      
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, []);

    if (loading) {
        return <ActivityIndicator />;
    }

        return(
            <>
                <View style={styles.container} >
                    <FlatList
                    data={users}
                    renderItem={({ item }) => (
                        <View style={styles.list}>
                            <TouchableOpacity onPress={() => navigation.navigate('Chat', item)}>
                                <Text style={styles.listTxt}><Icon name="comments" size={35} color="#6495ED" />  {item.name} ({item.key})</Text>
                                <Text style={styles.statusTxt} >{item.status}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                /> 
                </View>
                <View style={styles.footer}>
                    <Text>Name: R.K.K. Srilal</Text>
                    <Text>Index No: 17001706</Text>
                </View>
            </>
        );
};



const styles = StyleSheet.create({
    container: {
        flex: 9,
    },
    footer: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F8FF',
    },
    list:{
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 5,
        paddingTop: 10,
        borderBottomColor: '#6495ED',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    listTxt: {
        flexDirection: 'row',
        fontSize: 22,
        color: '#6495ED',
    },
    statusTxt: {
        textAlign: 'right',
        color: '#8A2BE2',
        paddingRight: 10,
        borderRadius: 5,
        fontSize: 16,
    },
});

export default HomeScreen;
