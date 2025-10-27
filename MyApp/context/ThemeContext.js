import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themes = {
  light: {
    name: 'Açık Tema',
    primary: '#007AFF',
    secondary: '#34C759',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C6C6C8',
    error: '#FF3B30',
    warning: '#FF9500',
    success: '#34C759'
  },
  dark: {
    name: 'Koyu Tema',
    primary: '#0A84FF',
    secondary: '#30D158',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
    error: '#FF453A',
    warning: '#FF9F0A',
    success: '#30D158'
  },
  blue: {
    name: 'Mavi Tema',
    primary: '#007AFF',
    secondary: '#5AC8FA',
    background: '#F0F8FF',
    surface: '#E6F3FF',
    text: '#003366',
    textSecondary: '#336699',
    border: '#B3D9FF',
    error: '#FF3B30',
    warning: '#FF9500',
    success: '#34C759'
  }
};

const textColors = {
  black: '#000000',
  white: '#FFFFFF',
  gray: '#8E8E93',
  blue: '#007AFF',
  green: '#34C759',
  red: '#FF3B30',
  orange: '#FF9500',
  purple: '#AF52DE'
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [textColor, setTextColor] = useState('default');
  const [notifications, setNotifications] = useState(true);
  const [alarms, setAlarms] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      const savedTextColor = await AsyncStorage.getItem('textColor');
      const savedNotifications = await AsyncStorage.getItem('notifications');
      const savedAlarms = await AsyncStorage.getItem('alarms');

      if (savedTheme) setCurrentTheme(savedTheme);
      if (savedTextColor) setTextColor(savedTextColor);
      if (savedNotifications !== null) setNotifications(JSON.parse(savedNotifications));
      if (savedAlarms !== null) setAlarms(JSON.parse(savedAlarms));
    } catch (error) {
      console.error('Ayarlar yüklenirken hata:', error);
    }
  };

  const saveTheme = async (theme) => {
    try {
      await AsyncStorage.setItem('theme', theme);
      setCurrentTheme(theme);
    } catch (error) {
      console.error('Tema kaydedilirken hata:', error);
    }
  };

  const saveTextColor = async (color) => {
    try {
      await AsyncStorage.setItem('textColor', color);
      setTextColor(color);
    } catch (error) {
      console.error('Yazı rengi kaydedilirken hata:', error);
    }
  };

  const saveNotifications = async (enabled) => {
    try {
      await AsyncStorage.setItem('notifications', JSON.stringify(enabled));
      setNotifications(enabled);
    } catch (error) {
      console.error('Bildirim ayarı kaydedilirken hata:', error);
    }
  };

  const saveAlarms = async (enabled) => {
    try {
      await AsyncStorage.setItem('alarms', JSON.stringify(enabled));
      setAlarms(enabled);
    } catch (error) {
      console.error('Alarm ayarı kaydedilirken hata:', error);
    }
  };

  const theme = themes[currentTheme];
  const activeTextColor = textColor === 'default' ? theme.text : textColors[textColor];

  const value = {
    theme,
    themes,
    currentTheme,
    textColor: activeTextColor,
    textColorName: textColor,
    textColors,
    notifications,
    alarms,
    saveTheme,
    saveTextColor,
    saveNotifications,
    saveAlarms
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};