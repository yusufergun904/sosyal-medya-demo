import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const ProfileScreen = ({ navigation }) => {
  const { user, updateUserProfile, logout } = useAuth();
  const { currentTheme, getTextColor } = useTheme();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');

  const handleSaveProfile = async () => {
    if (!editedName.trim()) {
      Alert.alert('Hata', 'Ad alanı boş olamaz!');
      return;
    }

    const result = await updateUserProfile({
      name: editedName.trim(),
      email: editedEmail.trim(),
    });

    if (result.success) {
      Alert.alert('Başarılı', result.message);
      setIsEditing(false);
    } else {
      Alert.alert('Hata', result.message);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinizden emin misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.backgroundColor,
    },
    header: {
      padding: 20,
      paddingTop: 40,
      backgroundColor: currentTheme.primaryColor,
      alignItems: 'center',
    },
    profileImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: currentTheme.surfaceColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
    profileImageText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: currentTheme.primaryColor,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 5,
    },
    userEmail: {
      fontSize: 16,
      color: '#FFFFFF',
      opacity: 0.9,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: getTextColor(),
      marginBottom: 15,
    },
    card: {
      backgroundColor: currentTheme.surfaceColor,
      borderRadius: 12,
      padding: 20,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: currentTheme.borderColor,
    },
    fieldContainer: {
      marginBottom: 20,
    },
    fieldLabel: {
      fontSize: 16,
      fontWeight: '500',
      color: getTextColor(),
      marginBottom: 8,
    },
    fieldValue: {
      fontSize: 16,
      color: currentTheme.textSecondary,
      paddingVertical: 12,
      paddingHorizontal: 15,
      backgroundColor: currentTheme.backgroundColor,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: currentTheme.borderColor,
    },
    input: {
      fontSize: 16,
      color: getTextColor(),
      paddingVertical: 12,
      paddingHorizontal: 15,
      backgroundColor: currentTheme.backgroundColor,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: currentTheme.primaryColor,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    button: {
      flex: 0.48,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    editButton: {
      backgroundColor: currentTheme.primaryColor,
    },
    saveButton: {
      backgroundColor: currentTheme.successColor,
    },
    cancelButton: {
      backgroundColor: currentTheme.errorColor,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    logoutButton: {
      backgroundColor: currentTheme.errorColor,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    logoutButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    infoText: {
      fontSize: 14,
      color: currentTheme.textSecondary,
      textAlign: 'center',
      marginTop: 10,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImage}>
          <Text style={styles.profileImageText}>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.userName}>{user?.name || 'Kullanıcı'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profil Bilgileri</Text>
          <View style={styles.card}>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Ad Soyad</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={editedName}
                  onChangeText={setEditedName}
                  placeholder="Adınızı ve soyadınızı girin"
                  placeholderTextColor={currentTheme.textSecondary}
                />
              ) : (
                <Text style={styles.fieldValue}>{user?.name || 'Belirtilmemiş'}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Email</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={editedEmail}
                  onChangeText={setEditedEmail}
                  placeholder="Email adresinizi girin"
                  placeholderTextColor={currentTheme.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text style={styles.fieldValue}>{user?.email || 'Belirtilmemiş'}</Text>
              )}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Üyelik Tarihi</Text>
              <Text style={styles.fieldValue}>
                {user?.createdAt 
                  ? new Date(user.createdAt).toLocaleDateString('tr-TR')
                  : 'Belirtilmemiş'
                }
              </Text>
            </View>

            {isEditing ? (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.saveButton]}
                  onPress={handleSaveProfile}
                >
                  <Text style={styles.buttonText}>Kaydet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => {
                    setIsEditing(false);
                    setEditedName(user?.name || '');
                    setEditedEmail(user?.email || '');
                  }}
                >
                  <Text style={styles.buttonText}>İptal</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.buttonText}>Profili Düzenle</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hesap İşlemleri</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
            </TouchableOpacity>
            <Text style={styles.infoText}>
              Çıkış yaptığınızda tüm oturum bilgileriniz silinecektir.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;