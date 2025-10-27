import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Kullanıcı verileri kontrol edilirken hata:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Basit mock authentication - gerçek uygulamada API çağrısı yapılacak
      const users = await AsyncStorage.getItem('registeredUsers');
      const userList = users ? JSON.parse(users) : [];
      
      const foundUser = userList.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const loginUser = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          loginTime: new Date().toISOString()
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(loginUser));
        setUser(loginUser);
        return { success: true };
      } else {
        return { success: false, message: 'E-posta veya şifre hatalı!' };
      }
    } catch (error) {
      console.error('Giriş yapılırken hata:', error);
      return { success: false, message: 'Giriş yapılırken bir hata oluştu!' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const users = await AsyncStorage.getItem('registeredUsers');
      const userList = users ? JSON.parse(users) : [];
      
      // E-posta zaten kayıtlı mı kontrol et
      const existingUser = userList.find(u => u.email === email);
      if (existingUser) {
        return { success: false, message: 'Bu e-posta adresi zaten kayıtlı!' };
      }
      
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        registrationDate: new Date().toISOString()
      };
      
      userList.push(newUser);
      await AsyncStorage.setItem('registeredUsers', JSON.stringify(userList));
      
      // Kayıt sonrası otomatik giriş
      const loginUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        loginTime: new Date().toISOString()
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(loginUser));
      setUser(loginUser);
      
      return { success: true };
    } catch (error) {
      console.error('Kayıt olurken hata:', error);
      return { success: false, message: 'Kayıt olurken bir hata oluştu!' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Çıkış yapılırken hata:', error);
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      // Registered users listesini de güncelle
      const users = await AsyncStorage.getItem('registeredUsers');
      const userList = users ? JSON.parse(users) : [];
      const userIndex = userList.findIndex(u => u.id === user.id);
      
      if (userIndex !== -1) {
        userList[userIndex] = { ...userList[userIndex], ...updatedData };
        await AsyncStorage.setItem('registeredUsers', JSON.stringify(userList));
      }
      
      return { success: true };
    } catch (error) {
      console.error('Profil güncellenirken hata:', error);
      return { success: false, message: 'Profil güncellenirken bir hata oluştu!' };
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};