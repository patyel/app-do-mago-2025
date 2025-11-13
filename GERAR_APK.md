# 📱 Como Gerar APK do App do Mago para Android

## ⚠️ IMPORTANTE
Como o Vibecode ainda não está disponível no Android, você precisa distribuir o APK diretamente para seus alunos Android.

---

## 🚀 Passo a Passo para Gerar o APK

### 1️⃣ Criar conta no Expo (Grátis)

1. Acesse: https://expo.dev/signup
2. Crie uma conta (pode usar Google/GitHub)
3. Confirme seu email

### 2️⃣ Fazer Login no Terminal

No terminal do seu projeto, rode:

```bash
export PATH="/home/user/.bun/bin:$PATH"
eas login
```

Digite seu email e senha da conta Expo.

### 3️⃣ Configurar o Projeto

```bash
eas build:configure
```

Quando perguntar:
- **"Would you like to automatically create an EAS project?"** → Digite `Y` (Yes)

### 4️⃣ Gerar o APK (Production)

```bash
eas build --platform android --profile production
```

**O que vai acontecer:**
1. Expo vai fazer upload do seu código
2. Build vai rodar na nuvem da Expo (GRÁTIS - você tem builds gratuitos)
3. Processo demora ~10-15 minutos
4. Você receberá um link para baixar o APK

### 5️⃣ Baixar o APK

Quando o build terminar, você verá:

```
✔ Build finished
https://expo.dev/accounts/SEUUSER/projects/app-do-mago/builds/XXXXX
```

1. Abra o link no navegador
2. Clique em **"Download"**
3. Salve o arquivo `.apk`

---

## 📤 Como Distribuir o APK para seus Alunos

### Opção 1: WhatsApp/Telegram (Mais Fácil)
1. Envie o APK direto no chat
2. Instrua o aluno:
   ```
   1. Baixe o arquivo APK
   2. Vá em Configurações → Segurança
   3. Ative "Instalar apps de fontes desconhecidas"
   4. Abra o APK baixado
   5. Clique em "Instalar"
   6. Pronto! 🎉
   ```

### Opção 2: Google Drive/Dropbox
1. Faça upload do APK
2. Gere um link público
3. Envie o link para os alunos

### Opção 3: Seu próprio site
1. Hospede o APK no seu servidor
2. Crie uma página de download

---

## 🔄 Como Atualizar o App (Fazer Nova Versão)

Quando você fizer mudanças e quiser lançar uma atualização:

### 1. Atualize a versão no `app.json`:

```json
{
  "expo": {
    "version": "1.0.1",  // Era 1.0.0, agora 1.0.1
    "android": {
      "versionCode": 2   // Era 1, agora 2
    }
  }
}
```

### 2. Gere novo APK:

```bash
eas build --platform android --profile production
```

### 3. Distribua o novo APK

Seus alunos vão instalar por cima do antigo (os dados não são perdidos).

---

## 💰 Custos

- **Builds na Expo**: GRATUITO (limite de builds por mês no plano free)
- **Hospedagem do APK**: Depende de onde você hospedar
  - WhatsApp/Telegram: Grátis
  - Google Drive: Grátis (15GB)
  - Dropbox: Grátis (2GB)

---

## ⚡ Build Mais Rápido (Opcional)

Se você quiser testar antes de fazer o build de produção:

```bash
eas build --platform android --profile preview
```

Isso gera um APK mais rápido (sem otimizações).

---

## 🆘 Solução de Problemas

### ❌ "Build failed"
- Verifique se você tem uma conta Expo válida
- Tente rodar `eas build:configure` novamente

### ❌ "App não instala no celular"
- Peça para o aluno ativar "Fontes desconhecidas" nas configurações
- Verifique se o celular tem espaço (o APK tem ~50-80MB)

### ❌ "App fecha quando abre"
- Provavelmente falta a API key da OpenAI
- Verifique se o `.env` está configurado corretamente

---

## 📊 Diferença: APK vs Vibecode

| Aspecto | APK Standalone | Vibecode |
|---------|----------------|----------|
| **Android** | ✅ Funciona | ❌ Não disponível ainda |
| **iOS** | ❌ Precisa IPA separado | ✅ Funciona |
| **Atualizações** | Manual (novo APK) | Automática |
| **Distribuição** | Você envia o arquivo | Link universal |
| **Trabalho** | Mais trabalhoso | Mais fácil |

---

## 🎯 Recomendação

**Para Android**: Use APK standalone (já que Vibecode não está disponível)
**Para iOS**: Continue usando Vibecode

Quando o Vibecode lançar no Android, você pode migrar os alunos!

---

## 📝 Instruções para Enviar aos Alunos Android

```
🎰 App do Mago - Instalação Android

1. Baixe o arquivo APK que enviei
2. Abra o arquivo baixado
3. Se aparecer aviso de segurança:
   - Vá em Configurações → Segurança
   - Ative "Fontes desconhecidas" ou "Instalar apps desconhecidos"
4. Volte e abra o APK novamente
5. Clique em "Instalar"
6. Pronto! Abra o app e use seu código de acesso

Qualquer problema, me chame! 💜
```

---

## ✅ Checklist Final

Antes de distribuir, verifique:
- [ ] API key da OpenAI está configurada
- [ ] Backend está rodando (se você usa o sistema de códigos)
- [ ] Testou o APK em pelo menos 1 celular Android
- [ ] Versão está correta no app.json
- [ ] Preparou instruções de instalação para os alunos
