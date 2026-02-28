"use client";
import React, { useState, useRef } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { AnalysisResult } from '../types';
import { translations, domainFacetsMap } from '../constants';

type Props = {
  analysisResult: AnalysisResult;
  onReset: () => void;
};

const CustomTick = (props: any) => {
  const { payload, x, y, textAnchor, setActiveDetailDomain, mainChartData } = props;
  
  if (!payload || !payload.value) return null;

  const domainData = mainChartData.find((d: any) => d.subject === payload.value);
  const domainKey = domainData ? domainData.domainKey : null;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={4}
        textAnchor={textAnchor}
        fill="#5c5c5c"
        fontSize="clamp(12px, 2vh, 22px)"
        fontWeight="bold"
        style={{ pointerEvents: 'auto', cursor: 'pointer', transition: 'fill 0.2s' }}
        onMouseEnter={(e) => {
          if (domainKey) setActiveDetailDomain(domainKey);
          e.currentTarget.setAttribute('fill', '#8a5a9c'); 
        }}
        onMouseLeave={(e) => {
          setActiveDetailDomain(null);
          e.currentTarget.setAttribute('fill', '#5c5c5c'); 
        }}
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function ResultReport({ analysisResult, onReset }: Props) {
  const [activeDetailDomain, setActiveDetailDomain] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  
  const mainChartData = Object.keys(analysisResult.scores.domains || {}).map(key => ({
    domainKey: key,
    subject: translations[key] || key,
    score: analysisResult.scores.domains[key],
    fullMark: 5,
  }));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window === 'undefined') return;

    const tooltipWidth = 340; 
    const tooltipHeight = 340;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    let posX = e.clientX < centerX 
        ? e.clientX - tooltipWidth - 30 
        : e.clientX + 30;
    
    let posY = e.clientY < centerY 
        ? e.clientY - tooltipHeight - 30 
        : e.clientY + 30;

    if (posX < 10) posX = 10;
    if (posX + tooltipWidth > window.innerWidth - 10) posX = window.innerWidth - tooltipWidth - 10;
    if (posY < 10) posY = 10;
    if (posY + tooltipHeight > window.innerHeight - 10) posY = window.innerHeight - tooltipHeight - 10;

    setTooltipPos({ x: posX, y: posY });
  };

  
  return (
    <div 
      className="min-h-screen bg-[#e8e4dc] p-[clamp(1rem,2vh,2.5rem)] text-[#5c5c5c] font-bold overflow-hidden flex flex-col items-center justify-center relative"
      onMouseMove={handleMouseMove}
    >
      
      {/* ツールチップ */}
      {activeDetailDomain && domainFacetsMap[activeDetailDomain] && (
        <div 
          className="fixed z-50 pointer-events-none transition-opacity duration-150 animate-in fade-in zoom-in-95"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <div className="bg-[#fdfbf7]/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 border-2 border-[#8a5a9c]/20 w-[300px] md:w-[360px]">
            <h4 className="text-lg md:text-xl text-center mb-2 text-[#8a5a9c] font-bold tracking-widest">
              {translations[activeDetailDomain]} の内訳
            </h4>
            <div className="w-full aspect-square">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                  cx="50%" cy="50%" 
                  outerRadius="50%" 
                  margin={{ top: 15, right: 40, bottom: 15, left: 40 }}
                  data={
                    domainFacetsMap[activeDetailDomain].map(f => ({
                      subject: translations[f] || f,
                      score: analysisResult.scores.facets[f] || 0,
                      fullMark: 5
                    }))
                  }
                >
                  <PolarGrid stroke="#ddd" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#777', fontSize: 13, fontWeight: 'bold' }} />
                  <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
                  <Radar dataKey="score" stroke="#8a5a9c" fill="#8a5a9c" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* 操作ボタンエリア */}
      <div className="w-full max-w-[1200px] flex justify-between mb-[clamp(0.5rem,2vh,1rem)] shrink-0 z-10">
        <button onClick={onReset} className="bg-white/50 border border-[#5c5c5c] px-[clamp(1.5rem,2vw,2.5rem)] py-[clamp(0.5rem,1vh,0.75rem)] rounded-full hover:bg-white transition-all text-[clamp(0.8rem,1.5vh,1rem)] shadow-sm cursor-pointer pointer-events-auto">やり直す</button>
      </div>

      {/* キャッチコピーセクション（外側のdescriptionを削除しました） */}
      <div className="w-full max-w-5xl text-center mb-[clamp(1rem,3vh,2rem)] animate-in fade-in slide-in-from-top-4 duration-1000 shrink-0 z-10 pointer-events-none">
        <h2 className="text-[clamp(1rem,2vh,1.5rem)] text-[#8a5a9c] mb-[clamp(0.2rem,1vh,1rem)] tracking-widest opacity-80 uppercase">Your Personality Type</h2>
        <div className="text-[clamp(2rem,6vh,4.5rem)] mb-[clamp(0.5rem,1.5vh,1.5rem)] text-[#4d8076] drop-shadow-md leading-tight">
          “{analysisResult.personality_type.catchphrase}”
        </div>
      </div>

      {/* メイングラフ＆詳細解説エリア */}
      <div className="w-full max-w-5xl z-10 relative shrink-0">
        <div className="w-full bg-[#fdfbf7] rounded-[clamp(1.5rem,3vh,2.5rem)] shadow-xl p-[clamp(1.5rem,3vh,3rem)] border border-gray-200 relative flex flex-col items-center">
          
          {/* 金具 */}
          <div className="absolute top-[4%] left-[4%] w-[clamp(1.5rem,3vh,2.5rem)] h-[clamp(1.5rem,3vh,2.5rem)] rounded-full bg-[#e8e4dc] shadow-inner pointer-events-none"></div>
          
          {/* 上半分：レーダーチャート */}
          <div className="w-full max-w-3xl flex flex-col items-center">
            <h3 className="text-[clamp(1.2rem,2.5vh,2rem)] text-center mb-[clamp(0.2rem,1vh,0.5rem)] shrink-0 pointer-events-none">総合特性バランス</h3>
            <p className="text-center text-[clamp(0.8rem,1.5vh,1.1rem)] text-gray-400 mb-[clamp(0.5rem,1vh,1.5rem)] shrink-0 pointer-events-none">
              ※ グラフの文字にカーソルを合わせると詳細が表示されます
            </p>
            
            <div className="w-full h-[35vh] min-h-[250px] max-h-[400px] relative pointer-events-auto mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={mainChartData}>
                  <PolarGrid stroke="#ccc" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={(props) => (
                      <CustomTick 
                        {...props} 
                        setActiveDetailDomain={setActiveDetailDomain} 
                        mainChartData={mainChartData} 
                      />
                    )} 
                  />
                  <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
                  <Radar name="本人" dataKey="score" stroke="#4d8076" fill="#4d8076" fillOpacity={0.4} style={{ pointerEvents: 'none' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ▼▼▼ 追加：下半分：3行の詳細解説文 ▼▼▼ */}
          <div className="w-full max-w-4xl mt-6 pt-8 border-t-2 border-dashed border-gray-300">
            <h3 className="text-[clamp(1.2rem,2.5vh,1.8rem)] font-bold text-center mb-6 text-[#5c9c91] tracking-widest">
              あなたはこんな人！
            </h3>
            <p className="text-[clamp(1rem,2vh,1.5rem)] text-gray-700 leading-relaxed whitespace-pre-wrap text-center md:text-left font-normal px-4 md:px-12">
              {analysisResult.personality_type.description}
            </p>
          </div>
          {/* ▲▲▲ ここまで追加 ▲▲▲ */}

        </div>
      </div>
    </div>
  );
}