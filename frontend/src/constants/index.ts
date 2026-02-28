export const translations: Record<string, string> = {
  "Extraversion": "外向性", "Agreeableness": "協調性", "Conscientiousness": "誠実性",
  "Negative Emotionality": "神経症的傾向", "Open-Mindedness": "開放性",
  "Sociability": "社交性", "Assertiveness": "主張性", "Energy Level": "活動水準",
  "Compassion": "共感性", "Respectfulness": "礼儀正しさ", "Trust": "信頼性",
  "Organization": "秩序性", "Productiveness": "生産性", "Responsibility": "責任感",
  "Anxiety": "不安感", "Depression": "抑うつ感", "Emotional Volatility": "感情の起伏",
  "Aesthetic Sensitivity": "美的感受性", "Intellectual Curiosity": "知的好奇心", "Creative Imagination": "創造前想像力"
};

export const domainFacetsMap: Record<string, string[]> = {
  "Extraversion": ["Sociability", "Assertiveness", "Energy Level"],
  "Agreeableness": ["Compassion", "Respectfulness", "Trust"],
  "Conscientiousness": ["Organization", "Productiveness", "Responsibility"],
  "Negative Emotionality": ["Anxiety", "Depression", "Emotional Volatility"],
  "Open-Mindedness": ["Aesthetic Sensitivity", "Intellectual Curiosity", "Creative Imagination"]
};

export const scoreOptions = [
  { score: 5, size: 'w-20 h-20 md:w-24 md:h-24', color: 'border-[#4d8076]', activeColor: 'bg-[#4d8076]/20' },
  { score: 4, size: 'w-14 h-14 md:w-16 md:h-16', color: 'border-[#5c9c91]', activeColor: 'bg-[#5c9c91]/20' },
  { score: 3, size: 'w-10 h-10 md:w-12 md:h-12', color: 'border-[#8c8c8c]', activeColor: 'bg-[#8c8c8c]/20' },
  { score: 2, size: 'w-14 h-14 md:w-16 md:h-16', color: 'border-[#9c7ca8]', activeColor: 'bg-[#9c7ca8]/20' },
  { score: 1, size: 'w-20 h-20 md:w-24 md:h-24', color: 'border-[#8a5a9c]', activeColor: 'bg-[#8a5a9c]/20' },
];