import { useCallback } from 'react';
import { Platform } from 'react-native';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';


export const getPermissionToCheck = () =>
    Platform.OS === 'ios'
        ? PERMISSIONS.IOS.SPEECH_RECOGNITION
        : PERMISSIONS.ANDROID.RECORD_AUDIO;

export const useCheckSpeechRecPermissions = () => {
    const checkPermission = useCallback(async () => {
        const permissionToCheck = getPermissionToCheck();
        const result = await check(permissionToCheck);

        return result;
    }, []);

    return checkPermission;
};

export const useRequestSpeechRecPermissions = () => {
    const requestPermission = useCallback(async () => {
        const result = await request(getPermissionToCheck());

        if (result === RESULTS.GRANTED) {
            console.log('Speech recognition permission granted');
        } else {
            console.log('Speech recognition permission NOT granted');
        }

        return result;
    }, []);

    return requestPermission;
};
