# 🚀 Guia de Deploy - Backend no Railway

Este guia ensina como colocar o backend do App do Mago no ar de graça usando o Railway.

## 📋 Requisitos

- Conta no GitHub (para conectar com Railway)
- Chave da API OpenAI

## 🎯 Passo 1: Preparar o Código

O backend já está pronto em `/backend`. Vamos fazer o commit:

```bash
cd /home/user/workspace
git add backend/
git commit -m "Add backend com sistema de códigos"
git push
```

## 🚂 Passo 2: Criar Conta no Railway

1. Acesse: https://railway.app/
2. Clique em **"Start a New Project"**
3. Faça login com **GitHub**
4. Autorize o Railway a acessar seus repositórios

## 📦 Passo 3: Deploy do Backend

1. No Railway, clique em **"New Project"**
2. Escolha **"Deploy from GitHub repo"**
3. Selecione o repositório do seu app
4. Railway vai detectar automaticamente que é Node.js

### Configurar Root Directory

Como o backend está na pasta `/backend`, você precisa configurar:

1. Clique no seu projeto
2. Vá em **Settings**
3. Em **"Root Directory"**, coloque: `backend`
4. Clique em **"Save"**

## 🔑 Passo 4: Adicionar Variáveis de Ambiente

1. No painel do Railway, clique em **"Variables"**
2. Adicione as seguintes variáveis:

```
OPENAI_API_KEY=sk-sua-chave-aqui
PORT=3000
```

**IMPORTANTE:** Substitua `sk-sua-chave-aqui` pela sua chave real da OpenAI!

## 🌐 Passo 5: Obter a URL do Backend

1. No painel do Railway, vá em **"Settings"**
2. Role até **"Networking"**
3. Clique em **"Generate Domain"**
4. Copie a URL gerada (ex: `seu-app-production.up.railway.app`)

## 📱 Passo 6: Atualizar o App

Agora você precisa colocar a URL do backend no app:

1. Abra o arquivo: `/src/services/backend.ts`
2. Encontre esta linha:

```typescript
const BACKEND_URL = __DEV__
  ? "http://localhost:3000"
  : "https://seu-app.railway.app"; // <-- TROQUE AQUI
```

3. Substitua `seu-app.railway.app` pela URL que você copiou
4. Salve o arquivo

## ✅ Passo 7: Testar

1. Acesse a URL do seu backend no navegador
2. Você deve ver:

```json
{
  "status": "online",
  "version": "1.0.0",
  "message": "Backend do App do Mago está funcionando! 🎩✨"
}
```

3. No app, tente ativar o código `MAGO-DEMO-2025`
4. Se funcionar, está tudo certo! 🎉

## 💰 Custos

**Railway - Plano Gratuito:**
- ✅ $5 de crédito por mês (renova todo mês)
- ✅ Suficiente para ~50.000 requisições
- ✅ Sem precisar cartão de crédito

**Se passar do limite grátis:**
- Custa ~$0.000463 por minuto de uso
- Com 50 alunos fazendo 20 análises/dia = ~$5-10/mês
- Ainda assim, MUITO barato!

## 🔄 Como Atualizar o Backend

Quando você fizer mudanças no código:

```bash
cd /home/user/workspace
git add backend/
git commit -m "Atualização do backend"
git push
```

O Railway vai fazer deploy automaticamente! ⚡

## 🐛 Problemas Comuns

### Backend não inicia
- Verifique se o **Root Directory** está como `backend`
- Verifique se adicionou a `OPENAI_API_KEY`

### App não consegue conectar
- Verifique se atualizou a URL em `/src/services/backend.ts`
- Teste a URL do backend no navegador primeiro

### Erro 402 (insufficient_quota)
- Sua chave OpenAI não tem créditos
- Adicione créditos em: https://platform.openai.com/account/billing

---

**Pronto! Seu backend está no ar 24/7!** 🚀

Qualquer dúvida, me chama!
