import { useRoute } from "@react-navigation/native";
import React, { memo, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import * as RNFS from '@dr.pogodin/react-native-fs';
import Video from "react-native-video";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const TextToSpeechPlayerScreen = () => {
    const [videoUri, setVideoUri] = useState<string | null>(null);
    useEffect(() => {
        getPath()
        return () => {
            handleCleanup();
        };
    }, []);

    const getPath = async () => {
        const file = await AsyncStorage.getItem('TTsfullPath');
        setVideoUri(file)
    }

    const handleCleanup = async () => {
        try {
            const file = await AsyncStorage.getItem('TTsfullPath');
            if (file) {
                await RNFS.unlink(file);
            }

            await AsyncStorage.removeItem('TTsfullPath');

        } catch (error) {
            console.error('Error cleaning up:', error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {videoUri ? (
                <View style={styles.videoContainer}>
                    <Video
                        source={{ uri: videoUri }}
                        controls={true}
                        style={styles.video}
                        resizeMode="contain"
                    />
                </View>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'small'} color={"black"}/>
                    <Text>Video is Loading...</Text>
                </View>
            )}
        </View>
    )


}
const styles = StyleSheet.create({
    videoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: '100%',
        height: '100%',
        flex: 1,

    },
});
export default memo(TextToSpeechPlayerScreen)