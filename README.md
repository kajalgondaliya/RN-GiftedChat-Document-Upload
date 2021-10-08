###### React-native with gifed_chat
- The most complete chat UI for React Native to send Messages and upload documents.

- React-native-gifted-chat for chat UI. To store messages and documents we need to use firebase for real time experience.
- In this project I've been using firebase/firestore to manage messages.
- To upload documents in gifted_chat we need to import a package like document picker or file picker to pick a file and after that we need to store that file in 
  firebase/storage from where we'll get an uplaod link.
- After document is uploaded in the storage we need to store that link in firebase/firestore.
- Messages can be easily displayed in UI but for document(s) upload we need to create custom PDF view in gifted-chat.
- There are some properties available in gifted-chat using which we can create custom view.

###### Dependencies

- @react-native-firebase/app
- @react-native-firebase/auth
- @react-native-firebase/firestore
- @react-native-firebase/storage
- react-native-document-picker
- react-native-file-viewer


###### Installation

- yarn add react-native-gifted-chat
- yarn add @react-native-firebase/app (Further Installtion link : https://rnfb-docs.netlify.app)
- yarn add @react-native-firebase/firestore (Further Installtion link : https://rnfb-docs.netlify.app/firestore/usage)
- yarn add @react-native-firebase/storage (Further Installtion link : https://rnfb-docs.netlify.app/storage/usage)
- yarn add react-native-document-picker
- yarn add react-native-file-viewer

###### Demo Example
<!-- ![chat_screen](https://user-images.githubusercontent.com/41906092/136560349-0123f878-f63e-4abd-b60d-b4b504a6b2c2.jpeg){:height="50%" width="50%"} -->
<img src="https://user-images.githubusercontent.com/41906092/136560349-0123f878-f63e-4abd-b60d-b4b504a6b2c2.jpeg" width="300" height="600">
