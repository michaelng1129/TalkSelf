import React, { memo, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "react-native-paper";
import { theme, Navigation, AuthContext } from "../../core";
import { Button } from '../../core/components/MainScreen/index.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
    navigation: Navigation;
};

const SettingScreen = ({ navigation }: Props) => {
    const { logout } = useContext(AuthContext) ?? { logout: () => { } };

    const handleLogout = async () => {
        // await AsyncStorage.removeItem('jwtToken');
        // navigation.navigate('IndexScreen');
        logout()
    };

    return (
        <View>
            <TouchableOpacity onPress={() => { }}>
                <Text style={styles.buttonText}>Account Settings</Text>
            </TouchableOpacity>
            <Divider style={styles.divider} />
            <Divider style={styles.divider} />
            <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <Divider style={styles.divider} />
        </View>
    );
}
const styles = StyleSheet.create({
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 12,
        paddingHorizontal: 16,
        textAlign: 'center',
        color: 'black', // 按钮文本颜色
    },
    divider: {
        backgroundColor: theme.colors.divider,
    },
});

export default memo(SettingScreen);