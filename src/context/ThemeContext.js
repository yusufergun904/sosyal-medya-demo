import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const themes = {
  light: {
    name: 'light',
    backgroundColor: '#FFFFFF',
    surfaceColor: '#F5F5F5',
    primaryColor: '#007AFF',
    secondaryColor: '#5856D6',
    textColor: '#000000',
    textSecondary: '#666666',
    borderColor: '#E0E0E0',
    successColor: '#34C759',
    errorColor: '#FF3B30',
    warningColor: '#FF9500',
  },
  dark: {
    name: 'dark',
    backgroundColor: '#000000',
    surfaceColor: '#1C1C1E',
    primaryColor: '#0A84FF',
    secondaryColor: '#5E5CE6',
    textColor: '#FFFFFF',
    textSecondary: '#8E8E93',
    borderColor: '#38383A',
    successColor: '#30D158',
    errorColor: '#FF453A',
    warningColor: '#FF9F0A',
  },
  blue: {
    name: 'blue',
    backgroundColor: '#E3F2FD',
    surfaceColor: '#BBDEFB',
    primaryColor: '#1976D2',
    secondaryColor: '#42A5F5',
    textColor: '#0D47A1',
    textSecondary: '#1565C0',
    borderColor: '#90CAF9',
    successColor: '#2E7D32',
    errorColor: '#C62828',
    warningColor: '#F57C00',
  },
  green: {
    name: 'green',
    backgroundColor: '#E8F5E8',
    surfaceColor: '#C8E6C9',
    primaryColor: '#388E3C',
    secondaryColor: '#66BB6A',
    textColor: '#1B5E20',
    textSecondary: '#2E7D32',
    borderColor: '#A5D6A7',
    successColor: '#2E7D32',
    errorColor: '#C62828',
    warningColor: '#F57C00',
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const [customTextColor, setCustomTextColor] = useState(null);

  useEffect(() => {
    loadThemeSettings();
  }, []);

  const loadThemeSettings = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      const savedTextColor = await AsyncStorage.getItem('customTextColor');
      
      if (savedTheme && themes[savedTheme]) {
        setCurrentTheme(themes[savedTheme]);
      }
      
      if (savedTextColor) {
        setCustomTextColor(savedTextColor);
      }
    } catch (error) {
      console.log('Error loading theme settings:', error);
    }
  };

  const changeTheme = async (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themes[themeName]);
      try {
        await AsyncStorage.setItem('theme', themeName);
      } catch (error) {
        console.log('Error saving theme:', error);
      }
    }
  };

  const changeTextColor = async (color) => {
    setCustomTextColor(color);
    try {
      await AsyncStorage.setItem('customTextColor', color);
    } catch (error) {
      console.log('Error saving text color:', error);
    }
  };

  const getTextColor = () => {
    return customTextColor || currentTheme.textColor;
  };

  const value = {
    currentTheme,
    changeTheme,
    changeTextColor,
    getTextColor,
    customTextColor,
    themes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};