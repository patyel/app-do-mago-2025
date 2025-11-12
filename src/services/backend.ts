// Serviço de Backend API
// Backend deployado no Render
const BACKEND_URL = "https://mago-backend.onrender.com"; // Sempre usar produção

console.log("[Backend Service] Usando URL:", BACKEND_URL);

export const backendService = {
  /**
   * Verifica se um código de acesso é válido
   */
  verificarCodigo: async (codigo: string) => {
    try {
      console.log("[Backend] Verificando código:", codigo);
      console.log("[Backend] URL:", `${BACKEND_URL}/api/verificar-codigo`);

      const response = await fetch(`${BACKEND_URL}/api/verificar-codigo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigo }),
      });

      console.log("[Backend] Response status:", response.status);

      const data = await response.json();
      console.log("[Backend] Response data:", data);

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
      console.error("[Backend] Erro ao verificar código:", error);
      console.error("[Backend] Error details:", JSON.stringify(error, null, 2));
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
