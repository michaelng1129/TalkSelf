import React, { memo, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Navigation } from '../../core';
import axios from 'axios';
import * as RNFS from '@dr.pogodin/react-native-fs';
import Video from 'react-native-video';

type Props = {
  navigation: Navigation;
};

const StudyPlanScreen = () => {
  const [videoUri, setVideoUri] = useState<string | null>('dsasd');

  useEffect(() => {
    fetchVideo();
  }, []);

  const fetchVideo = async () => {
    try {
      const response = await axios.get('http://192.168.1.2:8000/api/test')
      const videoBase64 = response.data.video_base64;
      const filePath = `${RNFS.DocumentDirectoryPath}/video.mp4`;
      await RNFS.writeFile(filePath, videoBase64, 'base64');

      setVideoUri(filePath);
    } catch (error) {
      console.error('获取视频文件时出错:', error);
    }
  };

  const handleButtonClick = async () => {
    fetchVideo();
  };

  return (
    <View style={styles.container}>
      <Button title="重新加载视频" onPress={handleButtonClick} />
      {videoUri ? (
        <Video
          source={{ uri: videoUri }}
          controls={true}
          style={styles.video}
        />
      ) : (
        <Text>正在加载视频...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: 300,
  },
});

export default memo(StudyPlanScreen);
