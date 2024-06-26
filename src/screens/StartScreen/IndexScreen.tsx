import React, { memo } from 'react';
import { Navigation, theme } from '../../core';
import { Background, Logo, Header, Button, Paragraph } from '../../core/components/StartScreen';

type Props = {
    navigation: Navigation;
};

const IndexScreen = ({ navigation }: Props) => (
    <Background>
        <Logo />
        <Header>
            TalkSelf
        </Header>
        <Paragraph>
            Welcome to use our app
        </Paragraph>
        <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')} style={{ backgroundColor: theme.colors.primary }}>
            Login
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate('RegisterScreen')} labelStyle={{ color: theme.colors.primary }} theme={{ colors: { primary: theme.colors.primary } }}>
            Sign Up
        </Button>
    </Background>
)

export default memo(IndexScreen);