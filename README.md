# Big Five Personality Test (性格診断アプリ)

手書き風の温かみのあるUIと、精緻なレーダーチャートを組み合わせたBig Five性格診断Webアプリケーションです。
フロントエンドは Next.js (React)、バックエンドは FastAPI (Python) で構成されています。

## 📁 フォルダ構成

プロジェクト全体は、大きく分けて `backend` と `frontend` の2つのディレクトリで構成されています。

\`\`\`text
BigFive/
 ├── backend/                 # 🐍 Python (FastAPI) バックエンド
 │    ├── main.py             # APIの入り口（サーバー起動用）
 │    ├── requirements.txt    # 必要なPythonパッケージ一覧
 │    ├── data/               # データ置き場
 │    │    └── question.json  # 診断用の質問データ(全60問)
 │    └── services/           # 計算ロジック
 │         └── scorer.py      # BigFiveのスコア計算プログラム
 │
 ├── frontend/                # ⚛️ Next.js (React) フロントエンド
 │    ├── package.json        # 必要なNode.jsパッケージ一覧
 │    └── src/
 │         ├── app/
 │         │    └── page.tsx  # アプリケーションのメイン画面(ルーティング)
 │         ├── components/
 │         │    ├── QuestionCard.tsx # 質問回答用の単語帳UI
 │         │    └── ResultReport.tsx # 診断結果のグラフ・PDF出力UI
 │         ├── constants/
 │         │    └── index.ts  # 翻訳辞書や定数データ
 │         └── types/
 │              └── index.ts  # TypeScriptの型定義
 │
 ├── .gitignore               # Gitの管理から除外するファイル一覧
 └── README.md                # この説明書
\`\`\`

---

## 🚀 環境構築と起動方法

このアプリを動かすには、バックエンドとフロントエンドの両方を起動する必要があります。

### 1. バックエンド (Python) のセットアップ

Pythonのパッケージ管理が混ざらないよう、**必ず `backend` フォルダの中で仮想環境を作成**してください。

**① backend フォルダへ移動**
\`\`\`bash
cd backend
\`\`\`

**② 仮想環境の作成と有効化**
\`\`\`bash
# 仮想環境を作成 (ここでは .venv という名前にします)
python -m venv .venv

# 仮想環境を有効化 (Windowsの場合)
.venv\Scripts\activate

# 仮想環境を有効化 (Mac/Linuxの場合)
source .venv/bin/activate
\`\`\`

**③ 必要なパッケージのインストール**
仮想環境が有効になった状態（ターミナルに `(.venv)` などが表示されている状態）で、以下を実行します。
\`\`\`bash
pip install -r requirements.txt
\`\`\`

**④ サーバーの起動**
ネットワーク内の他の端末からもアクセスできるように起動します。
\`\`\`bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
\`\`\`
*(バックエンドは `http://localhost:8000` で待機します)*

---

### 2. フロントエンド (Next.js) のセットアップ

別のターミナルを開き、フロントエンド側の準備をします。

**① frontend フォルダへ移動**
\`\`\`bash
cd frontend
\`\`\`

**② 必要なパッケージのインストール**
\`\`\`bash
npm install
\`\`\`

**③ アプリの起動**
ネットワーク内の他の端末からもアクセスできるように起動します。
\`\`\`bash
npm run dev -- -H 0.0.0.0
\`\`\`
*(フロントエンドは `http://localhost:3000` で待機します)*

---

## 💡 使い方
同じWi-Fi（ネットワーク）に繋がっているPCやスマートフォンのブラウザから、起動したPCのIPアドレス（例: `http://192.168.x.x:3000`）にアクセスしてください。