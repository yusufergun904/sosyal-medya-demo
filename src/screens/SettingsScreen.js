import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  SafeAreaView,
  Linking,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { currentTheme, getTextColor, changeTheme, changeTextColor, themes, customTextColor } = useTheme();
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [alarmTime, setAlarmTime] = useState('08:00');
  const [showLoginInfo, setShowLoginInfo] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const notifSetting = await AsyncStorage.getItem('notificationsEnabled');
      const alarmSetting = await AsyncStorage.getItem('alarmEnabled');
      const alarmTimeSetting = await AsyncStorage.getItem('alarmTime');
      const loginInfoSetting = await AsyncStorage.getItem('showLoginInfo');
      
      setNotificationsEnabled(notifSetting === 'true');
      setAlarmEnabled(alarmSetting === 'true');
      setAlarmTime(alarmTimeSetting || '08:00');
      setShowLoginInfo(loginInfoSetting === 'true');
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const saveNotificationSetting = async (value) => {
    try {
      setNotificationsEnabled(value);
      await AsyncStorage.setItem('notificationsEnabled', value.toString());
      Alert.alert('Bildirimler', value ? 'Bildirimler açıldı' : 'Bildirimler kapatıldı');
    } catch (error) {
      console.log('Error saving notification setting:', error);
    }
  };

  const saveAlarmSetting = async (value) => {
    try {
      setAlarmEnabled(value);
      await AsyncStorage.setItem('alarmEnabled', value.toString());
      Alert.alert('Alarm', value ? 'Alarm açıldı' : 'Alarm kapatıldı');
    } catch (error) {
      console.log('Error saving alarm setting:', error);
    }
  };

  const saveLoginInfoSetting = async (value) => {
    try {
      setShowLoginInfo(value);
      await AsyncStorage.setItem('showLoginInfo', value.toString());
    } catch (error) {
      console.log('Error saving login info setting:', error);
    }
  };

  const handleThemeChange = (themeName) => {
    changeTheme(themeName);
    Alert.alert('Tema', `${themeName} teması uygulandı`);
  };

  const handleTextColorChange = (color) => {
    changeTextColor(color);
    Alert.alert('Metin Rengi', 'Metin rengi değiştirildi');
  };

  const handleRateApp = () => {
    Alert.alert(
      'Uygulamayı Değerlendir',
      'Uygulamayı değerlendirmek ister misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Değerlendir',
          onPress: () => {
            // In a real app, this would open the app store
            Alert.alert('Teşekkürler', 'Değerlendirmeniz için teşekkürler!');
          },
        },
      ]
    );
  };

  const handleShareApp = () => {
    Alert.alert(
      'Uygulamayı Paylaş',
      'Uygulamayı arkadaşlarınızla paylaşmak ister misiniz?',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Paylaş',
          onPress: () => {
            Alert.alert('Paylaşım', 'Uygulama paylaşım linki kopyalandı!');
          },
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
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
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
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.borderColor,
    },
    settingRowLast: {
      borderBottomWidth: 0,
    },
    settingLabel: {
      fontSize: 16,
      color: getTextColor(),
      flex: 1,
    },
    settingValue: {
      fontSize: 14,
      color: currentTheme.textSecondary,
    },
    themeContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    themeButton: {
      width: '48%',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      alignItems: 'center',
      borderWidth: 2,
    },
    themeButtonActive: {
      borderColor: currentTheme.primaryColor,
    },
    themeButtonInactive: {
      borderColor: currentTheme.borderColor,
    },
    themeButtonText: {
      fontSize: 14,
      fontWeight: '600',
    },
    colorContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    colorButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginBottom: 10,
      borderWidth: 3,
      borderColor: currentTheme.borderColor,
    },
    colorButtonActive: {
      borderColor: currentTheme.primaryColor,
    },
    actionButton: {
      backgroundColor: currentTheme.primaryColor,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    actionButtonText: {
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

  const textColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ayarlar</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Theme Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tema Ayarları</Text>
          <View style={styles.card}>
            <Text style={styles.settingLabel}>Tema Seçimi</Text>
            <View style={styles.themeContainer}>
              {Object.keys(themes).map((themeName) => (
                <TouchableOpacity
                  key={themeName}
                  style={[
                    styles.themeButton,
                    currentTheme.name === themeName 
                      ? styles.themeButtonActive 
                      : styles.themeButtonInactive,
                    { backgroundColor: themes[themeName].backgroundColor }
                  ]}
                  onPress={() => handleThemeChange(themeName)}
                >
                  <Text style={[
                    styles.themeButtonText,
                    { color: themes[themeName].textColor }
                  ]}>
                    {themeName === 'light' ? 'Açık' :
                     themeName === 'dark' ? 'Koyu' :
                     themeName === 'blue' ? 'Mavi' : 'Yeşil'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Text Color Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metin Rengi</Text>
          <View style={styles.card}>
            <Text style={styles.settingLabel}>Özel Metin Rengi</Text>
            <View style={styles.colorContainer}>
              {textColors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorButton,
                    customTextColor === color ? styles.colorButtonActive : null,
                    { backgroundColor: color }
                  ]}
                  onPress={() => handleTextColorChange(color)}
                />
              ))}
            </View>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleTextColorChange(null)}
            >
              <Text style={styles.actionButtonText}>Varsayılan Rengi Kullan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bildirimler</Text>
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Bildirimleri Etkinleştir</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={saveNotificationSetting}
                trackColor={{ false: currentTheme.borderColor, true: currentTheme.primaryColor }}
                thumbColor={notificationsEnabled ? '#FFFFFF' : currentTheme.textSecondary}
              />
            </View>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Alarm</Text>
              <Switch
                value={alarmEnabled}
                onValueChange={saveAlarmSetting}
                trackColor={{ false: currentTheme.borderColor, true: currentTheme.primaryColor }}
                thumbColor={alarmEnabled ? '#FFFFFF' : currentTheme.textSecondary}
              />
            </View>
            {alarmEnabled && (
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Alarm Saati</Text>
                <Text style={styles.settingValue}>{alarmTime}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Login Info Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Giriş Bilgileri</Text>
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Giriş Bilgilerini Göster</Text>
              <Switch
                value={showLoginInfo}
                onValueChange={saveLoginInfoSetting}
                trackColor={{ false: currentTheme.borderColor, true: currentTheme.primaryColor }}
                thumbColor={showLoginInfo ? '#FFFFFF' : currentTheme.textSecondary}
              />
            </View>
            {showLoginInfo && user && (
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Email</Text>
                <Text style={styles.settingValue}>{user.email}</Text>
              </View>
            )}
          </View>
        </View>

        {/* App Rating */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Uygulama</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleRateApp}
            >
              <Text style={styles.actionButtonText}>Uygulamayı Değerlendir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: currentTheme.secondaryColor, marginTop: 10 }]}
              onPress={handleShareApp}
            >
              <Text style={styles.actionButtonText}>Uygulamayı Paylaş</Text>
            </TouchableOpacity>
            <Text style={styles.infoText}>
              Uygulama versiyonu: 1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;