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
}

// Analisa TODOS os padrões de dúzias na foto
const analyzeAllDozenPatterns = (results: RouletteResult[]): AllPatternInfo[] => {
  const allPatterns: AllPatternInfo[] = [];
  const dozenPairs = [
    { pair: [1, 2], name: "1ª + 2ª" },
    { pair: [1, 3], name: "1ª + 3ª" },
    { pair: [2, 3], name: "2ª + 3ª" },
  ];

  for (const { pair, name } of dozenPairs) {
    // Conta sequência do FINAL pra trás (mais recente)
    let countFromEnd = 0;
    for (let i = results.length - 1; i >= 0; i--) {
      if (results[i].dozen === null) continue;
      if (pair.includes(results[i].dozen as number)) {
        countFromEnd++;
      } else {
        break;
      }
    }

    // Verifica se os últimos 4 estão no padrão
    const last4NonZero = results
      .slice(-10)
      .filter((r) => r.dozen !== null)
      .slice(-4);
    const isActive =
      last4NonZero.length >= 4 && last4NonZero.every((r) => pair.includes(r.dozen as number));

    if (countFromEnd > 0) {
      allPatterns.push({
        type: "dozen",
        positions: name,
        count: countFromEnd,
        isActive,
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

  for (const { pair, name } of columnPairs) {
    // Conta sequência do FINAL pra trás (mais recente)
    let countFromEnd = 0;
    for (let i = results.length - 1; i >= 0; i--) {
      if (results[i].column === null) continue;
      if (pair.includes(results[i].column as number)) {
        countFromEnd++;
      } else {
        break;
      }
    }

    // Verifica se os últimos 4 estão no padrão
    const last4NonZero = results
      .slice(-10)
      .filter((r) => r.column !== null)
      .slice(-4);
    const isActive =
      last4NonZero.length >= 4 && last4NonZero.every((r) => pair.includes(r.column as number));

    if (countFromEnd > 0) {
      allPatterns.push({
        type: "column",
        positions: name,
        count: countFromEnd,
        isActive,
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

  const allPatterns: SequencePattern[] = [];
  const opportunities: RouletteOpportunity[] = [];

  // Processa padrões de DÚZIAS
  for (const pattern of allDozenPatterns) {
    if (pattern.isActive && pattern.count >= 4) {
      const [d1, d2] = pattern.positions.split(" + ").map((s) => parseInt(s.replace("ª", "")));

      allPatterns.push({
        type: "dozen",
        values: [d1, d2] as DozenPosition[],
        count: pattern.count,
      });

      let confidence: "ruim" | "bom" | "alavancar" = "ruim";
      if (pattern.count >= 6 && pattern.count <= 20) {
        confidence = "alavancar";
      } else if (pattern.count >= 4) {
        confidence = "bom";
      }

      opportunities.push({
        type: "dozen",
        betOn: [`${d1}ª Dúzia`, `${d2}ª Dúzia`],
        sequenceCount: pattern.count,
        confidence,
      });
    }
  }

  // Processa padrões de COLUNAS
  for (const pattern of allColumnPatterns) {
    if (pattern.isActive && pattern.count >= 4) {
      const [c1, c2] = pattern.positions.split(" + ").map((s) => parseInt(s.replace("ª", "")));

      allPatterns.push({
        type: "column",
        values: [c1, c2] as ColumnPosition[],
        count: pattern.count,
      });

      let confidence: "ruim" | "bom" | "alavancar" = "ruim";
      if (pattern.count >= 6 && pattern.count <= 20) {
        confidence = "alavancar";
      } else if (pattern.count >= 4) {
        confidence = "bom";
      }

      opportunities.push({
        type: "column",
        betOn: [`${c1}ª Coluna`, `${c2}ª Coluna`],
        sequenceCount: pattern.count,
        confidence,
      });
    }
  }

  // Determina score geral
  let overallScore: "ruim" | "bom" | "alavancar" = "ruim";
  let recommendation = "";

  // Monta relatório de TODOS os padrões
  const allPatternsReport: string[] = [];

  // Adiciona padrões de dúzias
  for (const p of allDozenPatterns) {
    const status = p.isActive && p.count >= 4 ? "✅ ATIVO" : p.count < 4 ? "⏳ Fraco" : "❌ Quebrou";
    allPatternsReport.push(`Dúzia ${p.positions}: ${p.count}x ${status}`);
  }

  // Adiciona padrões de colunas
  for (const p of allColumnPatterns) {
    const status = p.isActive && p.count >= 4 ? "✅ ATIVO" : p.count < 4 ? "⏳ Fraco" : "❌ Quebrou";
    allPatternsReport.push(`Coluna ${p.positions}: ${p.count}x ${status}`);
  }

  if (opportunities.length === 0) {
    // Nenhum padrão ATIVO com 4+
    overallScore = "ruim";

    if (allPatternsReport.length > 0) {
      recommendation = `❌ NÃO ENTRE AGORA!\n\nTODOS OS PADRÕES NA FOTO:\n${allPatternsReport.join("\n")}\n\nNenhum padrão está ativo com 4+ sequências nos últimos resultados.`;
    } else {
      recommendation =
        "❌ Sem padrão válido! Os últimos resultados não formam nenhum padrão de dúzias ou colunas.";
    }
  } else {
    // Tem padrões ativos
    const totalCount = opportunities.reduce((sum, opp) => sum + opp.sequenceCount, 0);
    const avgCount = totalCount / opportunities.length;

    if (avgCount >= 6 && avgCount <= 20) {
      overallScore = "alavancar";
      recommendation = `🚀 ALAVANCAR AGORA!\n\nENTRE EM:\n${opportunities.map((o) => `${o.betOn.join(" + ")}: ${o.sequenceCount}x`).join("\n")}\n\n📊 TODOS OS PADRÕES NA FOTO:\n${allPatternsReport.join("\n")}`;
    } else if (avgCount >= 4) {
      overallScore = "bom";
      recommendation = `👍 BOM MOMENTO!\n\nENTRE EM:\n${opportunities.map((o) => `${o.betOn.join(" + ")}: ${o.sequenceCount}x`).join("\n")}\n\n📊 TODOS OS PADRÕES NA FOTO:\n${allPatternsReport.join("\n")}`;
    } else {
      overallScore = "ruim";
      recommendation = `⚠️ Padrão fraco!\n\n📊 TODOS OS PADRÕES NA FOTO:\n${allPatternsReport.join("\n")}`;
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
