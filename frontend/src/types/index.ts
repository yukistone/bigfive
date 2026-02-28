export type Question = {
  id: number;
  text: string;
  domain: string;
  facet: string;
};

export type AnalysisResult = {
  scores: {
    domains: Record<string, number>;
    facets: Record<string, number>;
  };
  personality_type: {
    code: string;
    catchphrase: string;
    description: string;
  };
};