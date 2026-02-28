from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import json
import os

from services.scorer import calculate_big5_scores
# 新しく作成した classifier.py から関数をインポート
from services.classifier import classify_personality

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JSON_PATH = os.path.join(BASE_DIR, "data", "question.json")

with open(JSON_PATH, "r", encoding="utf-8") as f:
    QUESTIONS_DATA = json.load(f)

class Answer(BaseModel):
    questionId: int
    score: int

class AnalysisRequest(BaseModel):
    answers: List[Answer]

@app.get("/api/questions")
async def get_questions():
    return QUESTIONS_DATA

@app.post("/api/analyze")
async def analyze_personality(request: AnalysisRequest):
    
    formatted_answers = [
        {"id": ans.questionId, "value": ans.score} 
        for ans in request.answers
    ]
    
    # 1. スコアの計算
    result_scores = calculate_big5_scores(formatted_answers, QUESTIONS_DATA)
    
    # 2. 性格タイプの判定（新しく追加した処理）
    personality_type = classify_personality(result_scores["domains"])
    
    print("計算完了！結果:", result_scores)
    print("判定されたタイプ:", personality_type)

    # 3. 計算結果と判定結果を合わせてフロントエンドに返す
    return {
        "status": "success",
        "message": "詳細分析が完了しました",
        "scores": result_scores,
        "personality_type": personality_type # フロントエンドで使えるように追加！
    }
