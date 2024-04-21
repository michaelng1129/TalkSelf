import axios from "axios";
import * as RNFS from '@dr.pogodin/react-native-fs';
import AsyncStorage from "@react-native-async-storage/async-storage";

const TextToSpeechFull = async (name:string, text: string, jwt: string) => {
    try {
        const isFileExists = await RNFS.exists(`${RNFS.DocumentDirectoryPath}/${name}.mp4`);

        if (!isFileExists) {
            console.log('TTs-Run')
            const response = await axios.post('http://192.168.1.2:8000/api/ttsWriting', {
                data: {
                    text: text,
                    jwt: jwt,
                },
            });
            const videoBase64 = response.data.video_base64;
            const filePath = `${RNFS.DocumentDirectoryPath}/${name}.mp4`;
            await RNFS.writeFile(filePath, videoBase64, 'base64')
                .then(async () => {
                    console.log('TTsfullPath:', filePath);
                    await AsyncStorage.setItem('TTsfullPath', filePath);
                })
                .catch(error => {
                    console.error('TTsfullPath:', error);
                });
        } else {
            console.log('Tts existed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export default TextToSpeechFull;