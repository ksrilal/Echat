import React from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, Text } from 'react-native';
import {auth, firebase, database, firestore} from '../../Setup';
import User from '../../User';
import Icon from 'react-native-vector-icons/FontAwesome5';


const ProfileScreen = ({navigation}) => {

    const [status, setStatus] = React.useState('');
    const [name, setName] = React.useState('');

    async function editName(){
        if(name.length < 1){
           Alert.alert('Error', 'Name Required!');
        }
        else{
           User.name = name;

            firestore()
            .collection('users')
            .doc(User.phone)
            .set({
                phone: User.phone,
                name: User.name,
                status: User.status,
            })
            .then(() => {
                console.log('Name edited!');
            });

            setName('');
        }
   }

   async function editStatus(){
    if(status.length < 1){
        User.status = null;
    }
    else{
       User.status = status;

            firestore()
            .collection('users')
            .doc(User.phone)
            .set({
                phone: User.phone,
                name: User.name,
                status: User.status,
            })
            .then(() => {
                console.log('status edited!');
            });

            setStatus('');
   }
}

    return (
        <View style={styles.container}>

            <View style={styles.container_avatar}>
                <Icon name="user-edit" size={150} color="#6495ED" />
            </View>

            <View style={styles.container_detail}>
                <View style={styles.container_edit}>
                    <Text style={styles.btnText}>Name</Text>
                    <TextInput
                        placeholder={User.name}
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                    />
                    <TouchableOpacity style={{paddingLeft: 10, paddingBottom: 10}} onPress={editName} >
                        <Icon name="pencil-alt" size={30} color="#6495ED" />
                    </TouchableOpacity> 
                </View>
                
                <View style={styles.container_edit}>
                    <Text style={styles.btnText}>Status</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={2}
                        placeholder={User.status}
                        style={styles.input}
                        value={status}
                        onChangeText={setStatus}
                    />
                    <TouchableOpacity style={{paddingLeft: 10, paddingBottom: 10}} onPress={editStatus} >
                        <Icon name="pencil-alt" size={30} color="#6495ED" />
                    </TouchableOpacity> 
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_avatar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_detail: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_edit: {
        flexDirection: 'row',
        width: '80%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#6495ED',
        width: '60%',
        color: '#6495ED',
        fontSize: 20,
        marginBottom: 10,
        borderRadius: 5,
    },
    btnText: {
        fontSize: 22,
        color: '#6495ED',
        marginBottom: 15,
        marginRight: 8,
    },
});

export default ProfileScreen;

