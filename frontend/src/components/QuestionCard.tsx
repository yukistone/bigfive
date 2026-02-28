"use client";
import React from 'react';
import { Question } from '../types';
import { scoreOptions } from '../constants';

type Props = {
  question: Question;
  currentStep: number;
  totalQuestions: number;
  isFlipping: boolean;
  selectedScore: number | null;
  onOptionClick: (score: number) => void;
};

export default function QuestionCard({ question, currentStep, totalQuestions, isFlipping, selectedScore, onOptionClick }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#e8e4dc] text-[#5c5c5c] font-bold overflow-hidden">
      <div className="relative w-full max-w-5xl bg-[#fdfbf7] rounded-3xl shadow-xl border border-gray-200 flex flex-col pt-10 pb-16 px-8 md:px-20"
        style={{
          minHeight: '480px', transformOrigin: '40px 40px',
          transform: isFlipping ? 'rotate(-15deg) translateY(-100px) scale(0.95)' : 'rotate(0deg) translateY(0) scale(1)',
          opacity: isFlipping ? 0 : 1, transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
        
        {/* 単語帳の金具部分 */}
        <div className="absolute top-8 left-8 md:top-10 md:left-10 w-10 h-10 rounded-full bg-[#e8e4dc] shadow-inner z-10"></div>
        <div className="absolute top-[-25px] left-[2.6rem] md:top-[-25px] md:left-[3.1rem] w-4 md:w-5 h-20 md:h-24 bg-gradient-to-b from-gray-400 via-gray-100 to-gray-500 rounded-full shadow-md z-20"></div>
        
        {/* ▼▼▼ 追加：進捗プログレスバーとQ番号 ▼▼▼ */}
        <div className="w-full flex items-center justify-between mb-16 border-b-2 border-dashed border-gray-300 pb-3 pl-12 md:pl-20">
          
          {/* プログレスバー本体 */}
          <div className="flex-1 mr-6 md:mr-10 h-2 md:h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-[#8c8c8c] to-[#5c9c91] transition-all duration-300 ease-out"
              style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>

          {/* 右端のテキスト */}
          <span className="text-2xl md:text-3xl font-bold tracking-widest whitespace-nowrap">
            Q. {currentStep + 1} <span className="text-gray-400 ml-2 text-xl md:text-2xl font-normal">/ {totalQuestions}</span>
          </span>
        </div>
        {/* ▲▲▲ ここまで追加 ▲▲▲ */}

        <h2 className="text-3xl md:text-5xl font-bold mb-24 text-center leading-relaxed flex-1 flex items-center justify-center">
          {question?.text}
        </h2>
        
        <div className="flex items-center justify-between w-full mt-auto">
          <span className="font-bold text-2xl md:text-3xl text-[#4d8076] whitespace-nowrap mr-4">そう思う</span>
          <div className="flex items-center space-x-4 md:space-x-10">
            {scoreOptions.map((opt, i) => (
              <button key={i} onClick={() => onOptionClick(opt.score)} 
                className={`${opt.size} rounded-full border-[5px] transition-all hover:scale-110 ${selectedScore === opt.score ? `${opt.color} ${opt.activeColor}` : `${opt.color} bg-transparent hover:bg-gray-100`}`} 
              />
            ))}
          </div>
          <span className="font-bold text-2xl md:text-3xl text-[#8a5a9c] whitespace-nowrap ml-4">そう思わない</span>
        </div>
      </div>
      <div className="w-[95%] max-w-5xl h-5 bg-[#fdfbf7] rounded-b-3xl border-x border-b border-gray-300 opacity-70 -mt-2 -z-10 shadow-sm"></div>
    </div>
  );
}