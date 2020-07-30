import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import {auth, firebase, database, firestore} from '../../Setup';
import User from '../../User';

const PhoneSignIn = ({navigation}) => {

    // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      console.log(confirm);

      firestore()
      .collection('users')
      .doc(User.phone)
      .set({
        phone: User.phone,
        name: User.name,
        status: "Hey there! I am using Echat.",
      })
      .then(() => {
      console.log('User added!');
  });

      // firebase.database().ref('users/'+ User.phone).set({name: User.name})
      // .then(() => console.log('Data set.'));
      User.confirm = true;
      console.log(User.confirm);
      navigation.navigate("Home");
    } catch (error) {
      console.log('Invalid code.');
    }
  }  

  if (!confirm) {
      console.log(User.phone);
    return (
      <View style={styles.container}>
        <Button
          title="Get verify code"
          color='#8A2BE2'
          onPress={() => signInWithPhoneNumber(User.phone)}
        />
      </View>
    );
  }

    return(
        <View style={styles.container}>
            <TextInput
              keyboardType='number-pad'
              placeholder="6-digit code"
              value={code} style={styles.input}
              onChangeText={text => setCode(text)}
            />
            <Button title="Confirm Code" color='#8A2BE2' onPress={() => confirmCode()} />
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
    width: '50%',
    color: '#6495ED',
    fontSize: 20,
    marginBottom: 20,
    borderRadius: 5,
    textAlign: 'center',
},
});

export default PhoneSignIn;

