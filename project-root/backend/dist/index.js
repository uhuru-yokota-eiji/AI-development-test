"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 必要なモジュールをインポート
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Box APIの設定
const BOX_API_URL = 'https://api.box.com/2.0/search';
const BOX_API_TOKEN = 'YOUR_BOX_API_TOKEN'; // ここにBox APIのトークンを設定
// 検索エンドポイント
app.get('/api/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.keyword;
    try {
        const response = yield axios_1.default.get(BOX_API_URL, {
            headers: {
                Authorization: `Bearer ${BOX_API_TOKEN}`
            },
            params: {
                query: keyword,
                fields: 'name,shared_link'
            }
        });
        const results = response.data.entries.map((entry) => ({
            id: entry.id,
            name: entry.name,
            link: entry.shared_link ? entry.shared_link.url : '#'
        }));
        res.json(results);
    }
    catch (error) {
        console.error('Box APIエラー:', error);
        res.status(500).send('検索に失敗しました');
    }
}));
// サーバーを起動
app.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で起動しました`);
});
