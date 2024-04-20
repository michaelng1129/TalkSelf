import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton, DefaultTheme } from 'react-native-paper';

type Props = React.ComponentProps<typeof PaperButton>;

const Button = ({ mode, style, children, ...props }: Props) => (
    <PaperButton style={[styles.button, mode === 'outlined' && { backgroundColor: DefaultTheme.colors.surface }, style]} labelStyle={styles.text} mode={mode} {...props}>
        {children}
    </PaperButton>
);

const styles = StyleSheet.create({
    button: {
        width: '100%',
        marginVertical: 0,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    },
});

export default memo(Button);