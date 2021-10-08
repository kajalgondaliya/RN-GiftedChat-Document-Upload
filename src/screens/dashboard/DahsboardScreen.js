import React, { useState, useEffect, useCallback, useLayoutEffect, useRef } from 'react';
import { View, StyleSheet, Text, Button, Dimensions, Image, PermissionsAndroid, Alert, TouchableOpacity, Platform } from 'react-native';
import { Bubble, GiftedChat, Actions } from 'react-native-gifted-chat';
import firebase from '@react-native-firebase/app';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';

const DashboardScreen = (props) => {
    const { navigation } = props;
    const [messages, setMessages] = useState([]);
    const [pdfPath, setPdfPath] = useState();

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, []);


    useLayoutEffect(() => {
        const unsubscribe = firebase.firestore().collection('chats').orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data().id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
                file_type: doc.data()?.file_type,
                file: doc.data()?.file,
                file_name: doc.data()?.file_name
            }))
        ));
    }, []);

    useEffect(async () => {
        await
            firebase.
                firestore()
                .collection("users")
                .doc(props.route.params.userId)
                .collection("contacts")
                .doc('1EV9HaDa9YNGdAR9E61op4TMxfx1')
                .set({
                    name: 'test@'
                })

    }, [])

    const actualDownload = () => {
        const { dirs } = RNFetchBlob.fs;
        RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mediaScannable: true,
                title: `gifted_chat.pdf`,
                path: `${dirs.DownloadDir}/gifted_chat.pdf`,
            },
        })
            .fetch('GET', 'https://firebasestorage.googleapis.com/v0/b/rngiftedchat-96d40.appspot.com/o/docFiles%2F123roadmap.pdf?alt=media&token=c53e9d5f-506a-48e7-afaa-2ffa19665629', {})
            .then((res) => {
                setPdfPath(res.path());
                console.log('The file saved to ', res.path());
            })
            .catch((e) => {
                console.log(e)
            });
    }

    const downloadFile = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                actualDownload();
            } else {
                Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
            }
        } catch (err) {
            console.warn(err);
        }
    }


    const onSend = useCallback((messages = []) => {

        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        const { _id, createdAt, text, user } = messages[0]
        firebase.firestore().collection('chats').add({ id: _id, createdAt: createdAt, text: text, user: user })
    }, [])


    const openPDFView = () => {
        FileViewer.open('/storage/emulated/0/Download/gifted_chat.pdf', { showOpenWithDialog: true })
            .then(() => {
              console.log("Open file");
            })
            .catch(error => {
                console.log("Error",error);

            });
    }

    const renderActions = (props) => {
        return (
            <Actions
                {...props}
                options={{
                    ['Document']: async (props) => {
                        try {
                            const result = await DocumentPicker.pick({
                                type: [DocumentPicker.types.pdf],
                            });
                            let imageRef = storage().ref(`docFiles/${result[0].name}`);
                            let filename = result[0].uri;
                            const response = await fetch(filename);
                            const blob = await response.blob();
                            await imageRef.put(blob);
                            var dwnload = await imageRef.getDownloadURL();
                            firebase.firestore().collection('chats').add({ id: "fe9527a3-bb0c-4baa-9961-d945b5256b2s", createdAt: new Date(), file_type: 'pdf', file: dwnload, file_name: result[0].name })

                        } catch (e) {
                            if (DocumentPicker.isCancel(e)) {
                                console.log("User cancelled!")
                            } else {
                                throw e;
                            }
                        }

                    },
                    Cancel: (props) => { console.log("Cancel") }
                }}
                onSend={args => console.log(args)}
            />
        )
    };




    const renderCustomView = (props) => {
        if (props?.currentMessage?.file_type === 'pdf') {
            const source = { uri: props?.currentMessage?.file, cache: true };
            return (

                <View style={{ backgroundColor: '#DCDCDC', flexDirection: 'row', width: "100%" }}>
                    <TouchableOpacity style={{ flexDirection: "row", width: "80%" }} onPress={openPDFView}  >
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('./../../../pdf.png')}
                        />
                        <Text style={{ marginLeft: 20, width: '60%', fontWeight: 'bold' }}>{props.currentMessage.file_name}</Text>

                    </TouchableOpacity>

                    <TouchableOpacity onPress={downloadFile}>
                        <Image
                            style={{ height: 40, width: 40 }}
                            source={require('./../../../download.png')}
                        />
                    </TouchableOpacity>

                </View >
            )
        }
        else {
            console.log("File Type not ==>");

        }

    }

    const userSignout = () => {
        try {

            firebase.auth().signOut().then(() => {
                console.log("user sign out");
                navigation.navigate('Home');
            })
        }
        catch (e) {
            console.log("Error", e)
        }
    }

    return (
        <View style={styles.container}>
            <Text>Home screen!!</Text>
            <View style={{ backgroundColor: '#000', width: '25%', alignSelf: 'flex-end' }}>
                <Button title='sign-out' color='#FFFF' onPress={() => userSignout()} />
            </View>

            <View style={{ width: '110%', height: '90%' }}>
                <GiftedChat
                    messages={messages}
                    showAvatarForEveryMessage={true}
                    onSend={messages => onSend(messages)}
                    renderActions={(messages) => renderActions(messages)}
                    user={{
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    }}
                    renderCustomView={renderCustomView}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    button: {
        width: 450,
        marginTop: 10
    }
});

export default DashboardScreen;
