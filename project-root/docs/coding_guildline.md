# Node.jsコーディング規約

このドキュメントは、Node.js プロジェクトにおけるコーディング規約をまとめたものです。

## 1. ファイル構成・ディレクトリ構造

### 1.1 ディレクトリ構成

-   `backend` バックエンド側の処理
    -   コントローラ、サービス、モデルなど役割ごとにサブディレクトリを作成する。
-   `frontend` フロントエンド側の処理
-   `test` フォルダ配下にテストコードを配置する。

### 1.2 ファイル命名

-   すべて**小文字**とし、単語はハイフン（-）で区切る。例：`user-controller.js`
-   クラス定義ファイルのみ、パスカルケースを採用してもよい。例：`UserService.js`

## 2. コード書式（フォーマット）

### 2.1 インデント

-   インデントは**スペース2文字**とする。

```javascript
// BAD
function example() {
    if (true) {
        console.log('4 space indent');
    }
}

// GOOD
function example() {
  if (true) {
    console.log('2 space indent');
  }
}
```

### 2.2 セミコロン

-   文末には必ず**セミコロンを付与**する。

```javascript
// BAD
const x = 10
console.log(x)

// GOOD
const x = 10;
console.log(x);
```

### 2.3 括弧まわりのスペース

-   関数の引数リストや制御構文で、括弧の内側にはスペースを入れない。
-   制御構文のキーワードと括弧の間には1スペース空ける。

```javascript
// BAD
if(true) {
    console.log('no space after if');
}
function greet ( name ) {
  return 'Hello, ' + name;
}

// GOOD
if (true) {
  console.log('space after if, no space inside parentheses');
}
function greet(name) {
  return 'Hello, ' + name;
}
```

### 2.4 文字列

-   文字列リテラルは**シングルクォート `' '`**を基本とする（テンプレートリテラルを除く）。
-   文字列内で変数や式を埋め込みたい場合は**テンプレートリテラル `` ``** を使用する。

```javascript
// BAD
const message = "Hello";
const message2 = 'Hello ' + name + '!';

// GOOD
const message = 'Hello';
const message2 = `Hello ${name}!`;
```

### 2.5 行末の空白

-   行末に**不要な空白を残さない**。

## 3. 変数宣言・スコープ管理

### 3.1 変数宣言

-   `const` を優先的に使用し、再代入が必要な場合のみ `let` を使用する。
-   `var` は使用しない。

```javascript
// BAD
var count = 0;
count = 1;

// GOOD
let count = 0;
count = 1;

// GOOD (prefer const if no reassignment)
const maxCount = 100;
```

### 3.2 スコープ

-   変数は使用するスコープが最も狭い位置で宣言する。
-   グローバルスコープの汚染を避けるため、必要に応じてモジュールスコープやブロックスコープを活用する。

## 4. 関数・クラス

### 4.1 関数宣言

-   関数は**アロー関数**を積極的に活用し、`function` 宣言を使う場合はクラスメソッドやプロトタイプメソッド、コンストラクタなどが必要なケースに限る。
-   アロー関数を使用することで、`this` の取り扱いを明確にする。

```javascript
// BAD
function fetchData(url) {
  return axios.get(url);
}

// GOOD
const fetchData = (url) => {
  return axios.get(url);
};
```

### 4.2 クラス

-   クラス名は**パスカルケース**で命名する。例：`UserService`
-   Public メソッド・プロパティを上部に、Private（`#`記法）のものを下部にまとめる。
-   必要以上にクラスを多用せず、モジュール関数で十分な場合はクラスを作成しない。

```javascript
class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUser(id) {
    return this.userRepository.findById(id);
  }

  #validateUser(user) {
    // Private method
  }
}
```

## 5. 命名規則

### 5.1 変数・関数

-   **キャメルケース**を使用する。例：`userId`, `fetchUserData`
-   ブール値を返す変数や関数は、`is`, `has`, `can` などを接頭辞にする。
    例：`isValid`, `hasPermission`

### 5.2 定数

-   アプリケーションの全域で使われる定数は**スネークケース大文字**で宣言する。
    例：`const MAX_USER_COUNT = 100;`

### 5.3 ファイルやディレクトリ

-   1.2 ファイル命名も参照。**小文字＋ハイフン区切り**を基本とする。

## 6. エラー処理

### 6.1 例外の使用

-   例外をスローするときは `Error` オブジェクトを継承した**独自エラー（カスタムエラー）クラス**を使用して、スタックトレースをわかりやすくする。
-   例外メッセージはなるべく詳細に記述し、ログ管理ツールと連携して障害解析を容易にする。

```javascript
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}
```

### 6.2 コールバックやPromiseでのエラー処理

-   Node.js でのコールバック使用時は、エラーを先頭の引数に受け取るコールバックパターンを守る。
-   Promise では `catch` を必ずチェーンし、エラーを適切にハンドリングする。
-   `async/await` 使用時は、`try-catch` でエラーをキャッチし、必要に応じて再スローする。

```javascript
// BAD
axios.get(url).then((res) => {
  // success
});

// GOOD
axios.get(url)
  .then((res) => {
    // success
  })
  .catch((err) => {
    // error handling
    console.error(err);
  });
```

## 7. コメントとドキュメンテーション

### 7.1 コメントの書き方

-   基本的にコードを読めばわかるロジックにはコメントを入れない。
-   なぜこの実装になったのかなど、背景や意図に関する補足説明を中心にコメントを残す。
-   `TODO` や `FIXME` がある場合は、`// TODO: xxx` の形式で書き、後追いを容易にする。

### 7.2 JSDoc

-   公開メソッド・関数には、JSDoc 形式でパラメータや戻り値を説明する。
-   ツールでAPIリファレンスを生成できるようにし、メンテナンスコストを下げる。

```javascript
/**
 * ユーザー情報をIDから取得する
 * @param {number} id - ユーザーID
 * @returns {Promise<Object>} - ユーザー情報
 */
const fetchUserById = async (id) => {
  // ...
};
```

## 8. テスト

### 8.1 テストフレームワーク

-   基本的には Jest などメジャーなテストフレームワークを採用する（Mocha/Chai などでも可）。
-   `describe` と `it` (または `test`) を使ってテストを明確に構造化する。

```javascript
describe('UserController', () => {
  it('should fetch user by ID', async () => {
    // ...
  });
});
```

### 8.2 テストコードの配置

-   `backend/test` ディレクトリ下に、ソースコードと同じディレクトリ構造で配置する。
-   テストファイルの拡張子は `*.test.js` とする。

### 8.3 カバレッジ

-   カバレッジレポートを出力し、基準値（例：80%）を設定する。
-   重要なビジネスロジックは最低限、分岐カバレッジを確保する。

## 9. ESLint / 自動フォーマット

### 9.1 Linter の設定

-   ESLint を導入し、プロジェクトルートに `.eslintrc.js` または `.eslintrc.json` を配置する。

```javascript
// .eslintrc.js の例
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'no-var': 'error',
  },
};
```

### 9.2 プリティア（Prettier）との連携

-   Prettier を併用してコードフォーマットを自動化する場合は、ESLint と競合しないように `eslint-config-prettier` を導入する。
-   pre-commit フックなどを利用して、コミット前に自動整形を行う。

## 10. パッケージ管理・バージョン管理

### 10.1 パッケージ管理

-   パッケージマネージャーは npm に統一する。
-   依存関係は `package.json` で一元管理し、必要に応じて `package-lock.json` をコミットする。

### 10.2 バージョン管理

-   Node.js の実行環境のバージョンは `engines` フィールドで固定し、開発者間で差異が生まれないようにする。

```json
{
  "engines": {
    "node": ">=14.0.0"
  }
}
```

## 11. Git 運用

### 11.1 ブランチ運用

-   GitFlow など、チームの合意したブランチ戦略を守る。
-   課題単位でブランチを切り、プルリクエストを出してレビューを受ける。

### 11.2 コミットメッセージ

-   コミットメッセージは **プレフィックス** を付けてわかりやすくする。
    例：`feat: ユーザーの新規登録APIを追加`, `fix: バグ#123を修正`
-   コミットはこまめに行い、1コミット1トピックを意識する。

## 12. セキュリティ・パフォーマンス

### 12.1 セキュリティ

-   `dotenv` などで環境変数の管理を行い、秘密情報はコードに直接ベタ書きしない。
-   ユーザー入力を受け取る箇所では、インジェクション対策やバリデーションを確実に行う。

### 12.2 パフォーマンス最適化

-   重たい処理やIO処理がある場合は非同期処理（Promise/async）を使用し、ブロッキングを最小限にする。
-   レスポンスタイムを計測できるようにログ管理やAPM（Application Performance Monitoring）を導入する。