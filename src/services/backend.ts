// Serviço de Backend API
// IMPORTANTE: Troque esta URL quando fizer deploy no Railway/Render
const BACKEND_URL = __DEV__
  ? "http://localhost:3000" // Desenvolvimento local
  : "https://seu-app.railway.app"; // Produção - TROQUE AQUI depois do deploy

export const backendService = {
  /**
   * Verifica se um código de acesso é válido
   */
  verificarCodigo: async (codigo: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/verificar-codigo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          sucesso: false,
          erro: data.erro || "Erro ao verificar código",
        };
      }

      return {
        sucesso: true,
        usuario: data.usuario,
      };
    } catch (error) {
      console.error("Erro ao verificar código:", error);
      return {
        sucesso: false,
        erro: "Erro de conexão. Verifique sua internet e tente novamente.",
      };
    }
  },

  /**
   * Analisa uma imagem de roleta
   */
  analisarImagem: async (codigo: string, imagemBase64: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/analisar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codigo,
          imagemBase64,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          sucesso: false,
          erro: data.erro || "Erro ao analisar imagem",
        };
      }

      return {
        sucesso: true,
        numeros: data.numeros,
        totalAnalises: data.totalAnalises,
      };
    } catch (error) {
      console.error("Erro ao analisar imagem:", error);
      return {
        sucesso: false,
        erro: "Erro de conexão. Verifique sua internet e tente novamente.",
      };
    }
  },
};
