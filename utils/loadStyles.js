/**
 * 从 Supabase Storage 动态加载样式文件
 * 
 * 使用方法：
 * import { loadStylesFromSupabase, STYLE_URLS } from './utils/loadStyles';
 * await loadStylesFromSupabase();
 */

// =======================================================
// 配置
// =======================================================
export const SUPABASE_URL = 'https://db0cwzml9gxiye.database.sankuai.com';
export const BUCKET = 'public-assets';

export const STYLE_URLS = {
  tokens: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/styles/tokens.css`,
  markdown: `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/styles/markdown.css`
};

// =======================================================
// 加载函数
// =======================================================

/**
 * 从 Supabase 加载所有样式文件
 * @param {Object} options - 配置选项
 * @param {string[]} options.styles - 要加载的样式名称数组，默认加载全部
 * @param {boolean} options.cache - 是否使用缓存，默认 false
 * @returns {Promise<Object[]>} 加载结果数组
 */
export async function loadStylesFromSupabase(options = {}) {
  const { styles = Object.keys(STYLE_URLS), cache = false } = options;
  
  const results = await Promise.all(
    styles.map(async (name) => {
      const url = STYLE_URLS[name];
      if (!url) {
        console.warn(`未知的样式: ${name}`);
        return { name, success: false, error: 'Unknown style' };
      }
      
      try {
        // 添加时间戳避免缓存
        const fetchUrl = cache ? url : `${url}?t=${Date.now()}`;
        
        const res = await fetch(fetchUrl);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        
        const css = await res.text();
        
        // 创建或更新 style 标签
        let styleEl = document.getElementById(`style-${name}`);
        if (!styleEl) {
          styleEl = document.createElement('style');
          styleEl.id = `style-${name}`;
          document.head.appendChild(styleEl);
        }
        styleEl.textContent = css;
        
        return { name, success: true, css };
      } catch (error) {
        console.error(`加载 ${name} 失败:`, error);
        return { name, success: false, error: error.message };
      }
    })
  );
  
  return results;
}

/**
 * 加载单个样式文件
 * @param {string} name - 样式名称
 * @returns {Promise<string|null>} CSS 内容
 */
export async function loadStyle(name) {
  const url = STYLE_URLS[name];
  if (!url) {
    console.warn(`未知的样式: ${name}`);
    return null;
  }
  
  try {
    const res = await fetch(`${url}?t=${Date.now()}`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.text();
  } catch (error) {
    console.error(`加载 ${name} 失败:`, error);
    return null;
  }
}

/**
 * 获取 markdown.css 中的 AI 规范文本
 * 用于系统提示词
 * @returns {Promise<string>} AI 规范文本
 */
export async function loadMarkdownGuideFromSupabase() {
  const css = await loadStyle('markdown');
  if (!css) {
    console.warn('无法加载 markdown.css，返回默认规范');
    return getDefaultGuide();
  }
  
  // 提取注释中的规范内容
  const match = css.match(/\/\* ={50,}[\s\S]*📋 AI 输出格式规范[\s\S]*?={50,}\n([\s\S]*?)={50,}/);
  if (match) {
    // 清理注释标记
    return match[1]
      .replace(/^\s*\*?\s?/gm, '')
      .replace(/={50,}/g, '─'.repeat(50))
      .trim();
  }
  
  return getDefaultGuide();
}

/**
 * 默认 AI 规范（加载失败时使用）
 */
function getDefaultGuide() {
  return `
AI 输出格式规范（默认版本）

一、标题层级规则
- 只允许 ## 和 ####
- # 后必须有空格
- 主标题必须有 emoji

二、表格规则
- 列数必须一致
- 表格后禁止直接跟分割线

三、有序列表规则
- 序号必须递增
`;
}

/**
 * 检查样式是否已加载
 * @param {string} name - 样式名称
 * @returns {boolean}
 */
export function isStyleLoaded(name) {
  return !!document.getElementById(`style-${name}`);
}

/**
 * 移除已加载的样式
 * @param {string} name - 样式名称
 */
export function removeStyle(name) {
  const styleEl = document.getElementById(`style-${name}`);
  if (styleEl) {
    styleEl.remove();
  }
}
