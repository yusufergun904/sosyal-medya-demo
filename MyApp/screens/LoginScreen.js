import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { theme, textColor } = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz!');
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (!result.success) {
      Alert.alert('Giriş Hatası', result.message);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: textColor,
      textAlign: 'center',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
      marginBottom: 40,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      color: textColor,
      marginBottom: 8,
      fontWeight: '500',
    },
    input: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      padding: 15,
      fontSize: 16,
      color: textColor,
    },
    inputFocused: {
      borderColor: theme.primary,
      borderWidth: 2,
    },
    loginButton: {
      backgroundColor: theme.primary,
      borderRadius: 12,
      padding: 15,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    loginButtonDisabled: {
      backgroundColor: theme.textSecondary,
    },
    loginButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    registerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    registerText: {
      color: theme.textSecondary,
      fontSize: 16,
    },
    registerLink: {
      color: theme.primary,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 5,
    },
    demoContainer: {
      marginTop: 30,
      padding: 15,
      backgroundColor: theme.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
    },
    demoTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: textColor,
      marginBottom: 10,
      textAlign: 'center',
    },
    demoText: {
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
  });

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Hoş Geldiniz</Text>
        <Text style={styles.subtitle}>Hesabınıza giriş yapın</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-posta</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="ornek@email.com"
            placeholderTextColor={theme.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Şifre</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Şifrenizi girin"
            placeholderTextColor={theme.textSecondary}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Hesabınız yok mu?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.demoContainer}>
          <Text style={styles.demoTitle}>Demo Hesap</Text>
          <Text style={styles.demoText}>
            Test için önce "Kayıt Ol" sekmesinden bir hesap oluşturun veya demo hesabı kullanın:
            {'\n'}E-posta: demo@test.com
            {'\n'}Şifre: 123456
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}