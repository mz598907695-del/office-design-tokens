/**
 * 办公设计规范 - 主应用逻辑（只读模式）
 */

// =======================================================
// 配置和状态
// =======================================================
const CONFIG = {
  SUPABASE_URL: 'https://db0cwzml9gxiye.database.sankuai.com',
  BUCKET: 'public-assets',
  FILES: {
    markdown: {
      path: 'styles/markdown.css',
      localPath: './styles/markdown.css',
      name: 'markdown',
      icon: 'iconfont icon-danao',
      version: 'v1.1.0',
      date: '2025-03-26',
      changelog: '优化表格和列表渲染规则'
    },
    tokens: {
      path: 'styles/tokens.css',
      localPath: './styles/tokens.css',
      name: 'tokens',
      icon: 'iconfont icon-fengche',
      version: 'v1.0.0',
      date: '2025-03-26',
      changelog: '初始版本，定义基础设计 Token 规范'
    },
    prompt: {
      path: 'styles/ai-format-prompt.md',
      localPath: './styles/ai-format-prompt.md',
      name: '模型格式',
      icon: 'iconfont icon-zhi_changjuanzhi_wenben',
      version: 'v1.1.0',
      date: '2025-03-26',
      changelog: '独立出 AI 格式控制提示词'
    }
  }
};

const state = {
  currentFile: 'markdown',
  content: {},
  editor: null,
  theme: localStorage.getItem('theme') || 'light',
  loadedFromRemote: false
};

// =======================================================
// 初始化
// =======================================================
async function init() {
  applyTheme(state.theme);
  await loadFiles();
  await initMonacoEditor();
  bindEvents();
  updateUI();
}

async function loadFiles() {
  showToast('正在从远程加载最新版本...', 'success');
  
  for (const [key, file] of Object.entries(CONFIG.FILES)) {
    try {
      const remoteUrl = `${CONFIG.SUPABASE_URL}/storage/v1/object/public/${CONFIG.BUCKET}/${file.path}?t=${Date.now()}`;
      let content = null;
      let loadedFrom = 'remote';
      
      try {
        const response = await fetch(remoteUrl);
        if (response.ok) {
          content = await response.text();
          state.loadedFromRemote = true;
          console.log(`✅ ${file.name} 已从远程加载`);
        }
      } catch (remoteError) {
        console.warn(`远程加载 ${file.name} 失败，尝试本地文件...`);
      }
      
      if (content === null) {
        const response = await fetch(file.localPath);
        if (response.ok) {
          content = await response.text();
          loadedFrom = 'local';
          console.log(`📁 ${file.name} 已从本地加载`);
        }
      }
      
      if (content !== null) {
        state.content[key] = content;
        
        // 提取版本信息
        const versionMatch = content.match(/版本[：:]\s*(v[\d.]+)/);
        if (versionMatch) {
          CONFIG.FILES[key].version = versionMatch[1];
        }
        
        // 提取更新日期
        const dateMatch = content.match(/更新日期[：:]\s*(\d{4}-\d{2}-\d{2})/);
        if (dateMatch) {
          CONFIG.FILES[key].date = dateMatch[1];
        }
        
        // 提取更新内容
        const changelogMatch = content.match(/更新内容[：:]\s*(.+)/);
        if (changelogMatch) {
          CONFIG.FILES[key].changelog = changelogMatch[1].trim();
        }
        
        CONFIG.FILES[key].loadedFrom = loadedFrom;
      }
    } catch (error) {
      console.error(`加载文件 ${key} 失败:`, error);
    }
  }
  
  if (state.loadedFromRemote) {
    showToast('已加载远程最新版本', 'success');
  } else {
    showToast('已加载本地版本（远程不可用）', 'success');
  }
}

// =======================================================
// Monaco 编辑器（只读模式）
// =======================================================
async function initMonacoEditor() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js';
  
  await new Promise((resolve, reject) => {
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  
  require.config({
    paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' }
  });
  
  return new Promise((resolve) => {
    require(['vs/editor/editor.main'], function() {
      defineCustomTheme();
      
      state.editor = monaco.editor.create(
        document.getElementById('editorContainer'),
        {
          value: state.content[state.currentFile],
          language: state.currentFile === 'prompt' ? 'markdown' : 'css',
          theme: state.theme === 'dark' ? 'custom-dark' : 'custom-light',
          fontSize: 14,
          fontFamily: "'SF Mono', 'Menlo', 'Monaco', 'Consolas', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          lineNumbers: 'on',
          renderLineHighlight: 'line',
          padding: { top: 16, bottom: 16 },
          readOnly: true  // 只读模式
        }
      );
      
      resolve();
    });
  });
}

function defineCustomTheme() {
  monaco.editor.defineTheme('custom-light', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#ffffff',
      'editor.foreground': '#111925',
      'editor.lineHighlightBackground': '#f5f6f7',
      'editor.selectionBackground': '#e0f1ff',
      'editorCursor.foreground': '#008cff',
      'editor.readOnlyBackground': '#fafafa'
    }
  });
  
  monaco.editor.defineTheme('custom-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#191b1c',
      'editor.foreground': '#ffffff',
      'editor.lineHighlightBackground': '#212224',
      'editor.selectionBackground': '#003c66',
      'editorCursor.foreground': '#0095ff',
      'editor.readOnlyBackground': '#1a1c1d'
    }
  });
}

// =======================================================
// 事件绑定
// =======================================================
function bindEvents() {
  // 文件选择
  document.querySelectorAll('.file-item').forEach(item => {
    item.addEventListener('click', () => {
      const file = item.dataset.file;
      if (file !== state.currentFile) {
        switchFile(file);
      }
    });
  });
  
  // 标签切换
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.tab);
    });
  });
  
  // 主题切换
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  
  // 同步按钮
  document.getElementById('syncBtn').addEventListener('click', syncFromRemote);
  
  // 使用方式标签
  document.querySelectorAll('.usage-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      switchUsageTab(tab.dataset.usage);
    });
  });
  
  // 复制按钮
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      navigator.clipboard.writeText(target.textContent);
      showToast('已复制到剪贴板', 'success');
    });
  });
  
  // 保存本地
  document.getElementById('saveLocalBtn').addEventListener('click', saveLocal);
}

// =======================================================
// 动态注入样式
// =======================================================
function injectStyles() {
  let styleEl = document.getElementById('dynamic-styles');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'dynamic-styles';
    document.head.appendChild(styleEl);
  }

  const markdownCss = state.content['markdown'] || '';
  const tokensCss = state.content['tokens'] || '';

  // 确保注入的样式在最后，以覆盖默认样式
  // 先注入 tokens 变量，再注入 markdown 样式
  styleEl.textContent = tokensCss + '\n' + markdownCss;
}

// =======================================================
// UI 更新
// =======================================================
function updateUI() {
  // 更新文件列表
  document.querySelectorAll('.file-item').forEach(item => {
    const file = item.dataset.file;
    const versionEl = item.querySelector('.file-version');
    versionEl.textContent = CONFIG.FILES[file].version;
    item.classList.toggle('active', file === state.currentFile);
  });
  
  // 更新头部信息
  const file = CONFIG.FILES[state.currentFile];
  document.getElementById('currentFile').textContent = file.name;
  document.getElementById('currentVersion').textContent = file.version;
  document.getElementById('lastModified').textContent = `更新于 ${file.date}`;
  
  // 控制预览 tab 的显示/隐藏
  const previewTab = document.querySelector('.tab[data-tab="preview"]');
  if (previewTab) {
    if (state.currentFile === 'tokens' || state.currentFile === 'prompt') {
      previewTab.style.display = 'none';
    } else {
      previewTab.style.display = 'block';
    }
  }
  
  // 更新加载来源标识
  const loadSourceEl = document.getElementById('loadSource');
  const loadedFrom = file.loadedFrom || 'local';
  loadSourceEl.innerHTML = loadedFrom === 'remote' 
    ? '<span class="iconfont icon-xitong"></span> 远程' 
    : '<span class="iconfont icon-wenjianjia_dangan_guanbi"></span> 本地';
  loadSourceEl.className = `load-source ${loadedFrom}`;
  
  // 更新版本信息（只读）
  document.getElementById('versionDisplay').textContent = file.version;
  document.getElementById('dateDisplay').textContent = file.date;
  document.getElementById('changelogDisplay').textContent = file.changelog;
  
  // 更新使用方式代码
  updateUsageCode();
  
  // 更新统计
  updateStats();
  
  // 注入最新样式以供预览
  injectStyles();
  
  // 如果当前在预览 tab，重新渲染预览
  const activeTab = document.querySelector('.tab.active');
  if (activeTab && activeTab.dataset.tab === 'preview') {
    renderPreview();
  }
}

function updateStats() {
  const content = state.content[state.currentFile] || '';
  const lines = content.split('\n').length;
  const chars = content.length;
  
  document.getElementById('lineCount').textContent = `行数: ${lines}`;
  document.getElementById('charCount').textContent = `字符: ${chars}`;
}

function updateUsageCode() {
  const file = CONFIG.FILES[state.currentFile];
  const url = `${CONFIG.SUPABASE_URL}/storage/v1/object/public/${CONFIG.BUCKET}/${file.path}`;
  
  const usageCodes = {
    js: `import { loadStylesFromSupabase } from './utils/loadStyles';

await loadStylesFromSupabase();`,
    html: `<link rel="stylesheet" href="${url}" />`,
    prompt: `import { loadMarkdownGuideFromSupabase } from './utils/loadStyles';

const guide = await loadMarkdownGuideFromSupabase();
// 返回 markdown.css 中提取的 AI 规范文本`
  };
  
  const activeTab = document.querySelector('.usage-tab.active');
  const usage = activeTab ? activeTab.dataset.usage : 'js';
  document.getElementById('usageCode').textContent = usageCodes[usage];
}

// =======================================================
// 文件切换
// =======================================================
function switchFile(file) {
  state.currentFile = file;
  
  if (state.editor) {
    const model = state.editor.getModel();
    monaco.editor.setModelLanguage(model, file === 'prompt' ? 'markdown' : 'css');
    state.editor.setValue(state.content[file] || '');
  }
  
  // 如果切换到 tokens 或 prompt，强制回到编辑器视图
  if (file === 'tokens' || file === 'prompt') {
    switchTab('editor');
  }
  
  updateUI();
}

// =======================================================
// 标签切换
// =======================================================
function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  
  const editorContainer = document.getElementById('editorContainer');
  const previewContainer = document.getElementById('previewContainer');
  
  editorContainer.classList.toggle('hidden', tab !== 'editor');
  previewContainer.classList.toggle('hidden', tab !== 'preview');
  
  if (tab === 'preview') {
    renderPreview();
  }
}

// =======================================================
// 渲染预览
// =======================================================
function renderPreview() {
  const previewContainer = document.getElementById('markdownPreview');
  if (!previewContainer) return;
  
  if (state.currentFile === 'markdown') {
    previewContainer.innerHTML = `
      <div class="markdown-body">
        <h2>📋 项目背景</h2>
        <p>这是项目背景描述。我们正在构建一个全新的设计规范系统，以确保所有内部工具的视觉一致性。</p>
        
        <h4>⚙️ 技术方案</h4>
        <p>技术方案的详细说明。我们采用了 CSS Variables (Custom Properties) 来实现主题切换和动态样式加载。</p>
        
        <table>
          <thead>
            <tr>
              <th>组件</th>
              <th>用途</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CSS Tokens</td>
              <td>定义全局颜色、字号、间距等基础变量</td>
              <td>✅ 完成</td>
            </tr>
            <tr>
              <td>Markdown 样式</td>
              <td>统一 AI 输出内容的渲染格式</td>
              <td>✅ 完成</td>
            </tr>
            <tr>
              <td>组件库</td>
              <td>提供可复用的 UI 组件</td>
              <td>🚧 进行中</td>
            </tr>
          </tbody>
        </table>
        
        <p>如上表所示，项目进度良好。接下来我们将重点关注组件库的开发。</p>
        
        <ol>
          <li>第一步：初始化项目并配置构建工具</li>
          <li>第二步：定义基础设计 Token</li>
          <li>第三步：实现 Markdown 渲染样式</li>
          <li>第四步：开发核心 UI 组件</li>
        </ol>
        
        <hr>
        
        <blockquote>
          <p><strong>提示：</strong> 这是一个引用块示例。在实际应用中，引用块常用于强调重要信息或展示 AI 的特殊回复。</p>
        </blockquote>
        
        <p>以下是一段代码示例：</p>
        <pre><code>function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');</code></pre>
        
        <p>更多信息请参考<a href="#">官方文档</a>。</p>
      </div>
    `;
  } else {
    previewContainer.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--color-text-4);">
        <div class="iconfont icon-zujian" style="font-size: 48px; margin-bottom: 16px;"></div>
        <h3>Tokens 预览</h3>
        <p style="margin-top: 8px;">Tokens 文件主要定义 CSS 变量，请在左侧切换到 markdown.css 查看实际渲染效果。</p>
      </div>
    `;
  }
}

// =======================================================
// 使用方式切换
// =======================================================
function switchUsageTab(usage) {
  document.querySelectorAll('.usage-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.usage === usage);
  });
  updateUsageCode();
}

// =======================================================
// 主题切换
// =======================================================
function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  applyTheme(state.theme);
  localStorage.setItem('theme', state.theme);
  
  if (state.editor) {
    monaco.editor.setTheme(state.theme === 'dark' ? 'custom-dark' : 'custom-light');
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

// =======================================================
// 从远程同步
// =======================================================
async function syncFromRemote() {
  showToast('正在从远程同步...', 'success');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const [key, file] of Object.entries(CONFIG.FILES)) {
    try {
      const remoteUrl = `${CONFIG.SUPABASE_URL}/storage/v1/object/public/${CONFIG.BUCKET}/${file.path}?t=${Date.now()}`;
      const response = await fetch(remoteUrl);
      
      if (response.ok) {
        const content = await response.text();
        state.content[key] = content;
        
        const versionMatch = content.match(/版本[：:]\s*(v[\d.]+)/);
        if (versionMatch) {
          CONFIG.FILES[key].version = versionMatch[1];
        }
        
        const dateMatch = content.match(/更新日期[：:]\s*(\d{4}-\d{2}-\d{2})/);
        if (dateMatch) {
          CONFIG.FILES[key].date = dateMatch[1];
        }
        
        const changelogMatch = content.match(/更新内容[：:]\s*(.+)/);
        if (changelogMatch) {
          CONFIG.FILES[key].changelog = changelogMatch[1].trim();
        }
        
        CONFIG.FILES[key].loadedFrom = 'remote';
        successCount++;
      } else {
        failCount++;
      }
    } catch (error) {
      failCount++;
    }
  }
  
  if (state.editor && successCount > 0) {
    state.editor.setValue(state.content[state.currentFile]);
  }
  
  updateUI();
  
  if (failCount === 0) {
    showToast(`同步成功！已更新 ${successCount} 个文件`, 'success');
    state.loadedFromRemote = true;
  } else if (successCount > 0) {
    showToast(`部分成功：${successCount} 个成功，${failCount} 个失败`, 'success');
  } else {
    showToast('同步失败，请检查网络连接', 'error');
  }
}

// =======================================================
// 保存本地
// =======================================================
function saveLocal() {
  const content = state.content[state.currentFile];
  const blob = new Blob([content], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = CONFIG.FILES[state.currentFile].name;
  a.click();
  
  URL.revokeObjectURL(url);
  showToast('文件已下载', 'success');
}

// =======================================================
// Toast 提示
// =======================================================
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.querySelector('.toast-message').textContent = message;
  
  const iconEl = toast.querySelector('.toast-icon');
  iconEl.className = 'toast-icon iconfont ' + (type === 'success' ? 'icon-gou' : 'icon-cha_x');
  
  toast.className = `toast ${type}`;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

// =======================================================
// 启动应用
// =======================================================
document.addEventListener('DOMContentLoaded', init);
