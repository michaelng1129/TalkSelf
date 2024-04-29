import React, { memo, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { mountDatabase, Navigation, theme } from "../../core";
import { open, QueryResult } from "react-native-quick-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
    navigation: Navigation;
};
const HomeScreen = ({ navigation }: { navigation: any }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const success = await mountDatabase();
                if (success) {
                    setLoading(false);
                }
            } catch (error) {
                console.log('Error mounting database:', error);
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {loading ? (
                <ActivityIndicator size="large" color={theme.colors.primary} />
            ) : (
                <MainScreen navigation={navigation} />
            )}
        </View>
    )
}

const MainScreen = ({ navigation }: Props) => {
    const [searchText, setSearchText] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const goResult = () => {
        navigation.navigate('DictionarySearchScreen');
    }

    const goTextToSpeech = () => {
        navigation.navigate('TextToSpeechScreen');
    }

    const clearSearchText = () => {
        setSearchText('');
        setSuggestions([]);
    };


    const searchWords = async (word: string) => {
        try {

            const db = open({ name: 'EngDB.sqlite' });

            const result: QueryResult = db.execute(
                `SELECT DISTINCT word FROM words WHERE word LIKE ? ORDER BY word LIMIT 50;`,
                [word + '%']
            );
            const data = [];
            if (result.rows && result.rows.length > 0) {
                for (let i = 0; i < result.rows.length; i++) {
                    data.push(result.rows.item(i).word);
                }
                return data;
            }

        } catch (error) {
            console.error('Error executing SQL query: ', error);
            return [];
        }
    };

    const handleWordChange = async (word: string) => {
        setSearchText(word);
        console.log('handleWordChange: ', word)
        const suggestions = await searchWords(word);
        if (suggestions) {
            setSuggestions(suggestions);
        }
    };

    const handleSelectSuggestion = async (word: string) => {
        await AsyncStorage.setItem('searchText', word);
        setSearchText(word);
        setSuggestions([]);
        Keyboard.dismiss();
        goResult();
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchArea}>
                <Text style={styles.heading}>Dictionary</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search..."
                        onChangeText={handleWordChange}
                        value={searchText}
                    />
                    {searchText !== '' && (
                        <TouchableOpacity onPress={clearSearchText}>
                            <Text style={styles.icon}>X</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{ flex: 1, width: "100%" }}>
                    {suggestions.length > 0 && (
                        <FlatList
                            style={styles.flatList}
                            data={suggestions}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPressIn={() => handleSelectSuggestion(item)}>
                                    <Text style={styles.suggestion}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item}
                        />
                    )}
                </View>
            </View>
            <View style={styles.bottomArea}>
                <TouchableOpacity style={styles.touchContainer} onPress={goTextToSpeech}>
                    <Image source={require('../../../src/assets/faceGen.jpg')} style={styles.image} resizeMode="contain" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 20,
        width: '100%'
    },
    searchArea: {
        flex: 0.7,
        width: '100%',
        alignItems: 'center',
    },
    flatList: {
        flex: 1,
    },
    bottomArea: {
        flex: 0.3,
    },
    heading: {
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    input: {
        flex: 1,
        padding: 15,
        fontSize: 18,
    },
    icon: {
        padding: 10,
    },
    suggestion: {
        padding: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flex: 1,
        width: "100%"
    },
    touchContainer: {
        //marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: 100,
        height: 100,
    }
});
export default memo(HomeScreen);