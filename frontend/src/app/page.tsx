"use client";
import React, { useState, useEffect } from 'react';
import { Question, AnalysisResult } from '../types';
import QuestionCard from '../components/QuestionCard';
import ResultReport from '../components/ResultReport';

export default function BigFiveTestPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{questionId: number, score: number}[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // 【変更箇所1】問題データを取得するAPIのURLをAWSに変更
  useEffect(() => {
    fetch('https://h72rmt4i5mtcosf77jyem3qrta0epllf.lambda-url.ap-northeast-1.on.aws/api/questions')
      .then(res => res.json())
      .then(data => { setQuestions(data); setIsLoading(false); })
      .catch(err => console.error("Fetch Error:", err));
  }, []);

  const handleOptionClick = (score: number) => {
    setSelectedScore(score); 
    setTimeout(() => {
      setIsFlipping(true);
      setTimeout(() => {
        const newAnswers = [...answers, { questionId: questions[currentStep].id, score: score }];
        setAnswers(newAnswers);
        setSelectedScore(null);
        setIsFlipping(false);
        if (currentStep + 1 >= questions.length) { startAnalysis(newAnswers); }
        else { setCurrentStep(currentStep + 1); }
      }, 400); 
    }, 200);
  };

  // 【変更箇所2】診断結果を送信・取得するAPIのURLをAWSに変更
  const startAnalysis = async (finalData: {questionId: number, score: number}[]) => {
    setIsAnalyzing(true); 
    try {
      const response = await fetch('https://h72rmt4i5mtcosf77jyem3qrta0epllf.lambda-url.ap-northeast-1.on.aws/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalData }),
      });
      const resultData = await response.json();
      // バックエンドの新しい構造をそのまま保持
      setAnalysisResult(resultData); 
    } catch (err) {
      console.error("Analysis Error:", err);
    } finally {
      setTimeout(() => { setIsAnalyzing(false); setShowResult(true); }, 1500);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-[#e8e4dc] font-bold text-3xl text-[#5c5c5c]">LOADING...</div>;

  if (isAnalyzing) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e8e4dc]">
      <div className="w-40 h-40 border-[12px] border-t-[#4d8076] border-gray-200 rounded-full animate-spin mb-10"></div>
      <h2 className="text-5xl font-bold text-[#5c5c5c] animate-pulse tracking-widest uppercase">Analyzing...</h2>
    </div>
  );

  if (showResult && analysisResult) {
    return <ResultReport analysisResult={analysisResult} onReset={() => window.location.reload()} />;
  }

  return (
    <QuestionCard 
      question={questions[currentStep]} 
      currentStep={currentStep} 
      totalQuestions={questions.length} 
      isFlipping={isFlipping} 
      selectedScore={selectedScore} 
      onOptionClick={handleOptionClick} 
    />
  );
}