import React, { memo } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Navigation } from '../../core';

type Props = {
    navigation: Navigation;
};
const TalkIndexScreen = ({ navigation }: Props) => {
    const handleButtonPress = () =>{
        navigation.navigate('SpeechRecognitionRootScreen');
    }

    return (
        <View style={styles.container}>
            <Button title="Go to Main Talk Screen" onPress={handleButtonPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default memo(TalkIndexScreen);
