import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View, SafeAreaView, Image, ScrollView, Text, TouchableOpacity, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSpeechRecognition } from 'react-native-voicebox-speech-rec';
import { useCheckSpeechRecPermissions, useRequestSpeechRecPermissions, } from './SpeechRecordPermissions.tsx';
import { theme } from "../..";
import { RESULTS } from "react-native-permissions";
import { MicrophoneButton, ButtonToolTips } from "./";
import apiCall from "../../API/chatGPT.tsx";
import Tts from 'react-native-tts';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const MainTalkScreen = () => {
    const [messages, setMessage] = useState<Message[]>([]);
    const [speaking, setSpeaking] = useState(false);
    const [isInConversationMode, setIsInConversationMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userMicPermissionGranted, setUserMicPermissionGranted] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const clear = () => {
        setMessage([]);
        Tts.stop();
        setSpeaking(false);
        setLoading(false)
    }

    const stopSpeaking = () => {
        Tts.stop();
        setSpeaking(false);
    }

    const {
        startSpeechRecognition,
        stopSpeechRecognition,
        cancelSpeechRecognition,

        speechContentRealTime,

        setSpeechRecErrorHandler,
        setSpeechRecStartedHandler,
        setSpeechRecCompletedHandler,
    } = useSpeechRecognition();

    useEffect(() => {
        Tts.setDefaultLanguage('en-GB');
        Tts.setDefaultRate(0.5);
        Tts.addEventListener('tts-start', (event) => console.log("start", event));
        Tts.addEventListener('tts-progress', (event) => console.log("progress", event));
        Tts.addEventListener('tts-finish', (event) => { console.log("finish", event), setSpeaking(false) });
        Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));
    }, []);

    const conversationCancelledByUser = useRef(false);

    useEffect(() => {
        setSpeechRecStartedHandler(() => {
            console.log('Speech Recognition Started.');
        });
    }, [setSpeechRecStartedHandler]);

    useEffect(() => {
        setSpeechRecErrorHandler((errorMessage: any) => {
            Alert.alert(
                'Error in speech recognition',
                String(errorMessage),
                [
                    {
                        text: 'OK',
                        style: 'cancel',
                    },
                ],
                { cancelable: false }
            );
        });
    }, [setSpeechRecErrorHandler]);

    useEffect(() => {
        setSpeechRecCompletedHandler(async (userChatMessage: string) => {
            if (conversationCancelledByUser.current) {
                return;
            }

            let trimmedMessage = userChatMessage.trim();

            if (trimmedMessage.length > 0) {
                console.log('Recognized Content: ', trimmedMessage);

                fetchResponse(trimmedMessage);

            } else {
                console.log('User spoke nothing.');
            }
        });

    }, [setSpeechRecCompletedHandler, messages]);

    const fetchResponse = (trimmedMessage: string) => {
        setLoading(true);
        let newMessages = [...messages];
        newMessages.push({ role: 'user', content: trimmedMessage });
        setMessage([...newMessages]);
        console.log('Messages: ', messages)

        updateScrollView();

        apiCall(newMessages).then(res => {
            setLoading(false);
            //console.log('newMessages ', res)
            if (res.success) {
                if ('data' in res) {
                    setMessage([...(res as { success: boolean; data: any; }).data]);
                    updateScrollView();
                    startTextToSpeach(res.data[res.data.length - 1]);
                } else {
                    console.log('Data not available');
                }
            } else {
                console.log('Error message:', (res as { success: boolean; msg: any; }).msg);
            }

        })
        trimmedMessage = '';
    }

    const startTextToSpeach = (message: any) => {
        setSpeaking(true);

        Tts.speak(message.content, {
            iosVoiceId: '',
            rate: 0.4,
            androidParams: {
                KEY_PARAM_PAN: 0,
                KEY_PARAM_VOLUME: 0.5,
                KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
        });
    }



    const askForPermission = useRequestSpeechRecPermissions();
    const checkForPermission = useCheckSpeechRecPermissions();

    useEffect(() => {
        checkForPermission().then(permissionCheckResult => {
            setUserMicPermissionGranted(permissionCheckResult === RESULTS.GRANTED);
        });
    }, [checkForPermission]);

    const checkAndAskForPermission = useCallback(async () => {
        const permissionCheckResult = await checkForPermission();
        if (permissionCheckResult === RESULTS.GRANTED) {
            return true;
        }

        const requestResult = await askForPermission();
        if (requestResult === RESULTS.GRANTED) {
            setUserMicPermissionGranted(true);
            return true;
        } else {
            return false;
        }
    }, [askForPermission, checkForPermission]);

    const handleConversationButtonPressed = useCallback(async () => {
        const permissionGranted = await checkAndAskForPermission();
        if (!permissionGranted) {
            return;
        }

        conversationCancelledByUser.current = false;

        setIsInConversationMode(true);

        startSpeechRecognition();
    }, [checkAndAskForPermission, startSpeechRecognition]);

    const handleConversationButtonReleased = useCallback(() => {
        if (!isInConversationMode) {
            return;
        }

        setIsInConversationMode(false);

        stopSpeechRecognition();

    }, [isInConversationMode, stopSpeechRecognition]);

    const handleConversationButtonSwipedUp = useCallback(async () => {
        if (isInConversationMode) {
            conversationCancelledByUser.current = true;

            setIsInConversationMode(false);

            cancelSpeechRecognition();

            console.log('Speech Recognition Cancelled.');

        }
    }, [cancelSpeechRecognition, isInConversationMode]);

    const scrollRef = React.useRef<ScrollView>(null);
    const handleTextAreaSizeChange = useCallback(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
    }, []);

    const speechRecContentArea = useMemo(() => {
        return <Text>{speechContentRealTime}</Text>;
    }, [speechContentRealTime]);

    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({ animated: true });
        }, 200)
    }

    return (
        <View style={styles.container}>

            <SafeAreaView style={styles.safeAreaView}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Image source={require('../../../assets/bot.png')} style={{ height: hp(15), width: wp(30), borderRadius: Math.round(wp(30)) / 2 }} />
                </View>

                {/* Messages */}
                {
                    <View style={{ marginTop: 4, flex: 1 }}>
                        <Text style={{ fontSize: wp(5), color: theme.colors.primary, marginLeft: 4 }}>AI Talker</Text>
                        <View style={{ height: hp(40), backgroundColor: theme.colors.chatArea_backgroundColor, borderRadius: 16, padding: 16 }}>
                            <ScrollView ref={scrollViewRef} bounces={false} showsVerticalScrollIndicator={false} style={{ flex: 1, flexDirection: 'column', paddingVertical: 4 }}>
                                {
                                    messages.map((message, index) => {
                                        if (message.role === 'assistant') {
                                            return (
                                                <View key={index} style={{ width: wp(50), backgroundColor: theme.colors.chatUserLeftOutput, borderRadius: 12, borderTopLeftRadius: 0, padding: 8 }}>
                                                    <Text style={{ color: theme.colors.chatText }}>
                                                        {message.content}
                                                    </Text>
                                                </View>
                                            )
                                        } else {
                                            return (
                                                <View key={index} style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 4, }}>
                                                    <View style={{ width: wp(50), backgroundColor: theme.colors.chatUserOutput, borderRadius: 12, borderTopRightRadius: 0, padding: 8 }}>
                                                        <Text style={{ color: theme.colors.chatText }}>
                                                            {message.content}
                                                        </Text>
                                                    </View>
                                                </View>
                                            )
                                        }
                                    })
                                }
                            </ScrollView>
                        </View>
                    </View>
                }
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', bottom: 50 }}>
                    <ScrollView
                        ref={scrollRef}
                        onContentSizeChange={handleTextAreaSizeChange}
                        style={styles.recognizedTextArea}>
                        {speechRecContentArea}
                    </ScrollView>
                    {
                        loading ? (
                            <Image
                                source={require('../../../assets/loading.gif')}
                                style={{ width: hp(5), height: hp(5) }}
                            />
                        ) :
                            <MicrophoneButton
                                containerStyle={styles.micContainer}
                                disabled={false}
                                handleButtonPressed={handleConversationButtonPressed}
                                handleButtonReleased={handleConversationButtonReleased}
                                handleButtonSwipeUp={handleConversationButtonSwipedUp}
                                isInListeningMode={isInConversationMode}
                                tooltipText={
                                    <ButtonToolTips
                                        userIsSpeaking={isInConversationMode}
                                        userMicPermissionBlocked={userMicPermissionGranted === false}
                                    />
                                }
                            />
                    }
                    {
                        messages.length > 0 && (
                            <TouchableOpacity onPress={clear} style={{ backgroundColor: theme.colors.clearBotton, borderRadius: 24, padding: 8, position: 'absolute', right: 30 }}>
                                <Text style={{ color: theme.colors.primary }}>Clear</Text>
                            </TouchableOpacity>
                        )
                    }
                    {
                        speaking && (
                            <TouchableOpacity onPress={stopSpeaking} style={{ backgroundColor: theme.colors.stopBotton, borderRadius: 24, padding: 8, position: 'absolute', left: 30 }}>
                                <Text style={{ color: theme.colors.primary }}>Stop</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeAreaView: {
        flex: 1,
        marginHorizontal: 15,
    },
    micContainer: {
        alignItems: 'center',
    },
    recognizedTextArea: {
        maxHeight: '50%',
    },

});

export default memo(MainTalkScreen);
