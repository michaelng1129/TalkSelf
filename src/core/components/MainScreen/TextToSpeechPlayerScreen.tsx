import { useRoute } from "@react-navigation/native";
import React, { memo, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import * as RNFS from '@dr.pogodin/react-native-fs';
import Video from "react-native-video";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TextToSpeechPlayerScreen = () => {
    const route = useRoute();
    const { Uri } = route.params as { Uri: string };
    console.log('ssfts:', Uri)

    useEffect(() => {
        return () => {
            handleCleanup();
        };
    }, []);

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
            {Uri ? (
                <View style={styles.videoContainer}>
                    <Video
                        source={{ uri: Uri }}
                        controls={true}
                        style={styles.video}
                        resizeMode="contain"
                    />
                </View>
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'small'} />
                    <Text>Video is Loading...</Text>
                </View>
            )}
        </View>
    )


}
const styles = StyleSheet.create({
    videoContainer: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    video: {
        // width: '60%',
        // height: '60%',
        // flex: 1,

    },
});
export default memo(TextToSpeechPlayerScreen)