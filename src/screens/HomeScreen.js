import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { currentTheme, getTextColor } = useTheme();

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
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginBottom: 5,
    },
    userInfo: {
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
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: getTextColor(),
      marginBottom: 8,
    },
    cardText: {
      fontSize: 14,
      color: currentTheme.textSecondary,
      lineHeight: 20,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: currentTheme.primaryColor,
    },
    statLabel: {
      fontSize: 12,
      color: currentTheme.textSecondary,
      marginTop: 4,
    },
    quickActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },
    actionButton: {
      backgroundColor: currentTheme.secondaryColor,
      padding: 15,
      borderRadius: 8,
      flex: 0.48,
      alignItems: 'center',
    },
    actionButtonText: {
      color: '#FFFFFF',
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hoş Geldiniz!</Text>
        <Text style={styles.userInfo}>{user?.name || 'Kullanıcı'}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Günlük Özet</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Bugünkü Aktivite</Text>
            <Text style={styles.cardText}>
              Uygulamanızı başarıyla kullanıyorsunuz. Tema değiştirme, 
              bildirim ayarları ve diğer özellikleri keşfedin.
            </Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Gün</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Aktivite</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Tema</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ayarlar ve Özelleştirme</Text>
            <Text style={styles.cardText}>
              Uygulamanızı kişiselleştirmek için ayarlar sayfasını kullanın.
            </Text>
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('Settings')}
              >
                <Text style={styles.actionButtonText}>Ayarlar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('Profile')}
              >
                <Text style={styles.actionButtonText}>Profil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Özellikler</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tema Değiştirme</Text>
            <Text style={styles.cardText}>
              Açık, koyu, mavi ve yeşil temalar arasından seçim yapabilirsiniz.
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Bildirimler</Text>
            <Text style={styles.cardText}>
              Bildirim ayarlarınızı yönetin ve alarm kurun.
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Uygulama Puanı</Text>
            <Text style={styles.cardText}>
              Uygulamayı değerlendirin ve geri bildirim verin.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;