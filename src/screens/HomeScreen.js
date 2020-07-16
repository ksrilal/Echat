import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import User from '../../User';
import {auth, firebase, database, firestore} from '../../Setup';



const HomeScreen = ({navigation}) => {

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
            <FlatList
                data={users}
                renderItem={({ item }) => (
                <View style={styles.list}>
                    <TouchableOpacity onPress={() => navigation.navigate('Chat', item)}>
                        <Text style={styles.listTxt}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
      )}
    />      
        );
};



const styles = StyleSheet.create({
    list:{
        padding: 10,
        borderBottomColor: '#6495ED',
        borderBottomWidth: 1,

    },
    listTxt: {
        fontSize: 20,

    },
});

export default HomeScreen;
