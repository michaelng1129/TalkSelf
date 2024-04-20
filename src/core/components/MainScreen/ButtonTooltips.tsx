import React from 'react';
import { Linking, Text } from 'react-native';

interface ButtonTooltipProps {
    userIsSpeaking: boolean;
    userMicPermissionBlocked: boolean;
}

const ButtonTooltips = React.memo(
    ({
        userIsSpeaking,
        userMicPermissionBlocked,
    }: ButtonTooltipProps) => {
        if (userIsSpeaking) {
            return (
                <Text style={{ color: '#333333' }}>
                    Swipe up to cancel
                </Text>
            );
        }

        if (userMicPermissionBlocked) {
            return (
                <Text onPress={() => {
                    Linking.openSettings();
                }}
                    style={{ color: '#333333' }}>
                    Please Giveing Speech Permission
                </Text>
            );
        }

        return (
            <Text style={{ color: '#333333' }}>
                Hold To Speak
            </Text>
        );
    },
);

export default ButtonTooltips;
