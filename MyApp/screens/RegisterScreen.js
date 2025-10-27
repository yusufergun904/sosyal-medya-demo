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

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { theme, textColor } = useTheme();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler uyuşmuyor!');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Hata', 'Geçerli bir e-posta adresi giriniz!');
      return;
    }

    setIsLoading(true);
    const result = await register(name, email, password);
    setIsLoading(false);

    if (!result.success) {
      Alert.alert('Kayıt Hatası', result.message);
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
    registerButton: {
      backgroundColor: theme.primary,
      borderRadius: 12,
      padding: 15,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    registerButtonDisabled: {
      backgroundColor: theme.textSecondary,
    },
    registerButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginText: {
      color: theme.textSecondary,
      fontSize: 16,
    },
    loginLink: {
      color: theme.primary,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 5,
    },
    noteContainer: {
      marginTop: 30,
      padding: 15,
      backgroundColor: theme.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
    },
    noteTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: textColor,
      marginBottom: 10,
      textAlign: 'center',
    },
    noteText: {
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
        <Text style={styles.title}>Hesap Oluştur</Text>
        <Text style={styles.subtitle}>Yeni hesabınızı oluşturun</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ad Soyad</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Adınız ve soyadınız"
            placeholderTextColor={theme.textSecondary}
            autoCapitalize="words"
          />
        </View>

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
            placeholder="En az 6 karakter"
            placeholderTextColor={theme.textSecondary}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Şifre Tekrar</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Şifrenizi tekrar girin"
            placeholderTextColor={theme.textSecondary}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          <Text style={styles.registerButtonText}>
            {isLoading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
          </Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Zaten hesabınız var mı?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.noteTitle}>Not</Text>
          <Text style={styles.noteText}>
            Bu demo uygulamadır. Verileriniz sadece cihazınızda saklanır ve gerçek bir sunucuya gönderilmez.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}