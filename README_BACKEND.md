# 🎩 App do Mago - Sistema Completo com Backend

Sistema completo de códigos de acesso para monetizar seu app de análise de roleta!

## 🎯 Como Funciona

1. **Aluno paga R$30/mês**
2. **Você gera um código único** (ex: `MAGO-2025-ABC123`)
3. **Aluno ativa o código no app** → 30 dias de acesso
4. **Análises ilimitadas** durante o período
5. **Você controla tudo** pelo arquivo `users.json`

## 💰 Seus Custos x Lucros

**Com 10 alunos:**
- Receita: R$300/mês (10 × R$30)
- Custo OpenAI: R$50-100/mês
- Hospedagem Railway: R$0 (grátis)
- **Lucro: R$200-250/mês** 💚

**Com 50 alunos:**
- Receita: R$1.500/mês (50 × R$30)
- Custo OpenAI: R$250-500/mês
- Hospedagem Railway: R$25-50/mês
- **Lucro: R$950-1.225/mês** 💚💚

## 📚 Guias Disponíveis

### 1. DEPLOY_RAILWAY.md
Como colocar o backend no ar de graça (10 minutos)

### 2. GERENCIAR_USUARIOS.md
Como adicionar, renovar e desativar alunos

## 🚀 Quick Start

### 1. Configure o Backend Local

```bash
cd backend
npm install
```

Crie o arquivo `.env`:

```
OPENAI_API_KEY=sk-sua-chave-aqui
PORT=3000
```

Inicie o backend:

```bash
npm start
```

### 2. Teste no App

O app já está configurado para desenvolvimento local!

1. Abra o app no Vibecode
2. Complete o onboarding
3. Use o código: `MAGO-DEMO-2025`
4. Tire uma foto do painel
5. Veja a mágica acontecer! ✨

### 3. Deploy no Railway

Siga o guia `DEPLOY_RAILWAY.md` (10 minutos)

### 4. Atualize a URL no App

Em `/src/services/backend.ts`, troque:

```typescript
const BACKEND_URL = __DEV__
  ? "http://localhost:3000"
  : "https://SEU-APP.railway.app"; // <-- Coloque sua URL aqui
```

## 🔐 Segurança

✅ **Chaves da OpenAI no backend** - Ninguém rouba suas chaves
✅ **Sistema de códigos** - Controle total de quem usa
✅ **Verificação em tempo real** - Códigos expirados não funcionam
✅ **Logs de uso** - Veja quem está usando e quanto

## 📱 Fluxo do Aluno

1. **Instala o app**
2. **Vê o onboarding** → Explica como funciona
3. **Tela de ativação** → Digite o código
4. **Código válido** → Redireciona para Home
5. **Usa o app** → Análises ilimitadas
6. **Vê dias restantes** → Card verde na Home
7. **Código expira** → Volta pra tela de ativação

## 🛠️ Estrutura do Projeto

```
/backend/
  ├── server.js           # API do backend
  ├── users.json          # Seus alunos
  ├── package.json        # Dependências
  └── .env.example        # Template das env vars

/src/
  ├── services/
  │   └── backend.ts      # Comunicação com backend
  ├── state/
  │   └── accessCodeStore.ts  # Gerencia códigos
  ├── screens/
  │   └── ActivationScreen.tsx  # Tela de ativar código
  └── ...

DEPLOY_RAILWAY.md         # Guia de deploy
GERENCIAR_USUARIOS.md     # Guia de gerenciamento
```

## 📊 Endpoints da API

### GET /
Health check

### POST /api/verificar-codigo
Verifica se um código é válido

```json
{
  "codigo": "MAGO-2025-ABC123"
}
```

### POST /api/analisar
Analisa imagem de roleta (protegido por código)

```json
{
  "codigo": "MAGO-2025-ABC123",
  "imagemBase64": "base64_da_imagem..."
}
```

### GET /api/stats
Estatísticas de uso (para você ver)

## 🎨 Features Implementadas

✅ Backend Node.js com Express
✅ Sistema de códigos de acesso
✅ Validação e expiração automática
✅ Integração com OpenAI GPT-4o
✅ Tela de ativação bonita
✅ Card de status na Home
✅ Verificação em tempo real
✅ Logs de uso por usuário
✅ Deploy fácil no Railway
✅ Guias completos de uso

## 🔄 Como Atualizar

### Adicionar novo aluno

1. Edite `/backend/users.json`
2. Commit e push

```bash
git add backend/users.json
git commit -m "Adicionar aluno X"
git push
```

### Atualizar código do app

```bash
git add src/
git commit -m "Atualizar funcionalidade Y"
git push
```

### Atualizar backend

```bash
git add backend/
git commit -m "Melhorar endpoint Z"
git push
```

Railway faz deploy automático! ⚡

## 💡 Próximos Passos (Opcional)

Quer melhorar ainda mais? Posso adicionar:

- 🔔 **Notificações push** quando código vai expirar
- 💳 **Integração Mercado Pago** para pagamento automático
- 🎛️ **Painel admin web** para gerenciar sem editar JSON
- 📈 **Dashboard de analytics** com gráficos
- 🎁 **Sistema de cupons** de desconto
- 👥 **Planos diferentes** (básico, premium, etc)

Me avisa se quiser! 🚀

## 🆘 Precisa de Ajuda?

Abra uma issue ou me chame que eu te ajudo!

## 📄 Licença

Este projeto é seu! Use como quiser para ganhar dinheiro! 💰

---

**Feito com ❤️ para você lucrar!** 🎩✨
