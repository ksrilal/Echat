import * as React from 'react';
import {Text, View, TextInput, TouchableOpacity, StyleSheet, Alert, AsyncStorage} from 'react-native';
//import {AsyncStorageStatic} from '@react-native-community/async-storage';
import User from '../../User';

const LoginScreen = ({navigation}) => {

    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');

async function submit(){
     if(phone.length != 12){
        Alert.alert('Error', 'Invalid Phone Number!');
     }
     else if(phone.length == 0){
        Alert.alert('Error', 'Phone Number Required!');
     }
     else if(phone.indexOf('+94',0) != 0) {
        Alert.alert('Error', 'Phone number first three digits must be +94');
     }
     else if(name.length < 1){
        Alert.alert('Error', 'Name Required!');
     }
     else{
        User.phone = phone;
        User.name = name;
        User.status = 'Hey there! I am using Echat.',
        // await AsyncStorage.setItem('userphone', phone);
        navigation.navigate("Verify");
        //alert(User.name);
    }
}

        return(
            <>
                    <View style={styles.container}>
                        <TextInput
                            placeholder="Phone Number: ex.+94711697614"
                            keyboardType='number-pad'
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                        />
                        <TextInput
                            placeholder="Name: ex. Isuru"
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />

                        <TouchableOpacity onPress={submit} >
                            <Text style={styles.btnText}>ENTER</Text>
                        </TouchableOpacity>   
                    </View>
                    <View style={styles.footer}>
                        <Text>Name: R.K.K. Srilal</Text>
                        <Text>Index No: 17001706</Text>
                    </View>
            </>        
        );
};

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F8FF',
    },
    container: {
        flex: 5,
        alignSelf: 'stretch',
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
