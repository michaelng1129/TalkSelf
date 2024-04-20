import React, { memo, useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, Dimensions } from "react-native";
import { Navigation } from "../..";

const windowHeight = Dimensions.get('window').height;

type Props = {
    navigation: Navigation;
};

const WritingQuizScreen = ({ navigation }: Props) => {
    const [inputText, setInputText] = useState("");

    const handleInputChange = (text: string) => {
        setInputText(text);
    }

    const handleSubmit = () => {
        // Handle submission logic here
        console.log("Submitted:", inputText);
        // Reset input field
        setInputText("");
    }

    return (
        <View style={styles.container}>
            {/* Title Section */}
            <View style={[styles.section, { height: windowHeight * 0.1 }]}>
                <Text style={styles.title}>How about your School Life</Text>
            </View>

            {/* Input Section */}
            <View style={[styles.section, { height: windowHeight * 0.4 }]}>
                <TextInput
                    style={styles.input}
                    onChangeText={handleInputChange}
                    value={inputText}
                    multiline
                    placeholder="Type your answer here..."
                />
            </View>

            {/* Submit Button Section */}
            <View style={[styles.section, { height: windowHeight * 0.1 }]}>
                <Button title="Submit" onPress={handleSubmit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    section: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
});

export default memo(WritingQuizScreen);
