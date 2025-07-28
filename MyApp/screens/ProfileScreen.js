import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, logout, updateProfile } = useAuth();
  const { theme, textColor } = useTheme();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Çıkış Yap', style: 'destructive', onPress: logout }
      ]
    );
  };

  const handleUpdateProfile = async () => {
    if (!editName.trim() || !editEmail.trim()) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editEmail)) {
      Alert.alert('Hata', 'Geçerli bir e-posta adresi girin!');
      return;
    }

    setIsUpdating(true);
    const result = await updateProfile({ name: editName, email: editEmail });
    setIsUpdating(false);

    if (result.success) {
      setIsEditModalVisible(false);
      Alert.alert('Başarılı', 'Profil bilgileriniz güncellendi!');
    } else {
      Alert.alert('Hata', result.message || 'Profil güncellenirken bir hata oluştu!');
    }
  };

  const profileItems = [
    {
      icon: 'person-outline',
      label: 'Ad Soyad',
      value: user?.name || 'Belirtilmemiş',
      editable: true
    },
    {
      icon: 'mail-outline',
      label: 'E-posta',
      value: user?.email || 'Belirtilmemiş',
      editable: true
    },
    {
      icon: 'calendar-outline',
      label: 'Kayıt Tarihi',
      value: user?.registrationDate ? new Date(user.registrationDate).toLocaleDateString('tr-TR') : 'Bilinmiyor',
      editable: false
    },
    {
      icon: 'time-outline',
      label: 'Son Giriş',
      value: user?.loginTime ? new Date(user.loginTime).toLocaleDateString('tr-TR') : 'Bilinmiyor',
      editable: false
    }
  ];

  const actionItems = [
    {
      icon: 'create-outline',
      label: 'Profili Düzenle',
      color: theme.primary,
      onPress: () => setIsEditModalVisible(true)
    },
    {
      icon: 'settings-outline',
      label: 'Ayarlar',
      color: theme.secondary,
      onPress: () => {} // Bu navigation.navigate('Settings') olmalı ama burada yok
    },
    {
      icon: 'help-circle-outline',
      label: 'Yardım',
      color: '#FF9500',
      onPress: () => Alert.alert('Yardım', 'Bu demo uygulamasıdır. Sorularınız için destek ekibi ile iletişime geçin.')
    },
    {
      icon: 'log-out-outline',
      label: 'Çıkış Yap',
      color: theme.error,
      onPress: handleLogout
    }
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      alignItems: 'center',
      padding: 30,
      paddingTop: 50,
    },
    avatarContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    avatarText: {
      fontSize: 36,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: textColor,
      marginBottom: 5,
    },
    userEmail: {
      fontSize: 16,
      color: theme.textSecondary,
    },
    section: {
      margin: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: textColor,
      marginBottom: 15,
    },
    profileItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 15,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: theme.border,
    },
    profileItemIcon: {
      marginRight: 15,
    },
    profileItemContent: {
      flex: 1,
    },
    profileItemLabel: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 2,
    },
    profileItemValue: {
      fontSize: 16,
      color: textColor,
      fontWeight: '500',
    },
    actionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 15,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: theme.border,
    },
    actionItemIcon: {
      marginRight: 15,
    },
    actionItemLabel: {
      fontSize: 16,
      fontWeight: '500',
      flex: 1,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: theme.background,
      borderRadius: 16,
      padding: 20,
      width: '90%',
      maxWidth: 400,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: textColor,
      textAlign: 'center',
      marginBottom: 20,
    },
    inputContainer: {
      marginBottom: 15,
    },
    inputLabel: {
      fontSize: 14,
      color: textColor,
      marginBottom: 5,
      fontWeight: '500',
    },
    input: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: textColor,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    modalButton: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 5,
    },
    cancelButton: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
    },
    saveButton: {
      backgroundColor: theme.primary,
    },
    modalButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    cancelButtonText: {
      color: textColor,
    },
    saveButtonText: {
      color: '#FFFFFF',
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>
        <Text style={styles.userName}>{user?.name || 'Kullanıcı'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profil Bilgileri</Text>
        {profileItems.map((item, index) => (
          <View key={index} style={styles.profileItem}>
            <Ionicons 
              name={item.icon} 
              size={24} 
              color={theme.primary} 
              style={styles.profileItemIcon} 
            />
            <View style={styles.profileItemContent}>
              <Text style={styles.profileItemLabel}>{item.label}</Text>
              <Text style={styles.profileItemValue}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>İşlemler</Text>
        {actionItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.actionItem} 
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={item.icon} 
              size={24} 
              color={item.color} 
              style={styles.actionItemIcon} 
            />
            <Text style={[styles.actionItemLabel, { color: item.color }]}>
              {item.label}
            </Text>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Profili Düzenle</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Ad Soyad</Text>
              <TextInput
                style={styles.input}
                value={editName}
                onChangeText={setEditName}
                placeholder="Adınız ve soyadınız"
                placeholderTextColor={theme.textSecondary}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>E-posta</Text>
              <TextInput
                style={styles.input}
                value={editEmail}
                onChangeText={setEditEmail}
                placeholder="E-posta adresiniz"
                placeholderTextColor={theme.textSecondary}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>
                  İptal
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleUpdateProfile}
                disabled={isUpdating}
              >
                <Text style={[styles.modalButtonText, styles.saveButtonText]}>
                  {isUpdating ? 'Kaydediliyor...' : 'Kaydet'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}