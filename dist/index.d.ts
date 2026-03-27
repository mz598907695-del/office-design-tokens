/**
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
