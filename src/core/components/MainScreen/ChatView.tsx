import React, { memo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { theme } from '../..';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const ChatView = () => {
    return (
        <View style={styles.container}>
            <Text>ChatView</Text>
            <View style={styles.chatArea}>
                <View style={styles.chatImage}>
                    <Image source={require('../../../assets/teacher.jpeg')} style={styles.image} />
                    <Text style={styles.chatName}>Teacher</Text>
                </View>
                <Text style={styles.chatLeft} />

            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        marginTop: 1
    },
    chatArea: {
        borderWidth: 1,
        //borderColor: theme.colors.chatArea_BorderColor,
        backgroundColor: theme.colors.chatArea_backgroundColor,
        borderRadius: 16,
        padding: 16
    },
    chatImage: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 4,
        marginTop: 4
    },
    image: {
        height: hp(4),
        width: wp(4)
    },
    chatName: {
        fontWeight: '600',
        color: theme.colors.primary,
        fontSize: wp(4.8)
    },
    chatLeft: {
        fontSize: wp(3.8)
    }
});
export default memo(ChatView);

