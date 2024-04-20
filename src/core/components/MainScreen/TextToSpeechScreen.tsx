import React, { memo, useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";

const TextToSpeechScreen = () => {
    const [inputText, setInputText] = useState('');

    const handleInputChange = (text: string) => {
        setInputText(text);
    };

    const handleSubmit = () => {
        // 提交功能邏輯
        console.log("Text submitted:", inputText);
    };

    const handleClear = () => {
        setInputText('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={handleInputChange}
                placeholder="Type something..."
            />
            <View style={styles.buttonContainer}>
                <Button title="Submit" onPress={handleSubmit} />
                <Button title="Clear" onPress={handleClear} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '90%',
        height: 500,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
});

export default memo(TextToSpeechScreen);
