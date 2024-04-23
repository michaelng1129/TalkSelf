import React, { memo } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Navigation } from '../../core';

type Props = {
    navigation: Navigation;
};
const TalkIndexScreen = ({ navigation }: Props) => {
    const handleButtonPress = () => {
        navigation.navigate('SpeechRecognitionRootScreen');
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{flex: 0.8}}bounces={false} showsVerticalScrollIndicator={false}>
                <Text style={styles.heading}>Features</Text>
                <View style={styles.featureContainer}>
                    <View style={styles.feature}>
                        <Image source={require('../../assets/chatgptIcon.png')} style={styles.icon} />
                        <Text style={styles.featureText}>ChatGPT</Text>
                    </View>
                    <Text style={styles.featureDescription}>
                        ChatGPT can provide you with instant and knowledgeable responses, help you with topic for speaking training.
                    </Text>
                </View>
                <View style={styles.featureContainer}>
                    <View style={styles.feature}>
                        <Image source={require('../../assets/dalleIcon.png')} style={styles.icon} />
                        <Text style={styles.featureText}>DALL-E</Text>
                    </View>
                    <Text style={styles.featureDescription}>
                        DALL-E can generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity.
                    </Text>
                </View>
                <View style={styles.featureContainer}>
                    <View style={styles.feature}>
                        <Image source={require('../../assets/smartaiIcon.png')} style={styles.icon} />
                        <Text style={styles.featureText}>Smart AI</Text>
                    </View>
                    <Text style={styles.featureDescription}>
                        A powerful voice assistant with the abilities of ChatGPT and Dall-E, providing you the best of both worlds.
                    </Text>
                </View>
            </ScrollView>
            <View style={{flex: 0.2}}>
                <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                    <Text style={styles.buttonText}>Start Speaking Training</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%'
    },
    button: {
        //flex: 0.3,
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        padding: 30,
    },
    featureContainer: {
        backgroundColor: '#f0f0f0',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        height: 30,
        width: 30,
        marginRight: 10,
        borderRadius: 5,
    },
    featureText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    featureDescription: {
        fontSize: 16,
        color: '#555',
    },
});

export default memo(TalkIndexScreen);
