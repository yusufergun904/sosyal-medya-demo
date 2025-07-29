console.log('🎉 Yeni VS Code workspace başarıyla oluşturuldu!');
console.log('📁 Proje yapısı:');
console.log('   ├── .vscode/          # VS Code ayarları');
console.log('   ├── index.js          # Ana uygulama dosyası');
console.log('   ├── package.json      # Proje konfigürasyonu');
console.log('   └── README.md         # Proje dokümantasyonu');

console.log('\n🚀 Başlamak için:');
console.log('   1. npm install        # Bağımlılıkları yükle');
console.log('   2. npm start          # Uygulamayı başlat');
console.log('   3. npm run dev        # Geliştirme modunda çalıştır');

// Basit bir HTTP sunucusu örneği
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>VS Code Workspace</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f0f0f0; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #007acc; }
            .feature { margin: 10px 0; padding: 10px; background: #f8f9fa; border-left: 4px solid #007acc; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🎉 VS Code Workspace Hazır!</h1>
            <p>Yeni VS Code workspace'iniz başarıyla oluşturuldu.</p>
            
            <h2>📋 Özellikler:</h2>
            <div class="feature">✅ VS Code ayarları (.vscode/settings.json)</div>
            <div class="feature">✅ Önerilen extension'lar (.vscode/extensions.json)</div>
            <div class="feature">✅ Debug konfigürasyonu (.vscode/launch.json)</div>
            <div class="feature">✅ Task konfigürasyonu (.vscode/tasks.json)</div>
            <div class="feature">✅ Node.js proje yapısı (package.json)</div>
            <div class="feature">✅ Basit HTTP sunucusu (index.js)</div>
            
            <h2>🚀 Sonraki Adımlar:</h2>
            <ol>
                <li>Terminal'de <code>npm install</code> komutunu çalıştırın</li>
                <li>VS Code'da extension'ları yükleyin</li>
                <li>Kodlamaya başlayın!</li>
            </ol>
        </div>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🌐 Sunucu http://localhost:${PORT} adresinde çalışıyor`);
  console.log(`📊 Kalan hak: 50`);
});