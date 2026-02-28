from typing import List, Dict, Any

def calculate_big5_scores(
    user_answers: List[Dict[str, int]], 
    questions_meta: List[Dict[str, Any]]
) -> Dict[str, Dict[str, float]]:
    """
    ユーザーの回答データと質問のメタデータから、Big Fiveのドメインおよびファセットのスコアを計算します。

    Args:
        user_answers (List[Dict[str, int]]): フロントエンドから送られてきた回答リスト
                                             例: [{"id": 1, "value": 4}, {"id": 2, "value": 2}]
        questions_meta (List[Dict[str, Any]]): JSONから読み込んだ質問の定義データ

    Returns:
        Dict[str, Dict[str, float]]: 計算結果（ドメイン別・ファセット別の平均スコア）
    """
    
    # 1. 質問データをIDで検索しやすいように辞書型（Map）に変換する
    # 例: {1: {"domain": "Extraversion", "is_reverse": False, ...}, 2: {...}}
    question_map = {q["id"]: q for q in questions_meta}
    
    # 2. 集計用の箱を用意する（各特性ごとに回答の数値を溜めるリスト）
    domain_totals: Dict[str, List[int]] = {}
    facet_totals: Dict[str, List[int]] = {}

    # 3. ユーザーの回答を1問ずつ処理する
    for answer in user_answers:
        q_id = answer.get("id")
        raw_value = answer.get("value")
        
        # 値が存在しない、または該当する質問データがない場合は安全にスキップ
        q_info = question_map.get(q_id)
        if not q_info or raw_value is None:
            continue

        # 4. 逆転項目の処理 (5件法の場合: 6 - 回答値)
        # 逆転項目が true の場合、5と答えたら1に、4と答えたら2に変換する
        if q_info.get("is_reverse"):
            calc_value = 6 - raw_value
        else:
            calc_value = raw_value

        domain = q_info["domain"]
        facet = q_info["facet"]

        # 5. 各カテゴリのリストに計算済みのスコアを追加していく
        if domain not in domain_totals:
            domain_totals[domain] = []
        domain_totals[domain].append(calc_value)

        if facet not in facet_totals:
            facet_totals[facet] = []
        facet_totals[facet].append(calc_value)

    # 6. リストに溜まった数値の平均値を計算し、小数点第2位で丸める
    # sum(vals) で合計を出し、len(vals) で質問数で割る
    domain_scores = {
        d: round(sum(vals) / len(vals), 2) for d, vals in domain_totals.items()
    }
    facet_scores = {
        f: round(sum(vals) / len(vals), 2) for f, vals in facet_totals.items()
    }

    # 7. フロントエンドに返すための辞書形式で出力
    return {
        "domains": domain_scores,
        "facets": facet_scores
    }