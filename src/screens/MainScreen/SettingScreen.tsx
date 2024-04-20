import React, { memo, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import { theme, Navigation, AuthContext } from "../../core";
import { Button } from '../../core/components/MainScreen/index.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
    navigation: Navigation;
};

const SettingScreen = ({ navigation }: Props) => {
    const { logout } = useContext(AuthContext) ?? { logout: () => {} };

    const handleLogout = async () => {
        // await AsyncStorage.removeItem('jwtToken');
        // navigation.navigate('IndexScreen');
        logout()
    };

    return (
        <View>
            <Button mode="text" onPress={() => {/* 實現AC設定功能 */ }}>
                Account Settings
            </Button>
            <Divider style={styles.divider} />
            <Button mode="text" onPress={() => {/* 實現語言選擇功能 */ }}>
                Language
            </Button>
            <Divider style={styles.divider} />
            <Button mode="text" onPress={handleLogout}>
                Logout
            </Button>
            <Divider style={styles.divider} />
        </View>
    );
}
const styles = StyleSheet.create({
    divider: {
        backgroundColor: theme.colors.divider,
    },
});

export default memo(SettingScreen);