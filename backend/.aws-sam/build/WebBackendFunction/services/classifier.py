import json
import os
from typing import Dict, Any

def classify_personality(domain_scores: Dict[str, float]) -> Dict[str, str]:
    """
    ドメインのスコアから32パターンの性格タイプを判定し、キャッチコピーを返します。
    """
    # 基準値（中央値）の設定
    THRESHOLD = 3.0

    # 各ドメインのスコアが基準値以上か未満かで文字を割り当てる
    # 1. Extraversion (外向性)
    e_i = "E" if domain_scores.get("Extraversion", 0) >= THRESHOLD else "I"
    
    # 2. Open-Mindedness (開放性)
    o_s = "O" if domain_scores.get("Open-Mindedness", 0) >= THRESHOLD else "S"
    
    # 3. Agreeableness (協調性)
    a_t = "A" if domain_scores.get("Agreeableness", 0) >= THRESHOLD else "T"
    
    # 4. Conscientiousness (誠実性)
    c_p = "C" if domain_scores.get("Conscientiousness", 0) >= THRESHOLD else "P"
    
    # 5. Negative Emotionality (神経症的傾向)
    n_r = "N" if domain_scores.get("Negative Emotionality", 0) >= THRESHOLD else "R"

    # 5文字のコードを生成
    type_code = f"{e_i}{o_s}{a_t}{c_p}{n_r}"

    # types.json から該当するデータを読み込む
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_path = os.path.join(base_dir, "data", "types.json")

    with open(json_path, "r", encoding="utf-8") as f:
        types_data = json.load(f)

    # 該当するコードのデータを検索
    for p_type in types_data:
        if p_type["code"] == type_code:
            return p_type

    # 万が一見つからなかった場合のフォールバック
    return {
        "code": type_code,
        "catchphrase": "未知なる可能性を秘めた探求者",
        "description": "独自のバランスを持つユニークな性格です。"
    }