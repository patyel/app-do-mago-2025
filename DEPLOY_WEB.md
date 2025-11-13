# 🌐 DEPLOY WEB - PASSO A PASSO PARA LEIGO

## 🎯 DEPLOY NA VERCEL (5 MINUTOS - GRÁTIS)

### **PASSO 1: Criar conta na Vercel**
1. Acesse: https://vercel.com/signup
2. Clique em **"Continue with GitHub"**
3. Faça login com sua conta GitHub
4. Autorize a Vercel

### **PASSO 2: Importar o projeto**
1. Na página inicial da Vercel, clique em **"Add New..."** → **"Project"**
2. Procure por: **"app-do-mago-2025"**
3. Clique em **"Import"**

### **PASSO 3: Configurar o build**
Na tela de configuração:

**Framework Preset:** Selecione **"Other"**

**Build Command:**
```
npx expo export --platform web
```

**Output Directory:**
```
dist
```

**Install Command:**
```
npm install
```

### **PASSO 4: Adicionar variáveis de ambiente**
Clique em **"Environment Variables"** e adicione:

```
EXPO_PUBLIC_VIBECODE_OPENAI_API_KEY=sua_chave_aqui
EXPO_PUBLIC_VIBECODE_ANTHROPIC_API_KEY=sua_chave_aqui
EXPO_PUBLIC_VIBECODE_GROK_API_KEY=sua_chave_aqui
EXPO_PUBLIC_VIBECODE_GOOGLE_API_KEY=sua_chave_aqui
EXPO_PUBLIC_VIBECODE_ELEVENLABS_API_KEY=sua_chave_aqui
```

*(Copie as chaves do arquivo `.env`)*

### **PASSO 5: Deploy!**
1. Clique em **"Deploy"**
2. AGUARDE 3-5 minutos
3. Quando terminar, vai aparecer: **"Congratulations!"**
4. Clique em **"Visit"** para ver seu app WEB online! 🎉

---

## 🔗 SEU APP ESTARÁ ONLINE EM:

```
https://app-do-mago-2025.vercel.app
```

Ou um domínio customizado que você escolher!

---

## ✅ DEPOIS DO DEPLOY:

- Acesse pelo celular Android: FUNCIONA! ✅
- Acesse pelo iPhone: FUNCIONA! ✅
- Acesse pelo PC: FUNCIONA! ✅
- Compartilhe o link: Qualquer um acessa! ✅

---

## 🎯 VANTAGENS:

✅ Não precisa APK
✅ Não precisa Play Store
✅ Atualiza instantaneamente
✅ Funciona em QUALQUER dispositivo
✅ Câmera funciona no navegador
✅ Link direto para compartilhar
✅ **GRÁTIS na Vercel!**

---

## 🔄 ATUALIZAR O APP:

Quando você fizer mudanças no código:

1. Faça commit no GitHub:
```bash
git add .
git commit -m "Atualização"
git push
```

2. **A Vercel atualiza AUTOMATICAMENTE!** 🚀

Nem precisa fazer nada! Em 2 minutos o app está atualizado online!

---

## 📱 ADICIONAR À TELA INICIAL (MOBILE):

### **Android (Chrome):**
1. Abra o app web no Chrome
2. Menu (3 pontinhos) → **"Adicionar à tela inicial"**
3. Pronto! Ícone como um app nativo!

### **iOS (Safari):**
1. Abra o app web no Safari
2. Botão compartilhar → **"Adicionar à Tela de Início"**
3. Pronto! Ícone como um app nativo!

---

## 🎉 RESULTADO:

Seus clientes vão ter um **LINK** para acessar o app:
- Funciona em Android ✅
- Funciona em iOS ✅
- Funciona em Desktop ✅
- Sem precisar baixar nada ✅
- Sem precisar Play Store ✅

**É MUITO MAIS FÁCIL QUE APK!** 🚀

---

**Qualquer dúvida, me chama!** 💪
