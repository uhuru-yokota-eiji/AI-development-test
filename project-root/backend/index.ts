// 必要なモジュールをインポート
import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

// Box APIの設定
const BOX_API_URL = 'https://api.box.com/2.0/search';
const BOX_API_TOKEN = 'YOUR_BOX_API_TOKEN'; // ここにBox APIのトークンを設定

// 検索エンドポイント
app.get('/api/search', async (req, res) => {
    const keyword = req.query.keyword as string;
    try {
        const response = await axios.get(BOX_API_URL, {
            headers: {
                Authorization: `Bearer ${BOX_API_TOKEN}`
            },
            params: {
                query: keyword,
                fields: 'name,shared_link'
            }
        });
        const results = response.data.entries.map((entry: any) => ({
            id: entry.id,
            name: entry.name,
            link: entry.shared_link ? entry.shared_link.url : '#'
        }));
        res.json(results);
    } catch (error) {
        console.error('Box APIエラー:', error);
        res.status(500).send('検索に失敗しました');
    }
});

// サーバーを起動
app.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で起動しました`);
});