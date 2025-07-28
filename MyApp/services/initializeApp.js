import AsyncStorage from '@react-native-async-storage/async-storage';

export const initializeDemoData = async () => {
  try {
    const existingUsers = await AsyncStorage.getItem('registeredUsers');
    
    if (!existingUsers) {
      // Demo kullanıcı oluştur
      const demoUser = {
        id: 'demo-user-001',
        name: 'Demo Kullanıcı',
        email: 'demo@test.com',
        password: '123456',
        registrationDate: new Date().toISOString()
      };
      
      await AsyncStorage.setItem('registeredUsers', JSON.stringify([demoUser]));
      console.log('Demo kullanıcı oluşturuldu');
    }
  } catch (error) {
    console.error('Demo veri oluşturulurken hata:', error);
  }
};