# 👥 Guia de Gerenciamento de Usuários

Este guia ensina como gerenciar seus alunos que pagam pela mensalidade.

## 📝 Arquivo de Usuários

Todos os usuários ficam em: `/backend/users.json`

```json
{
  "users": {
    "MAGO-2025-ABC123": {
      "nome": "João Silva",
      "email": "joao@email.com",
      "criadoEm": "2025-01-10T00:00:00.000Z",
      "expiraEm": "2025-02-10T23:59:59.999Z",
      "ativo": true,
      "totalAnalises": 45,
      "ultimaAnalise": "2025-01-15T14:30:00.000Z"
    }
  }
}
```

## ➕ Como Adicionar um Novo Aluno

Quando um aluno pagar, siga esses passos:

### 1. Gerar um Código Único

Formato: `MAGO-2025-XXXXX`

Exemplos:
- `MAGO-2025-JO123` (iniciais + números)
- `MAGO-2025-A1234` (letra + números)
- `MAGO-2025-MARIA` (nome)

**Dica:** Use algo que você reconheça facilmente!

### 2. Adicionar no users.json

Abra `/backend/users.json` e adicione:

```json
{
  "users": {
    "MAGO-2025-ABC123": {
      ...usuário existente...
    },
    "MAGO-2025-SEU-CODIGO-AQUI": {
      "nome": "Nome do Aluno",
      "email": "email@aluno.com",
      "criadoEm": "2025-01-12T00:00:00.000Z",
      "expiraEm": "2025-02-12T23:59:59.999Z",
      "ativo": true,
      "totalAnalises": 0,
      "ultimaAnalise": null
    }
  }
}
```

**IMPORTANTE:**
- `criadoEm`: Data de hoje
- `expiraEm`: Data de hoje + 30 dias
- Use formato ISO: `2025-01-12T23:59:59.999Z`

### 3. Fazer Deploy

```bash
cd /home/user/workspace
git add backend/users.json
git commit -m "Adicionar novo aluno"
git push
```

O Railway faz deploy automático em ~1 minuto.

### 4. Enviar Código para o Aluno

Envie uma mensagem como:

```
Olá! Seu acesso ao App do Mago foi ativado! 🎩✨

Código de Acesso: MAGO-2025-XXXXX

Como ativar:
1. Abra o app
2. Digite seu código
3. Clique em "Ativar Código"

Válido por 30 dias. Análises ilimitadas!

Qualquer dúvida, me chama!
```

## 🔄 Como Renovar um Aluno

Quando o aluno pagar novamente:

1. Abra `/backend/users.json`
2. Encontre o código do aluno
3. Atualize `expiraEm` para + 30 dias
4. Certifique-se que `ativo` está `true`

```json
"expiraEm": "2025-03-12T23:59:59.999Z",
"ativo": true
```

5. Commit e push:

```bash
git add backend/users.json
git commit -m "Renovar aluno MAGO-2025-XXXXX"
git push
```

## ❌ Como Desativar um Aluno

Se o aluno não pagou ou você quer bloquear:

1. Abra `/backend/users.json`
2. Encontre o código do aluno
3. Mude `ativo` para `false`

```json
"ativo": false
```

4. Commit e push:

```bash
git add backend/users.json
git commit -m "Desativar aluno MAGO-2025-XXXXX"
git push
```

O aluno não conseguirá mais fazer análises.

## 📊 Como Ver Estatísticas

Acesse no navegador:

```
https://seu-backend.railway.app/api/stats
```

Você verá:

```json
{
  "totalUsuarios": 10,
  "usuariosAtivos": 8,
  "totalAnalises": 450,
  "analisesPorUsuario": [
    {
      "nome": "João Silva",
      "totalAnalises": 45,
      "ativo": true
    },
    ...
  ]
}
```

Assim você sabe:
- Quantos alunos tem
- Quem está usando mais
- Se alguém está abusando

## 💡 Dicas de Organização

### Use Nomes Reconhecíveis

```json
"MAGO-2025-JOAO": {...},
"MAGO-2025-MARIA": {...},
"MAGO-2025-PEDRO": {...}
```

### Crie um Planilha (Opcional)

| Código | Nome | Email | Pago Em | Expira Em | Status |
|--------|------|-------|---------|-----------|--------|
| MAGO-2025-JOAO | João Silva | joao@email.com | 10/01 | 10/02 | ✅ Ativo |
| MAGO-2025-MARIA | Maria Santos | maria@email.com | 12/01 | 12/02 | ✅ Ativo |

### Crie Lembretes

Configure lembretes 5 dias antes de expirar para avisar o aluno renovar.

## 🤖 Automação (Opcional)

Se você tem MUITOS alunos, posso criar:
- Script para gerar códigos automaticamente
- Integração com Mercado Pago/Stripe
- Sistema de renovação automática
- Painel admin web bonitinho

Me avisa se quiser! 🚀

## ⚠️ Importante

- **NUNCA** compartilhe o arquivo `users.json` publicamente
- **SEMPRE** faça backup antes de editar
- **TESTE** no código demo antes de fazer mudanças grandes

## 🆘 Problemas Comuns

### Código não funciona após adicionar
- Verifique se fez o push pro GitHub
- Aguarde 1-2 minutos pro Railway fazer deploy
- Teste no navegador: `https://seu-backend.railway.app/api/verificar-codigo`

### JSON dá erro
- Use um validador: https://jsonlint.com/
- Verifique vírgulas e chaves

### Aluno reclama que expirou
- Verifique a data em `expiraEm`
- Formato deve ser ISO: `2025-02-12T23:59:59.999Z`

---

**Pronto! Agora você sabe gerenciar seus alunos!** 🎓

Qualquer dúvida, me chama!
