import { useRoute } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { open, QueryResult } from "react-native-quick-sqlite";
import { TextToSpeech } from "../..";
import Video from 'react-native-video';
import RNSecureStorage from "rn-secure-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";

const DictionarySearchScreen = () => {
    const route = useRoute();
    const { searchText } = route.params as { searchText: string };
    const [results, setResults] = useState<{ pos: string, def: string }[]>([]);
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [showVideo, setShowVideo] = useState(false);

    const getTextToSpeech = async () => {
        try {
            const jwt = await RNSecureStorage.getItem("jwtToken");
            if (jwt === null) {
                console.error('JWT is null');
                return;
            }
            await TextToSpeech(searchText, jwt);
            const file = await AsyncStorage.getItem('TTsPath');
            console.log("file", file)
            if (file) {
                setVideoUri(file);
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const searchInDatabase = async () => {
            try {
                const db = open({ name: 'EngDB.sqlite' });
                const result: QueryResult = db.execute(
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

    const handleVideoEnd = () => {
        setShowVideo(false);
    };

    const clearVideoFile = async () => {
        try {
            if (videoUri) {
                await AsyncStorage.removeItem('TTsPath');
                setVideoUri(null);
            }
        } catch (error) {
            console.error('Error clearing video file: ', error);
        }
    };

    useEffect(() => {
        return () => {
            clearVideoFile();
        };
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Text style={styles.searchText}>{searchText}</Text>
            </View>
            <View style={{ flex: 1 }}>
                {showVideo ? (
                    <View style={{ flex: 1 }}>
                        {videoUri ? (
                            <View style={styles.videoContainer}>
                                <Video
                                    source={{ uri: videoUri }}
                                    controls={false}
                                    style={styles.video}
                                    resizeMode="contain"
                                    onEnd={handleVideoEnd}
                                />
                            </View>
                        ) : (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size={'small'} color={'black'}/>
                                <Text>Video is Loading...</Text>
                            </View>
                        )}
                    </View>
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.playButton} onPress={() => { setShowVideo(true), getTextToSpeech() }}>
                            <Text style={styles.buttonText} >Play Video</Text>
                        </TouchableOpacity>
                    </View>)}
            </View>
            <ScrollView style={styles.resultsContainer}>
                {results.map((result, index) => (
                    <View key={index} style={styles.resultContainer}>
                        <Text style={styles.resultLabel}>Part of Speech: </Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        height: '20%',
    },
    searchText: {
        fontSize: 30,
        fontWeight: 'bold',
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
    videoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '60%',
        height: '60%',
        flex: 1,

    },
    playButton: {
        backgroundColor: '#000000', 
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF', 
    },
});

export default memo(DictionarySearchScreen);