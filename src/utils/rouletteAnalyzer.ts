// Motor de análise de padrões de roleta - TODOS OS PADRÕES
import {
  RouletteResult,
  RouletteColor,
  DozenPosition,
  ColumnPosition,
  SequencePattern,
  RouletteOpportunity,
  RouletteAnalysis,
} from "../types/roulette";

// Mapeamento dos números da roleta
const ROULETTE_MAP = {
  red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
  black: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
};

export const getNumberColor = (num: number): RouletteColor => {
  if (num === 0) return "green";
  if (ROULETTE_MAP.red.includes(num)) return "red";
  return "black";
};

export const getNumberDozen = (num: number): DozenPosition | null => {
  if (num === 0) return null;
  if (num >= 1 && num <= 12) return 1;
  if (num >= 13 && num <= 24) return 2;
  return 3;
};

export const getNumberColumn = (num: number): ColumnPosition | null => {
  if (num === 0) return null;
  if (num % 3 === 1) return 1;
  if (num % 3 === 2) return 2;
  return 3;
};

export const parseRouletteNumber = (num: number): RouletteResult => {
  return {
    number: num,
    color: getNumberColor(num),
    dozen: getNumberDozen(num),
    column: getNumberColumn(num),
  };
};

interface AllPatternInfo {
  type: "dozen" | "column";
  positions: string;
  count: number;
  isActive: boolean; // Se está ativo agora (últimos 4)
  justBroke: boolean; // Se acabou de quebrar (último número quebrou)
  countBeforeBreak?: number; // Quantas sequências tinha antes da quebra
}

// Analisa TODOS os padrões de dúzias na foto
const analyzeAllDozenPatterns = (results: RouletteResult[]): AllPatternInfo[] => {
  const allPatterns: AllPatternInfo[] = [];
  const dozenPairs = [
    { pair: [1, 2], name: "1ª + 2ª" },
    { pair: [1, 3], name: "1ª + 3ª" },
    { pair: [2, 3], name: "2ª + 3ª" },
  ];

  // IMPORTANTE: Analisa apenas os últimos 10 números (mais recentes)
  const recentResults = results.slice(-10);

  for (const { pair, name } of dozenPairs) {
    // Conta sequência do FINAL pra trás (mais recente)
    let countFromEnd = 0;
    for (let i = recentResults.length - 1; i >= 0; i--) {
      if (recentResults[i].dozen === null) continue;
      if (pair.includes(recentResults[i].dozen as number)) {
        countFromEnd++;
      } else {
        break;
      }
    }

    // Só adiciona se tem pelo menos 4 sequências consecutivas DO FINAL
    if (countFromEnd >= 4) {
      allPatterns.push({
        type: "dozen",
        positions: name,
        count: countFromEnd,
        isActive: true,
        justBroke: false,
      });
    }
  }

  return allPatterns;
};

// Analisa TODOS os padrões de colunas na foto
const analyzeAllColumnPatterns = (results: RouletteResult[]): AllPatternInfo[] => {
  const allPatterns: AllPatternInfo[] = [];
  const columnPairs = [
    { pair: [1, 2], name: "1ª + 2ª" },
    { pair: [1, 3], name: "1ª + 3ª" },
    { pair: [2, 3], name: "2ª + 3ª" },
  ];

  // IMPORTANTE: Analisa apenas os últimos 10 números (mais recentes)
  const recentResults = results.slice(-10);

  for (const { pair, name } of columnPairs) {
    // Conta sequência do FINAL pra trás (mais recente)
    let countFromEnd = 0;
    for (let i = recentResults.length - 1; i >= 0; i--) {
      if (recentResults[i].column === null) continue;
      if (pair.includes(recentResults[i].column as number)) {
        countFromEnd++;
      } else {
        break;
      }
    }

    // Só adiciona se tem pelo menos 4 sequências consecutivas DO FINAL
    if (countFromEnd >= 4) {
      allPatterns.push({
        type: "column",
        positions: name,
        count: countFromEnd,
        isActive: true,
        justBroke: false,
      });
    }
  }

  return allPatterns;
};

// Análise completa dos números detectados
export const analyzeRouletteResults = (
  numbers: number[],
  imageUri: string
): RouletteAnalysis => {
  const results = numbers.map(parseRouletteNumber);

  console.log("🔍 Analisando números:", numbers);
  console.log("🔍 Primeiro número (antigo):", numbers[0]);
  console.log("🔍 Último número (RECENTE):", numbers[numbers.length - 1]);

  // Analisa TODOS os padrões
  const allDozenPatterns = analyzeAllDozenPatterns(results);
  const allColumnPatterns = analyzeAllColumnPatterns(results);

  console.log("📊 Padrões de Dúzias encontrados:", allDozenPatterns);
  console.log("📊 Padrões de Colunas encontrados:", allColumnPatterns);

  // Verifica se algum padrão acabou de quebrar
  const hasBreak = [...allDozenPatterns, ...allColumnPatterns].some((p) => p.justBroke);
  if (hasBreak) {
    console.log("🔴 ATENÇÃO: Padrão acabou de quebrar!");
  }

  const allPatterns: SequencePattern[] = [];
  const opportunities: RouletteOpportunity[] = [];

  // Processa padrões de DÚZIAS
  for (const pattern of allDozenPatterns) {
    // Só considera entrada se está ATIVO agora (últimos 4 estão no padrão)
    if (pattern.isActive) {
      const [d1, d2] = pattern.positions.split(" + ").map((s) => parseInt(s.replace("ª", "")));

      // Para entradas ativas, usa o count do final (quantos consecutivos até agora)
      const countForActive = pattern.count; // maxConsecutive já foi calculado

      // IMPORTANTE: Recalcula o count correto para padrões ativos
      // Conta do final pra trás quantos estão no padrão
      let activeCount = 0;
      const pair = [d1, d2];
      for (let i = results.length - 1; i >= 0; i--) {
        if (results[i].dozen === null) continue;
        if (pair.includes(results[i].dozen as number)) {
          activeCount++;
        } else {
          break;
        }
      }

      // Só adiciona se tem pelo menos 4 sequências ATIVAS
      if (activeCount >= 4) {
        allPatterns.push({
          type: "dozen",
          values: [d1, d2] as DozenPosition[],
          count: activeCount,
        });

        let confidence: "ruim" | "bom" | "alavancar" = "ruim";
        if (activeCount >= 6 && activeCount <= 20) {
          confidence = "alavancar";
        } else if (activeCount >= 4) {
          confidence = "bom";
        }

        opportunities.push({
          type: "dozen",
          betOn: [`${d1}ª Dúzia`, `${d2}ª Dúzia`],
          sequenceCount: activeCount,
          confidence,
        });
      }
    }
  }

  // Processa padrões de COLUNAS
  for (const pattern of allColumnPatterns) {
    // Só considera entrada se está ATIVO agora (últimos 4 estão no padrão)
    if (pattern.isActive) {
      const [c1, c2] = pattern.positions.split(" + ").map((s) => parseInt(s.replace("ª", "")));

      // IMPORTANTE: Recalcula o count correto para padrões ativos
      // Conta do final pra trás quantos estão no padrão
      let activeCount = 0;
      const pair = [c1, c2];
      for (let i = results.length - 1; i >= 0; i--) {
        if (results[i].column === null) continue;
        if (pair.includes(results[i].column as number)) {
          activeCount++;
        } else {
          break;
        }
      }

      // Só adiciona se tem pelo menos 4 sequências ATIVAS
      if (activeCount >= 4) {
        allPatterns.push({
          type: "column",
          values: [c1, c2] as ColumnPosition[],
          count: activeCount,
        });

        let confidence: "ruim" | "bom" | "alavancar" = "ruim";
        if (activeCount >= 6 && activeCount <= 20) {
          confidence = "alavancar";
        } else if (activeCount >= 4) {
          confidence = "bom";
        }

        opportunities.push({
          type: "column",
          betOn: [`${c1}ª Coluna`, `${c2}ª Coluna`],
          sequenceCount: activeCount,
          confidence,
        });
      }
    }
  }

  // Determina score geral
  let overallScore: "ruim" | "bom" | "alavancar" = "ruim";
  let recommendation = "";

  // Monta relatório simples dos padrões ativos
  const allPatternsReport: string[] = [];

  // Adiciona padrões de dúzias
  for (const p of allDozenPatterns) {
    allPatternsReport.push(`Dúzia ${p.positions}: ${p.count}x ✅ ATIVO`);
  }

  // Adiciona padrões de colunas
  for (const p of allColumnPatterns) {
    allPatternsReport.push(`Coluna ${p.positions}: ${p.count}x ✅ ATIVO`);
  }

  if (opportunities.length === 0) {
    // Nenhum padrão ATIVO com 4+
    overallScore = "ruim";
    recommendation = "❌ NÃO ENTRE AGORA!\n\nNenhum padrão ativo com 4+ sequências consecutivas nos últimos números.";
  } else {
    // Tem padrões ativos
    const totalCount = opportunities.reduce((sum, opp) => sum + opp.sequenceCount, 0);
    const avgCount = totalCount / opportunities.length;

    if (avgCount >= 6 && avgCount <= 20) {
      overallScore = "alavancar";
      recommendation = `🚀 ALAVANCAR AGORA!\n\nENTRE EM:\n${opportunities.map((o) => `• ${o.betOn.join(" + ")}: ${o.sequenceCount}x`).join("\n")}\n\n📊 Padrões ativos encontrados:\n${allPatternsReport.join("\n")}`;
    } else if (avgCount >= 4) {
      overallScore = "bom";
      recommendation = `👍 BOM MOMENTO!\n\nENTRE EM:\n${opportunities.map((o) => `• ${o.betOn.join(" + ")}: ${o.sequenceCount}x`).join("\n")}\n\n📊 Padrões ativos encontrados:\n${allPatternsReport.join("\n")}`;
    } else {
      overallScore = "ruim";
      recommendation = "⚠️ Padrão fraco! Aguarde padrão mais forte.";
    }
  }

  return {
    id: Date.now().toString(),
    timestamp: Date.now(),
    imageUri,
    detectedNumbers: results,
    patterns: allPatterns,
    opportunities,
    overallScore,
    recommendation,
  };
};
