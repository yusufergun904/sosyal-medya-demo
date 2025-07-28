import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { currentTheme, getTextColor } = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun!');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      Alert.alert('Başarılı', result.message);
    } else {
      Alert.alert('Hata', result.message);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.backgroundColor,
      padding: 20,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 40,
      color: getTextColor(),
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      color: getTextColor(),
      fontWeight: '500',
    },
    input: {
      borderWidth: 1,
      borderColor: currentTheme.borderColor,
      borderRadius: 8,
      padding: 15,
      fontSize: 16,
      backgroundColor: currentTheme.surfaceColor,
      color: getTextColor(),
    },
    loginButton: {
      backgroundColor: currentTheme.primaryColor,
      padding: 15,
      borderRadius: 8,
      marginTop: 20,
      alignItems: 'center',
    },
    loginButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    registerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    registerText: {
      color: getTextColor(),
      fontSize: 16,
    },
    registerLink: {
      color: currentTheme.primaryColor,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 5,
    },
    disabledButton: {
      backgroundColor: currentTheme.textSecondary,
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Giriş Yap</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email adresinizi girin"
            placeholderTextColor={currentTheme.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Şifre</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Şifrenizi girin"
            placeholderTextColor={currentTheme.textSecondary}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Hesabınız yok mu?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;