import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('currentUser');
      const savedUsers = await AsyncStorage.getItem('users');
      
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, name) => {
    try {
      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        throw new Error('Bu email adresi zaten kayıtlı!');
      }

      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name,
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

      return { success: true, message: 'Kayıt başarılı!' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Email veya şifre hatalı!');
      }

      setUser(foundUser);
      await AsyncStorage.setItem('currentUser', JSON.stringify(foundUser));

      return { success: true, message: 'Giriş başarılı!' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('currentUser');
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      
      const updatedUsers = users.map(u => 
        u.id === user.id ? updatedUser : u
      );
      setUsers(updatedUsers);
      
      await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

      return { success: true, message: 'Profil güncellendi!' };
    } catch (error) {
      return { success: false, message: 'Profil güncellenirken hata oluştu!' };
    }
  };

  const value = {
    user,
    isLoading,
    register,
    login,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};