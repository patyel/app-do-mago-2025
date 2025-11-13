# Guia para Compilar o App do Mago - Android

## Opção 1: Build com EAS (Recomendado - Online)

### Pré-requisitos
- Conta no Expo
- EAS CLI instalado

### Passos
```bash
# 1. Instalar EAS CLI (se não tiver)
npm install -g eas-cli

# 2. Login no EAS
eas login

# 3. Fazer o build
eas build --platform android --profile production
```

Se der erro, tente com o profile preview:
```bash
eas build --platform android --profile preview
```

---

## Opção 2: Build Local (Requer Android Studio)

### Pré-requisitos
- Node.js instalado
- Java JDK 17 instalado
- Android SDK instalado
- Variável ANDROID_HOME configurada
- Variável JAVA_HOME configurada

### Instalação do Java JDK 17 (se não tiver)

**Windows:**
1. Baixe o JDK 17: https://adoptium.net/
2. Instale e configure JAVA_HOME:
   - Painel de Controle → Sistema → Configurações Avançadas → Variáveis de Ambiente
   - Adicione JAVA_HOME apontando para o diretório do JDK

**macOS:**
```bash
brew install openjdk@17
echo 'export JAVA_HOME=/usr/local/opt/openjdk@17' >> ~/.zshrc
```

**Linux:**
```bash
sudo apt-get install openjdk-17-jdk
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

### Instalação do Android SDK

**Opção A - Via Android Studio (Mais Fácil):**
1. Baixe o Android Studio: https://developer.android.com/studio
2. Instale e abra o Android Studio
3. Vá em Tools → SDK Manager
4. Instale o Android SDK 34
5. Configure ANDROID_HOME:
   - Windows: `C:\Users\SeuUsuario\AppData\Local\Android\Sdk`
   - macOS: `~/Library/Android/sdk`
   - Linux: `~/Android/Sdk`

**Opção B - Command Line Tools:**
```bash
# Baixe de: https://developer.android.com/studio#command-tools
# Extraia e configure ANDROID_HOME
```

### Passos para Build Local

```bash
# 1. Navegar até a pasta do projeto
cd /caminho/para/app-do-mago

# 2. Instalar dependências
npm install
# ou
bun install

# 3. Verificar se os arquivos Android já existem
# Se não existirem, gerar:
npx expo prebuild --platform android --clean

# 4. Ir para a pasta Android
cd android

# 5. Compilar o APK de Release
./gradlew assembleRelease

# 6. O APK estará em:
# android/app/build/outputs/apk/release/app-release.apk
```

### Criar APK Assinado (Para Publicação)

```bash
# 1. Gerar keystore (apenas uma vez)
keytool -genkeypair -v -storetype PKCS12 -keystore app-do-mago.keystore -alias app-do-mago -keyalg RSA -keysize 2048 -validity 10000

# 2. Criar arquivo android/gradle.properties com:
MYAPP_UPLOAD_STORE_FILE=app-do-mago.keystore
MYAPP_UPLOAD_KEY_ALIAS=app-do-mago
MYAPP_UPLOAD_STORE_PASSWORD=sua_senha_aqui
MYAPP_UPLOAD_KEY_PASSWORD=sua_senha_aqui

# 3. Build release assinado
cd android
./gradlew assembleRelease

# O APK assinado estará em:
# android/app/build/outputs/apk/release/app-release.apk
```

---

## Opção 3: APK Builder Online (Mais Simples)

Se você não quer instalar nada, pode usar serviços online:

### Appetize.io Build
1. Acesse: https://appetize.io
2. Faça upload do projeto
3. Gere o APK

### Outros Serviços
- https://www.appcircle.io/ (grátis com limitações)
- https://codemagic.io/ (grátis com limitações)

---

## Problemas Comuns

### Erro: "JAVA_HOME is not set"
**Solução:** Configure a variável de ambiente JAVA_HOME apontando para seu JDK

### Erro: "SDK location not found"
**Solução:** Configure ANDROID_HOME ou crie android/local.properties:
```
sdk.dir=/caminho/para/seu/Android/Sdk
```

### Erro: "Gradle build failed"
**Solução:** Limpe o cache:
```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

### Erro de memória do Gradle
**Solução:** Aumente a memória em android/gradle.properties:
```
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=512m
```

---

## Contato e Suporte

Se precisar de ajuda:
1. Verifique os logs de erro completos
2. Google o erro específico
3. Consulte a documentação oficial do Expo: https://docs.expo.dev/

## Configurações Atuais do Projeto

- **Expo SDK:** 53.0.9
- **React Native:** 0.76.7
- **Target SDK:** 34
- **Compile SDK:** 34
- **Kotlin Version:** 1.9.24
- **Nova Arquitetura:** Desativada
