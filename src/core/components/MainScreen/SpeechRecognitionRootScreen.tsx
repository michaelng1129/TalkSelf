import React from 'react';
import { SpeechRecognitionRootView } from 'react-native-voicebox-speech-rec';
import { MainTalkScreen } from '../../../screens';

const SpeechRecognitionRootScreen = () => {
    return (
        <SpeechRecognitionRootView>
            <MainTalkScreen />
        </SpeechRecognitionRootView>
    );
};

export default SpeechRecognitionRootScreen;
