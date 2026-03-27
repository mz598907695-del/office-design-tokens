#!/usr/bin/env node

/**
 * 构建入口文件
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');

// 确保 dist 目录存在
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 读取文件内容
const tokensCss = fs.readFileSync(path.join(__dirname, '../styles/tokens.css'), 'utf-8');
const markdownCss = fs.readFileSync(path.join(__dirname, '../styles/markdown.css'), 'utf-8');
const promptMd = fs.readFileSync(path.join(__dirname, '../styles/ai-format-prompt.md'), 'utf-8');

// 生成 CommonJS 入口
const cjsContent = `/**
 * 美团办公设计规范
 * @version 1.1.0
 */

// CSS 内容
const tokensCss = \`${escapeTemplate(tokensCss)}\`;
const markdownCss = \`${escapeTemplate(markdownCss)}\`;
const promptContent = \`${escapeTemplate(promptMd)}\`;

// 动态注入 CSS 到页面
function injectCSS(css, id) {
  if (typeof document === 'undefined') return;
  
  let styleEl = document.getElementById(id);
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = id;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = css;
}

// 加载 tokens.css
function loadTokens() {
  injectCSS(tokensCss, 'design-tokens');
}

// 加载 markdown.css
function loadMarkdown() {
  injectCSS(markdownCss, 'markdown-styles');
}

// 加载全部样式
function loadAll() {
  loadTokens();
  loadMarkdown();
}

// 获取 AI 格式提示词
function getPrompt() {
  return promptContent;
}

// 获取 CSS 内容（用于自定义处理）
function getTokensCSS() {
  return tokensCss;
}

function getMarkdownCSS() {
  return markdownCss;
}

module.exports = {
  loadTokens,
  loadMarkdown,
  loadAll,
  getPrompt,
  getTokensCSS,
  getMarkdownCSS,
  tokensCss,
  markdownCss,
  promptContent
};
`;

// 生成 ESM 入口
const esmContent = `/**
 * 美团办公设计规范
 * @version 1.1.0
 */

// CSS 内容
export const tokensCss = \`${escapeTemplate(tokensCss)}\`;
export const markdownCss = \`${escapeTemplate(markdownCss)}\`;
export const promptContent = \`${escapeTemplate(promptMd)}\`;

// 动态注入 CSS 到页面
export function injectCSS(css, id) {
  if (typeof document === 'undefined') return;
  
  let styleEl = document.getElementById(id);
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = id;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = css;
}

// 加载 tokens.css
export function loadTokens() {
  injectCSS(tokensCss, 'design-tokens');
}

// 加载 markdown.css
export function loadMarkdown() {
  injectCSS(markdownCss, 'markdown-styles');
}

// 加载全部样式
export function loadAll() {
  loadTokens();
  loadMarkdown();
}

// 获取 AI 格式提示词
export function getPrompt() {
  return promptContent;
}

// 获取 CSS 内容（用于自定义处理）
export function getTokensCSS() {
  return tokensCss;
}

export function getMarkdownCSS() {
  return markdownCss;
}

export default {
  loadTokens,
  loadMarkdown,
  loadAll,
  getPrompt,
  getTokensCSS,
  getMarkdownCSS,
  tokensCss,
  markdownCss,
  promptContent
};
`;

// 生成 TypeScript 类型定义
const dtsContent = `/**
 * 美团办公设计规范
 * @version 1.1.0
 */

export function injectCSS(css: string, id: string): void;
export function loadTokens(): void;
export function loadMarkdown(): void;
export function loadAll(): void;
export function getPrompt(): string;
export function getTokensCSS(): string;
export function getMarkdownCSS(): string;

export const tokensCss: string;
export const markdownCss: string;
export const promptContent: string;

export default {
  loadTokens,
  loadMarkdown,
  loadAll,
  getPrompt,
  getTokensCSS,
  getMarkdownCSS,
  tokensCss,
  markdownCss,
  promptContent
};
`;

// 辅助函数：转义模板字符串
function escapeTemplate(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/\`/g, '\\`')
    .replace(/\$/g, '\\$');
}

// 写入文件
fs.writeFileSync(path.join(distDir, 'index.js'), cjsContent);
fs.writeFileSync(path.join(distDir, 'index.esm.js'), esmContent);
fs.writeFileSync(path.join(distDir, 'index.d.ts'), dtsContent);

console.log('✅ 入口文件构建完成！');
console.log('  - dist/index.js (CommonJS)');
console.log('  - dist/index.esm.js (ES Module)');
console.log('  - dist/index.d.ts (TypeScript 类型)');
console.log('  - dist/tokens.css');
console.log('  - dist/markdown.css');
console.log('  - dist/ai-format-prompt.md');
