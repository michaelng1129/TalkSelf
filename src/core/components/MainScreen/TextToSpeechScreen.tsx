import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { memo, useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import RNSecureStorage from "rn-secure-storage";
import { Navigation, TextToSpeechFull } from "../..";

type Props = {
    navigation: Navigation;
};

const TextToSpeechScreen = ({ navigation }: { navigation: any }) => {
    const [inputText, setInputText] = useState('');
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (text: string) => {
        setInputText(text);
    };



    const handleSubmit = async () => {
        try {
            setLoading(true);
            const jwt = await RNSecureStorage.getItem("jwtToken");
            if (jwt === null) {
                console.error('JWT is null');
                return;
            }
            const timestamp = Date.now().toString();
            await TextToSpeechFull(timestamp, inputText, jwt);
            const file = await AsyncStorage.getItem('TTsfullPath');
            console.log("file", file)
            if (file) {
                setVideoUri(file);
            }
            navigation.navigate('TextToSpeechPlayerScreen');
            setVideoUri(null);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        };
    }

    const handleClear = () => {
        setInputText('');
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={styles.fcontainer}>
                    <Text style={styles.heading}>Face Generator</Text>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={handleInputChange}
                        placeholder="Type something..."
                        textAlignVertical="top"
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleClear} style={styles.button}>
                            <Text style={styles.buttonText}>Clear</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        alignItems: 'center',
    },
    fcontainer: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        width: '90%',
        height: '70%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
    },
    button: {
        backgroundColor: '#000000', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 40
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default memo(TextToSpeechScreen);
