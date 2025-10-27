# React Native Expo App

Bu uygulama, giriş/kayıt sistemi, tema değiştirme, profil yönetimi ve ayarlar sayfası içeren kapsamlı bir React Native uygulamasıdır.

## Özellikler

### 🔐 Kimlik Doğrulama
- Kullanıcı kayıt sistemi
- Giriş yapma
- Oturum yönetimi
- Profil düzenleme

### 🎨 Tema Sistemi
- 4 farklı tema: Açık, Koyu, Mavi, Yeşil
- Özel metin rengi seçimi
- Dinamik tema değiştirme

### 📱 Sayfalar
- **Ana Sayfa**: Hoş geldin mesajı ve hızlı erişim
- **Profil**: Kullanıcı bilgileri ve düzenleme
- **Ayarlar**: Tema, bildirimler, alarm ve uygulama değerlendirme

### ⚙️ Ayarlar
- Bildirim yönetimi
- Alarm ayarları
- Giriş bilgileri görüntüleme
- Uygulama değerlendirme ve paylaşım

## Kurulum

1. **Expo CLI'yi yükleyin:**
   ```bash
   npm install -g @expo/cli
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Uygulamayı başlatın:**
   ```bash
   npx expo start
   ```

## Expo Go ile Test Etme

1. **Expo Go uygulamasını indirin:**
   - [Android için Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS için App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **QR kodu tarayın:**
   - Terminal'de görünen QR kodu Expo Go ile tarayın
   - Veya `npx expo start` komutunu çalıştırdıktan sonra çıkan QR kodu kullanın

## Kullanım

### İlk Kullanım
1. Uygulamayı açın
2. "Kayıt Ol" butonuna tıklayın
3. Ad, email ve şifre bilgilerinizi girin
4. Kayıt olduktan sonra giriş yapın

### Tema Değiştirme
1. Ayarlar sekmesine gidin
2. "Tema Ayarları" bölümünden istediğiniz temayı seçin
3. "Metin Rengi" bölümünden özel renk seçebilirsiniz

### Profil Düzenleme
1. Profil sekmesine gidin
2. "Profili Düzenle" butonuna tıklayın
3. Bilgilerinizi güncelleyin ve "Kaydet" butonuna tıklayın

## Teknik Detaylar

### Kullanılan Teknolojiler
- React Native
- Expo
- React Navigation
- AsyncStorage
- Context API

### Proje Yapısı
```
src/
├── context/
│   ├── AuthContext.js
│   └── ThemeContext.js
├── screens/
│   ├── LoginScreen.js
│   ├── RegisterScreen.js
│   ├── HomeScreen.js
│   ├── ProfileScreen.js
│   └── SettingsScreen.js
└── components/
```

### Tema Sistemi
- Dinamik tema değiştirme
- AsyncStorage ile tema kaydetme
- Özel metin rengi desteği
- 4 farklı hazır tema

## Geliştirme

### Yeni Özellik Ekleme
1. İlgili context'i güncelleyin
2. Yeni ekranı oluşturun
3. Navigation'a ekleyin
4. Tema desteği ekleyin

### Hata Ayıklama
- Expo DevTools kullanın
- Console logları kontrol edin
- AsyncStorage verilerini temizleyin

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## İletişim

Sorularınız için issue açabilirsiniz.