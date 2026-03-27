(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const a={SUPABASE_URL:"https://db0cwzml9gxiye.database.sankuai.com",BUCKET:"public-assets",FILES:{tokens:{path:"styles/tokens.css",localPath:"./styles/tokens.css",name:"tokens.css",icon:"iconfont icon-duoweibiaoge",version:"v1.0.0",date:"2025-03-26",changelog:"初始版本，定义基础设计 Token 规范"},markdown:{path:"styles/markdown.css",localPath:"./styles/markdown.css",name:"markdown.css",icon:"iconfont icon-wendang",version:"v1.1.0",date:"2025-03-26",changelog:"优化表格和列表渲染规则"}}},o={currentFile:"markdown",content:{},editor:null,theme:localStorage.getItem("theme")||"light",loadedFromRemote:!1};async function E(){y(o.theme),await v(),await S(),b(),u()}async function v(){d("正在从远程加载最新版本...","success");for(const[e,t]of Object.entries(a.FILES))try{const n=`${a.SUPABASE_URL}/storage/v1/object/public/${a.BUCKET}/${t.path}?t=${Date.now()}`;let c=null,s="remote";try{const r=await fetch(n);r.ok&&(c=await r.text(),o.loadedFromRemote=!0,console.log(`✅ ${t.name} 已从远程加载`))}catch{console.warn(`远程加载 ${t.name} 失败，尝试本地文件...`)}if(c===null){const r=await fetch(t.localPath);r.ok&&(c=await r.text(),s="local",console.log(`📁 ${t.name} 已从本地加载`))}if(c!==null){o.content[e]=c;const r=c.match(/版本[：:]\s*(v[\d.]+)/);r&&(a.FILES[e].version=r[1]);const i=c.match(/更新日期[：:]\s*(\d{4}-\d{2}-\d{2})/);i&&(a.FILES[e].date=i[1]);const l=c.match(/更新内容[：:]\s*(.+)/);l&&(a.FILES[e].changelog=l[1].trim()),a.FILES[e].loadedFrom=s}}catch(n){console.error(`加载文件 ${e} 失败:`,n)}o.loadedFromRemote?d("已加载远程最新版本","success"):d("已加载本地版本（远程不可用）","success")}async function S(){const e=document.createElement("script");return e.src="https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js",await new Promise((t,n)=>{e.onload=t,e.onerror=n,document.head.appendChild(e)}),require.config({paths:{vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs"}}),new Promise(t=>{require(["vs/editor/editor.main"],function(){k(),o.editor=monaco.editor.create(document.getElementById("editorContainer"),{value:o.content[o.currentFile],language:"css",theme:o.theme==="dark"?"custom-dark":"custom-light",fontSize:14,fontFamily:"'SF Mono', 'Menlo', 'Monaco', 'Consolas', monospace",minimap:{enabled:!1},scrollBeyondLastLine:!1,automaticLayout:!0,tabSize:2,wordWrap:"on",lineNumbers:"on",renderLineHighlight:"line",padding:{top:16,bottom:16},readOnly:!0}),t()})})}function k(){monaco.editor.defineTheme("custom-light",{base:"vs",inherit:!0,rules:[],colors:{"editor.background":"#ffffff","editor.foreground":"#111925","editor.lineHighlightBackground":"#f5f6f7","editor.selectionBackground":"#e0f1ff","editorCursor.foreground":"#008cff","editor.readOnlyBackground":"#fafafa"}}),monaco.editor.defineTheme("custom-dark",{base:"vs-dark",inherit:!0,rules:[],colors:{"editor.background":"#191b1c","editor.foreground":"#ffffff","editor.lineHighlightBackground":"#212224","editor.selectionBackground":"#003c66","editorCursor.foreground":"#0095ff","editor.readOnlyBackground":"#1a1c1d"}})}function b(){document.querySelectorAll(".file-item").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.file;t!==o.currentFile&&F(t)})}),document.querySelectorAll(".tab").forEach(e=>{e.addEventListener("click",()=>{h(e.dataset.tab)})}),document.getElementById("themeToggle").addEventListener("click",I),document.getElementById("syncBtn").addEventListener("click",B),document.querySelectorAll(".usage-tab").forEach(e=>{e.addEventListener("click",()=>{C(e.dataset.usage)})}),document.querySelectorAll(".copy-btn").forEach(e=>{e.addEventListener("click",()=>{const t=document.getElementById(e.dataset.target);navigator.clipboard.writeText(t.textContent),d("已复制到剪贴板","success")})}),document.getElementById("saveLocalBtn").addEventListener("click",x)}function w(){let e=document.getElementById("dynamic-styles");e||(e=document.createElement("style"),e.id="dynamic-styles",document.head.appendChild(e));const t=o.content.markdown||"",n=t.match(/Markdown 渲染样式\s*=======================================================\s*\*\/([\s\S]*)/),c=n?n[1]:t,s=o.content.tokens||"";e.textContent=`
    ${s}
    ${c}
  `}function u(){document.querySelectorAll(".file-item").forEach(r=>{const i=r.dataset.file,l=r.querySelector(".file-version");l.textContent=a.FILES[i].version,r.classList.toggle("active",i===o.currentFile)});const e=a.FILES[o.currentFile];document.getElementById("currentFile").textContent=e.name,document.getElementById("currentVersion").textContent=e.version,document.getElementById("lastModified").textContent=`更新于 ${e.date}`;const t=document.querySelector('.tab[data-tab="preview"]');t&&(o.currentFile==="tokens"?t.style.display="none":t.style.display="block");const n=document.getElementById("loadSource"),c=e.loadedFrom||"local";n.innerHTML=c==="remote"?'<span class="iconfont icon-xitong"></span> 远程':'<span class="iconfont icon-wenjianjia_dangan_guanbi"></span> 本地',n.className=`load-source ${c}`,document.getElementById("versionDisplay").textContent=e.version,document.getElementById("dateDisplay").textContent=e.date,document.getElementById("changelogDisplay").textContent=e.changelog,g(),L(),w();const s=document.querySelector(".tab.active");s&&s.dataset.tab==="preview"&&p()}function L(){const e=o.content[o.currentFile]||"",t=e.split(`
`).length,n=e.length;document.getElementById("lineCount").textContent=`行数: ${t}`,document.getElementById("charCount").textContent=`字符: ${n}`}function g(){const e=a.FILES[o.currentFile],n={js:`import { loadStylesFromSupabase } from './utils/loadStyles';

await loadStylesFromSupabase();`,html:`<link rel="stylesheet" href="${`${a.SUPABASE_URL}/storage/v1/object/public/${a.BUCKET}/${e.path}`}" />`,prompt:`import { loadMarkdownGuideFromSupabase } from './utils/loadStyles';

const guide = await loadMarkdownGuideFromSupabase();
// 返回 markdown.css 中提取的 AI 规范文本`},c=document.querySelector(".usage-tab.active"),s=c?c.dataset.usage:"js";document.getElementById("usageCode").textContent=n[s]}function F(e){o.currentFile=e,o.editor&&o.editor.setValue(o.content[e]||""),e==="tokens"&&h("editor"),u()}function h(e){document.querySelectorAll(".tab").forEach(c=>{c.classList.toggle("active",c.dataset.tab===e)});const t=document.getElementById("editorContainer"),n=document.getElementById("previewContainer");t.classList.toggle("hidden",e!=="editor"),n.classList.toggle("hidden",e!=="preview"),e==="preview"&&p()}function p(){const e=document.getElementById("markdownPreview");e&&(o.currentFile==="markdown"?e.innerHTML=`
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
    `:e.innerHTML=`
      <div style="text-align: center; padding: 40px; color: var(--color-text-4);">
        <div class="iconfont icon-zujian" style="font-size: 48px; margin-bottom: 16px;"></div>
        <h3>Tokens 预览</h3>
        <p style="margin-top: 8px;">Tokens 文件主要定义 CSS 变量，请在左侧切换到 markdown.css 查看实际渲染效果。</p>
      </div>
    `)}function C(e){document.querySelectorAll(".usage-tab").forEach(t=>{t.classList.toggle("active",t.dataset.usage===e)}),g()}function I(){o.theme=o.theme==="light"?"dark":"light",y(o.theme),localStorage.setItem("theme",o.theme),o.editor&&monaco.editor.setTheme(o.theme==="dark"?"custom-dark":"custom-light")}function y(e){document.documentElement.setAttribute("data-theme",e)}async function B(){d("正在从远程同步...","success");let e=0,t=0;for(const[n,c]of Object.entries(a.FILES))try{const s=`${a.SUPABASE_URL}/storage/v1/object/public/${a.BUCKET}/${c.path}?t=${Date.now()}`,r=await fetch(s);if(r.ok){const i=await r.text();o.content[n]=i;const l=i.match(/版本[：:]\s*(v[\d.]+)/);l&&(a.FILES[n].version=l[1]);const m=i.match(/更新日期[：:]\s*(\d{4}-\d{2}-\d{2})/);m&&(a.FILES[n].date=m[1]);const f=i.match(/更新内容[：:]\s*(.+)/);f&&(a.FILES[n].changelog=f[1].trim()),a.FILES[n].loadedFrom="remote",e++}else t++}catch{t++}o.editor&&e>0&&o.editor.setValue(o.content[o.currentFile]),u(),t===0?(d(`同步成功！已更新 ${e} 个文件`,"success"),o.loadedFromRemote=!0):e>0?d(`部分成功：${e} 个成功，${t} 个失败`,"success"):d("同步失败，请检查网络连接","error")}function x(){const e=o.content[o.currentFile],t=new Blob([e],{type:"text/css"}),n=URL.createObjectURL(t),c=document.createElement("a");c.href=n,c.download=a.FILES[o.currentFile].name,c.click(),URL.revokeObjectURL(n),d("文件已下载","success")}function d(e,t="success"){const n=document.getElementById("toast");n.querySelector(".toast-message").textContent=e;const c=n.querySelector(".toast-icon");c.className="toast-icon iconfont "+(t==="success"?"icon-gou":"icon-cha_x"),n.className=`toast ${t}`,n.classList.remove("hidden"),setTimeout(()=>{n.classList.add("hidden")},3e3)}document.addEventListener("DOMContentLoaded",E);
