import { useRoute } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { open, QueryResult } from "react-native-quick-sqlite";

const DictionarySearchScreen = () => {
    const route = useRoute();
    const { searchText } = route.params as { searchText: string };
    const [results, setResults] = useState<{ pos: string, def: string }[]>([]);

    useEffect(() => {
        const searchInDatabase = async () => {
            try {
                const db = open({ name: 'EngDB.sqlite' });
                const result: QueryResult = await db.execute(
                    `SELECT pos, def FROM words WHERE word = ?;`,
                    [searchText]
                );
                if (result.rows && result.rows.length > 0) {
                    const searchData = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        searchData.push({
                            pos: result.rows.item(i).pos,
                            def: result.rows.item(i).def
                        });
                    }
                    setResults(searchData);
                } else {
                    console.log('No records found');
                }
            } catch (error) {
                console.error('Error searching in database: ', error);
            }
        };

        searchInDatabase();
    }, [searchText]);

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Text style={styles.searchText}>{searchText}</Text>
                <TouchableOpacity style={styles.microphoneButton}>
                    <Button icon="play">Press me</Button>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.resultsContainer}>
                {results.map((result, index) => (
                    <View key={index} style={styles.resultContainer}>
                        <Text style={styles.resultLabel}>POS: </Text>
                        <Text style={styles.resultText}>{result.pos}</Text>
                        <Text style={styles.resultLabel}>Definition: </Text>
                        <Text style={styles.resultText}>{result.def}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#F0F0F0',
        height: '20%',
    },
    searchText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    microphoneButton: {
        // Style your microphone button here
    },
    resultsContainer: {
        flex: 1,
    },
    resultContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    resultLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultText: {
        fontSize: 16,
        marginBottom: 3,
    },
});

export default memo(DictionarySearchScreen);