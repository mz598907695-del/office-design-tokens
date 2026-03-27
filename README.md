# 设计规范维护系统

用于维护学城笔记（MTbook）项目的设计规范 CSS 文件。

## 📁 项目结构

```
办公设计规范/
├── index.html              # 主页面
├── app.js                  # 应用逻辑
├── package.json            # 项目配置
├── vite.config.js          # Vite 配置
├── styles/
│   ├── tokens.css          # 设计 Token (v1.0.0)
│   ├── markdown.css        # Markdown 渲染样式 (v1.1.0)
│   └── app.css             # 应用样式
└── scripts/
    └── upload-css-to-supabase.mjs  # 上传脚本
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 📋 功能特性

### 1. 文件编辑
- Monaco Editor 代码编辑器
- 语法高亮
- 自动保存

### 2. 版本管理
- 版本号管理
- 更新日志记录
- 版本历史查看

### 3. 预览功能
- 实时预览 Markdown 渲染效果
- 对比查看修改内容

### 4. 上传到 Supabase
- 一键上传到 Supabase Storage
- 即时生效，无需重新部署

## 🔧 使用方法（给其他项目引用）

> **重要**：使用以下方式引用后，每次页面加载都会自动获取 Supabase 上的最新版本，无需重新部署！

### 方式一：HTML 直接引用（最简单）

```html
<!-- 添加到 HTML <head> 中，每次页面加载自动获取最新版本 -->
<link rel="stylesheet" 
  href="https://db0cwzml9gxiye.database.sankuai.com/storage/v1/object/public/public-assets/styles/tokens.css" />
<link rel="stylesheet" 
  href="https://db0cwzml9gxiye.database.sankuai.com/storage/v1/object/public/public-assets/styles/markdown.css" />
```

### 方式二：JS 动态加载（推荐）

将 `utils/loadStyles.js` 复制到你的项目中，然后：

```javascript
import { loadStylesFromSupabase, loadMarkdownGuideFromSupabase } from './utils/loadStyles';

// 加载所有样式（每次调用获取最新版本）
await loadStylesFromSupabase();

// 只加载特定样式
await loadStylesFromSupabase({ styles: ['tokens'] });

// 获取 AI 规范文本（用于系统提示词）
const guide = await loadMarkdownGuideFromSupabase();
```

### 方式三：获取系统提示词

```typescript
import { loadMarkdownGuideFromSupabase } from './utils/loadStyles';

// 获取 markdown.css 中的 AI 输出规范
const guide = await loadMarkdownGuideFromSupabase();
// 可直接用于 AI 系统提示词
```

## 📌 关键约束

| 约束项 | 规则 |
|--------|------|
| 标题 | 只允许 `##` 和 `####`，禁止 `###` `#####` `######` |
| 标题空格 | `#` 后必须有空格：`#### ⚙️ 标题` ✅ `####⚙️标题` ❌ |
| 表格 | 列数必须一致，禁止嵌套标题 |
| 表格后 | 禁止直接跟分割线 `---` |
| 有序列表 | 序号必须递增 `1. 2. 3.`，禁止重复 `1.` |
| Emoji | 主标题必须有 1 个，小节标题可选 |

## 🔗 相关链接

- **Supabase 控制台**：https://db0cwzml9gxiye.database.sankuai.com
- **Bucket 名称**：`public-assets`
- **文件路径**：`styles/tokens.css`、`styles/markdown.css`

## 📤 上传文件

```bash
SUPABASE_ANON_KEY=your_key npm run upload
```
