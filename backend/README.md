# Backend do App do Mago 🎩

## Como Subir no Railway (SEM GitHub)

### Opção 1: Deploy Direto (Mais Fácil)

1. **Baixe esta pasta `backend` completa**
   - Clique com botão direito na pasta `backend`
   - Escolha "Download" ou "Baixar"

2. **Acesse Railway**
   - Vá em: https://railway.app/
   - Faça login (pode ser com Google, GitHub, etc)

3. **Criar Projeto**
   - Clique "New Project"
   - Escolha "Empty Project"

4. **Adicionar Serviço**
   - Clique "+ New"
   - Escolha "Empty Service"

5. **Fazer Deploy**
   - Vá em "Settings" do serviço
   - Em "Source", clique "Connect Repo"
   - Ou arraste a pasta backend direto!

6. **Adicionar Variáveis**
   - Clique em "Variables"
   - Adicione:
     ```
     OPENAI_API_KEY=sua-chave-aqui
     PORT=3000
     ```

7. **Gerar URL**
   - Vá em "Settings"
   - Em "Networking"
   - Clique "Generate Domain"
   - Copie a URL!

## Arquivos nesta pasta:

- `server.js` - Servidor Node.js
- `package.json` - Dependências
- `users.json` - Banco de dados de usuários
- `.env.example` - Exemplo de variáveis
- `railway.json` - Configuração do Railway

## Usuário Demo:

Código: `MAGO-DEMO-2025`
Válido até: 31/12/2025
