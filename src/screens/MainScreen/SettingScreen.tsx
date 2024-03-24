import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import { theme, Navigation } from "../../core";
import { Button } from '../../core/components/MainScreen';

type Props = {
    navigation: Navigation;
};

const SettingScreen = ({ navigation }: Props) => (
    <View>
        <Button mode="text" onPress={() => {/* 實現AC設定功能 */ }}>
            Account Settings
        </Button>
        <Divider style={styles.divider} />
        <Button mode="text" onPress={() => {/* 實現語言選擇功能 */ }}>
            Language
        </Button>
        <Divider style={styles.divider} />
        <Button mode="text" onPress={() => navigation.navigate('IndexScreen')}>
            Logout
        </Button>
        <Divider style={styles.divider} />
    </View>
);

const styles = StyleSheet.create({
    divider: {
        backgroundColor: theme.colors.divider,
    },
});

export default memo(SettingScreen);