# Echat
React-native, Firebase chat app.

## Installe apk & User Instruction
        buildToolsVersion = 29.0.2
        minSdkVersion = 16
        compileSdkVersion = 29
        targetSdkVersion = 29

When apk file is installed  in phone that is sdk version above 16(Jelly Bean), it can be seen in phone as other apps.
After opening app, login page show up.
This app includes phone number authentication firebase auth service.
Phone authentication allows users to sign in to Firebase using their phone as the authenticator.
An SMS message is sent to the user via their phone number containing a unique code.
For using this phone authentication service, developer need to upgrade service provider’s pricing plan.
Developer can use 10 phone numbers with 10 codes free for testing but firebase not provide SMS service for that.

https://firebase.google.com/docs/auth/android/phone-auth    
https://firebase.google.com/pricing   
https://rnfirebase.io/auth/phone-auth   

In this app, developer used free firebase phone authentication service.
So tested phone number and codes as below.

      +94 123 456 789  --  123456
      +94 111 222 333  --  123456
      +94 123 222 123  --  123456
      +94 321 321 321  --  123456
      +94 71 929 4679  --  123456
      +94 123 123 333  --  123456
      +94 123 123 123  --  123456
      +94 100 200 300  --  123456
      +94 111 123 123  --  123456
      +94 333 222 111  --  123456

For accessing to the app, in this case user need to use a phone number and code in above list.
Enter phone number and name to access.
Then user can see page  with a button. After pressing “GET VERIFY CODE” button, if phone number is correct, input box will show.
Enter code (in this case it will be 123456) in here and press “COMFIRMED CODE” button.
Then user can see home (contacts list) page.
Pressing on a contact, user can move to the chat. And user can type text and send.
After long pressing on a message, delete message will pop up. Then user can delete that message.
User can see Profile icon right side on header in both home (contacts list page) and any chat page. 
After pressing this user can move to user’s profile page. User cannot input empty string as name but status field can be empty.
User can edit those field using edit button right side at an input field.
App's screenshots are here...   
https://github.com/ksrilal/Echat/tree/master/screenshot

## Set up the react-native project and execute.
Need to setting up pc for React Native CLI. See environment setting up in here...   
https://reactnative.dev/docs/environment-setup
       
After setting up development environment, download the project from github. Then,

       cd Echat
       npm install
       npx react-native start
       npx react-native run-android
       
## Technologies
“react-moment” package was used to handle date & time in this app except react-native and firestore/firebaseauth.   
https://www.npmjs.com/package/react-moment    
https://momentjs.com/

## Assumptions
Developer need to use phone numbers and codes mentioned in "Installe apk & User Instruction" section for testing purposes.
This app for users like working in some office and user cannot delete his account using this app.
When a user logged in, this app show all other users in contact list.
