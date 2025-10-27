import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Modal,
  Linking
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { 
    theme, 
    themes, 
    currentTheme, 
    textColor, 
    textColorName, 
    textColors, 
    notifications, 
    alarms,
    saveTheme, 
    saveTextColor, 
    saveNotifications, 
    saveAlarms 
  } = useTheme();
  const { user } = useAuth();
  
  const [isThemeModalVisible, setIsThemeModalVisible] = useState(false);
  const [isTextColorModalVisible, setIsTextColorModalVisible] = useState(false);

  const handleThemeChange = (themeKey) => {
    saveTheme(themeKey);
    setIsThemeModalVisible(false);
  };

  const handleTextColorChange = (colorKey) => {
    saveTextColor(colorKey);
    setIsTextColorModalVisible(false);
  };

  const handleRateApp = () => {
    Alert.alert(
      'Uygulamayı Değerlendir',
      'Bu demo uygulamasını beğendiniz mi? Gerçek bir uygulamada burada App Store veya Google Play Store\'a yönlendirilirsiniz.',
      [
        { text: 'İptal', style: 'cancel' },
        { text: '⭐ 5 Yıldız Ver', onPress: () => Alert.alert('Teşekkürler!', 'Değerlendirmeniz için teşekkür ederiz!') }
      ]
    );
  };

  const handleShareApp = () => {
    Alert.alert(
      'Uygulamayı Paylaş',
      'Bu harika uygulamayı arkadaşlarınızla paylaşın! Demo uygulamasında paylaşım özelliği aktif değildir.',
      [
        { text: 'Tamam' }
      ]
    );
  };

  const settingsItems = [
    {
      section: 'Görünüm',
      items: [
        {
          icon: 'color-palette-outline',
          label: 'Tema',
          value: theme.name,
          onPress: () => setIsThemeModalVisible(true),
          type: 'select'
        },
        {
          icon: 'text-outline',
          label: 'Yazı Rengi',
          value: textColorName === 'default' ? 'Varsayılan' : textColorName.charAt(0).toUpperCase() + textColorName.slice(1),
          onPress: () => setIsTextColorModalVisible(true),
          type: 'select'
        }
      ]
    },
    {
      section: 'Bildirimler',
      items: [
        {
          icon: 'notifications-outline',
          label: 'Bildirimler',
          value: notifications,
          onPress: () => saveNotifications(!notifications),
          type: 'switch'
        },
        {
          icon: 'alarm-outline',
          label: 'Alarmlar',
          value: alarms,
          onPress: () => saveAlarms(!alarms),
          type: 'switch'
        }
      ]
    },
    {
      section: 'Hesap',
      items: [
        {
          icon: 'person-outline',
          label: 'Giriş Bilgileri',
          value: user?.email || 'Bilinmiyor',
          onPress: () => Alert.alert('Giriş Bilgileri', `Hesap: ${user?.name}\nE-posta: ${user?.email}\nGiriş: ${user?.loginTime ? new Date(user.loginTime).toLocaleString('tr-TR') : 'Bilinmiyor'}`),
          type: 'info'
        }
      ]
    },
    {
      section: 'Uygulama',
      items: [
        {
          icon: 'star-outline',
          label: 'Uygulamayı Değerlendir',
          value: '⭐⭐⭐⭐⭐',
          onPress: handleRateApp,
          type: 'action'
        },
        {
          icon: 'share-outline',
          label: 'Uygulamayı Paylaş',
          value: '',
          onPress: handleShareApp,
          type: 'action'
        },
        {
          icon: 'information-circle-outline',
          label: 'Uygulama Hakkında',
          value: 'v1.0.0',
          onPress: () => Alert.alert('Hakkında', 'Demo React Native Uygulaması\nSürüm: 1.0.0\nGeliştirici: Demo Developer\n\nBu uygulama Expo ve React Native ile geliştirilmiştir.'),
          type: 'info'
        }
      ]
    }
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      padding: 20,
      paddingTop: 40,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: textColor,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: theme.textSecondary,
    },
    section: {
      marginTop: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: textColor,
      marginHorizontal: 20,
      marginBottom: 10,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 15,
      marginHorizontal: 20,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    settingIcon: {
      marginRight: 15,
    },
    settingContent: {
      flex: 1,
    },
    settingLabel: {
      fontSize: 16,
      fontWeight: '500',
      color: textColor,
      marginBottom: 2,
    },
    settingValue: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    settingAction: {
      marginLeft: 10,
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
      maxHeight: '80%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: textColor,
      textAlign: 'center',
      marginBottom: 20,
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderRadius: 12,
      marginBottom: 8,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
    },
    optionItemSelected: {
      backgroundColor: `${theme.primary}20`,
      borderColor: theme.primary,
    },
    optionIcon: {
      marginRight: 15,
    },
    optionContent: {
      flex: 1,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: textColor,
    },
    optionDescription: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 2,
    },
    colorOption: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderRadius: 12,
      marginBottom: 8,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: theme.border,
    },
    colorOptionSelected: {
      backgroundColor: `${theme.primary}20`,
      borderColor: theme.primary,
    },
    colorCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 15,
      borderWidth: 2,
      borderColor: theme.border,
    },
    colorName: {
      fontSize: 16,
      fontWeight: '500',
      color: textColor,
      flex: 1,
    },
    closeButton: {
      backgroundColor: theme.primary,
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
      marginTop: 20,
    },
    closeButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  const colorNames = {
    default: 'Varsayılan',
    black: 'Siyah',
    white: 'Beyaz',
    gray: 'Gri',
    blue: 'Mavi',
    green: 'Yeşil',
    red: 'Kırmızı',
    orange: 'Turuncu',
    purple: 'Mor'
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Ayarlar</Text>
        <Text style={styles.subtitle}>Uygulama tercihlerinizi özelleştirin</Text>
      </View>

      {settingsItems.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.section}</Text>
          {section.items.map((item, itemIndex) => (
            <TouchableOpacity
              key={itemIndex}
              style={styles.settingItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={item.icon} 
                size={24} 
                color={theme.primary} 
                style={styles.settingIcon} 
              />
              <View style={styles.settingContent}>
                <Text style={styles.settingLabel}>{item.label}</Text>
                {item.type !== 'switch' && (
                  <Text style={styles.settingValue}>{item.value}</Text>
                )}
              </View>
              <View style={styles.settingAction}>
                {item.type === 'switch' ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.onPress}
                    trackColor={{ false: theme.border, true: `${theme.primary}80` }}
                    thumbColor={item.value ? theme.primary : theme.textSecondary}
                  />
                ) : (
                  <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Tema Seçim Modal */}
      <Modal
        visible={isThemeModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsThemeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tema Seç</Text>
            
            {Object.entries(themes).map(([key, themeData]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.optionItem,
                  currentTheme === key && styles.optionItemSelected
                ]}
                onPress={() => handleThemeChange(key)}
              >
                <View style={[styles.colorCircle, { backgroundColor: themeData.primary }]} />
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>{themeData.name}</Text>
                </View>
                {currentTheme === key && (
                  <Ionicons name="checkmark" size={20} color={theme.primary} />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setIsThemeModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Yazı Rengi Seçim Modal */}
      <Modal
        visible={isTextColorModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsTextColorModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Yazı Rengi Seç</Text>
            
            <TouchableOpacity
              style={[
                styles.colorOption,
                textColorName === 'default' && styles.colorOptionSelected
              ]}
              onPress={() => handleTextColorChange('default')}
            >
              <View style={[styles.colorCircle, { backgroundColor: theme.text }]} />
              <Text style={styles.colorName}>Varsayılan</Text>
              {textColorName === 'default' && (
                <Ionicons name="checkmark" size={20} color={theme.primary} />
              )}
            </TouchableOpacity>

            {Object.entries(textColors).map(([key, color]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.colorOption,
                  textColorName === key && styles.colorOptionSelected
                ]}
                onPress={() => handleTextColorChange(key)}
              >
                <View style={[styles.colorCircle, { backgroundColor: color }]} />
                <Text style={styles.colorName}>{colorNames[key]}</Text>
                {textColorName === key && (
                  <Ionicons name="checkmark" size={20} color={theme.primary} />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setIsTextColorModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}