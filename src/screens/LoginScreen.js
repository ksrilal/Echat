import * as React from 'react';
import {Text, View, TextInput, TouchableOpacity, StyleSheet, Alert, AsyncStorage} from 'react-native';
//import {AsyncStorageStatic} from '@react-native-community/async-storage';
import User from '../../User';

const LoginScreen = ({navigation}) => {

    const [phone, setPhone] = React.useState('');
    const [name, setName] = React.useState('');


async function submit(){
     if(phone.length < 10){
        Alert.alert('Error', 'Wrong Phone Number!');
     }
     else if(phone.length == 0){
        Alert.alert('Error', 'Phone Number Required!');

     }
     else if(name.length < 1){
        Alert.alert('Error', 'Name Required!');
     }
     else{
        User.phone = phone;
        User.name = name;
        // await AsyncStorage.setItem('userphone', phone);
        navigation.navigate("Verify");
        //alert(User.name);
    }
}

        return(
            <View style={styles.container}>
                <TextInput
                    placeholder="Phone Number"
                    keyboardType='number-pad'
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                />
                <TextInput
                    placeholder="Name"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />

                <TouchableOpacity onPress={submit} >
                    <Text style={styles.btnText}>ENTER</Text>
                </TouchableOpacity>   
            </View>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F8FF',
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#6495ED',
        width: '90%',
        color: '#6495ED',
        fontSize: 20,
        marginBottom: 10,
        borderRadius: 5,
    },
    btnText: {
        fontSize: 20,
        color: '#6495ED',
    },
});

export default LoginScreen;
