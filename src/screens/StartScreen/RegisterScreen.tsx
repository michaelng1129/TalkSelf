import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Navigation, theme, nameValidator, emailValidator, passwordValidator, register, AuthContext, useAuth } from '../../core';
import { Background, Logo, Header, Button, TextInput, BackButton } from '../../core/components/StartScreen';
import { ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from 'react-native-paper';

type Props = {
  navigation: Navigation;
};


const RegisterScreen = ({ navigation }: Props) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const { login } = useAuth();

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);


    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('password', password.value);
    if (selectedImageUri) {
      const imageUriParts = selectedImageUri.split('.');
      const imageType = imageUriParts[imageUriParts.length - 1];
      formData.append('image', {
        uri: selectedImageUri,
        type: `image/${imageType}`,
        name: `photo.${imageType}`
      });
    }

    const success = await register(formData);

    if (success) {
      login();
    } else {
      //alert('Arrr matey! No treasure found. (Invalid credentials)');
    }
  };

  const handleChoosePhoto = async () => {
    if (selectedImageUri) {
      setSelectedImageUri(null);
    }

    const options: ImageLibraryOptions = {
      mediaType: 'photo'
    };

    launchImageLibrary(options, async (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        if (response.assets && response.assets.length > 0 && response.assets[0]?.uri) {
          const imageUri = response.assets[0].uri;
          setSelectedImageUri(imageUri);
          console.log(imageUri)
        }
      }
    });
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('IndexScreen')} />

      <Logo />

      <Header>Create Account</Header>

      <View style={styles.avatarContainer}>
        {selectedImageUri ? (
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Image source={{ uri: selectedImageUri }} style={styles.avatar} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleChoosePhoto}>
            <Avatar.Icon size={100} icon="camera" />
          </TouchableOpacity>
        )}
      </View>


      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 0,
  },
});

export default memo(RegisterScreen);