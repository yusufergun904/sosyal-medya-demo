import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const { theme, textColor } = useTheme();

  const features = [
    {
      id: 1,
      title: 'Profil',
      description: 'Profil bilgilerinizi görüntüleyin ve düzenleyin',
      icon: 'person-outline',
      color: theme.primary,
      onPress: () => navigation.navigate('Profile')
    },
    {
      id: 2,
      title: 'Ayarlar',
      description: 'Uygulama ayarlarını özelleştirin',
      icon: 'settings-outline',
      color: theme.secondary,
      onPress: () => navigation.navigate('Settings')
    },
    {
      id: 3,
      title: 'Bildirimler',
      description: 'Bildirim ayarlarınızı yönetin',
      icon: 'notifications-outline',
      color: '#FF9500',
      onPress: () => navigation.navigate('Settings')
    },
    {
      id: 4,
      title: 'Alarm',
      description: 'Alarm ayarlarınızı düzenleyin',
      icon: 'alarm-outline',
      color: '#FF3B30',
      onPress: () => navigation.navigate('Settings')
    }
  ];

  const quickStats = [
    {
      title: 'Giriş Tarihi',
      value: user?.loginTime ? new Date(user.loginTime).toLocaleDateString('tr-TR') : 'Bilinmiyor',
      icon: 'calendar-outline'
    },
    {
      title: 'Tema',
      value: theme.name,
      icon: 'color-palette-outline'
    },
    {
      title: 'Durum',
      value: 'Aktif',
      icon: 'checkmark-circle-outline'
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
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: textColor,
      marginBottom: 8,
    },
    subText: {
      fontSize: 16,
      color: theme.textSecondary,
      marginBottom: 20,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    statCard: {
      flex: 1,
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 15,
      marginHorizontal: 5,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
    },
    statIcon: {
      marginBottom: 8,
    },
    statValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: textColor,
      textAlign: 'center',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: theme.textSecondary,
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: textColor,
      marginHorizontal: 20,
      marginBottom: 15,
    },
    featuresContainer: {
      paddingHorizontal: 20,
    },
    featureRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    featureCard: {
      flex: 1,
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 5,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    featureIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    featureTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: textColor,
      marginBottom: 8,
      textAlign: 'center',
    },
    featureDescription: {
      fontSize: 12,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: 16,
    },
    bottomContainer: {
      padding: 20,
      marginTop: 20,
    },
    infoCard: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 20,
      borderWidth: 1,
      borderColor: theme.border,
    },
    infoTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: textColor,
      marginBottom: 10,
      textAlign: 'center',
    },
    infoText: {
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Merhaba, {user?.name || 'Kullanıcı'}! 👋
        </Text>
        <Text style={styles.subText}>
          Uygulamaya hoş geldiniz. İstediğiniz özelliği seçin.
        </Text>
        
        <View style={styles.statsContainer}>
          {quickStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Ionicons 
                name={stat.icon} 
                size={24} 
                color={theme.primary} 
                style={styles.statIcon} 
              />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.title}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Özellikler</Text>
      
      <View style={styles.featuresContainer}>
        <View style={styles.featureRow}>
          {features.slice(0, 2).map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={styles.featureCard}
              onPress={feature.onPress}
              activeOpacity={0.7}
            >
              <View style={[styles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
                <Ionicons name={feature.icon} size={28} color={feature.color} />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.featureRow}>
          {features.slice(2, 4).map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={styles.featureCard}
              onPress={feature.onPress}
              activeOpacity={0.7}
            >
              <View style={[styles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
                <Ionicons name={feature.icon} size={28} color={feature.color} />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Demo Uygulaması</Text>
          <Text style={styles.infoText}>
            Bu uygulama React Native ve Expo ile geliştirilmiş bir demo uygulamasıdır. 
            Tema değiştirme, yazı rengi özelleştirme, bildirim ve alarm ayarları gibi 
            özellikleri test edebilirsiniz.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}