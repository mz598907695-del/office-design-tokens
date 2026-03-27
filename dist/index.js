/**
 * 美团办公设计规范
 * @version 1.1.0
 */

// CSS 内容
const tokensCss = `﻿/* =======================================================
   ⚠️ 重要说明：设计 Token 使用规范 ⚠️
   版本：v1.0.0
   更新日期：2025-03-26
=======================================================

【强制要求】
本项目一旦引入此 tokens.css 文件，除非用户明确特殊强调允许，
否则所有样式相关的值都必须使用此文件中定义的设计 Token，包括：

  ✅ 颜色（color）      - 必须使用 --color-* 变量
  ✅ 字号（font-size）  - 必须使用 --font-*-size 变量
  ✅ 行高（line-height）- 必须使用 --font-*-line-height 变量
  ✅ 圆角（border-radius）- 必须使用 --radius-* 变量
  ✅ 特效（shadow/blur） - 必须使用 --effect-* 变量
  ✅ 间距（spacing）    - 必须使用 --spacing-* 变量
  ✅ 边框（border）     - 必须使用 --border-* 变量

【禁止行为】
  ❌ 禁止在代码中直接写死颜色值（如 #fff、rgb(255,0,0) 等）
  ❌ 禁止在代码中直接写死字号值（如 14px、1rem 等，除非使用本文件定义的变量）
  ❌ 禁止在代码中直接写死圆角值（如 4px、8px 等）
  ❌ 禁止在代码中直接写死阴影、模糊等特效值
  ❌ 禁止 AI 未经用户明确允许擅自修改此文件内容

【版本历史】
  v1.0.0 (2025-03-26) - 初始版本，定义基础设计 Token 规范

【使用方式】
  在 CSS/SCSS/LESS 中使用：
    color: var(--color-text-1);
    font-size: var(--font-size-14);
    border-radius: var(--radius-8);
    box-shadow: var(--effect-shadow-level-1-box);

  在 JavaScript/TypeScript 中使用：
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-blue');

=======================================================
   全局 CSS Token（颜色 / 字号 / 圆角 / 特效 / 间距 / 边框）
   统一 Light / Dark 双模式，单位 rem
   代号 + token 名 + 中文描述
======================================================= */


/* =======================================================
   Light 模式（默认模式）
   通过 :root 选择器定义，适用于浅色主题
======================================================= */
:root {

  /* ========== 文字颜色 ========== */
  /* 文字颜色层级：从最强调到最弱 */

  /* text-black - 反黑文字（黑色，不受模式影响） */
  --color-text-black: rgba(0, 0, 0, 1);
  
  /* text-1 - 一级标题（最重要文字）纯黑 */
  --color-text-1: rgba(0, 0, 0, 1);
  
  /* text-2 - 主要文字（111925） */
  --color-text-2: rgba(17, 25, 37, 1);
  
  /* text-3 - 次主要文字（85% 透明度） */
  --color-text-3: rgba(17, 25, 37, 0.85);
  
  /* text-4 - 辅助文字（65% 透明度） */
  --color-text-4: rgba(17, 25, 37, 0.65);
  
  /* text-5 - 次辅助文字（45% 透明度） */
  --color-text-5: rgba(17, 25, 37, 0.45);
  
  /* text-6 - 输入提示/禁用文字（30% 透明度） */
  --color-text-6: rgba(17, 25, 37, 0.3);
  
  /* text-white - 反白文字（白色，不受模式影响） */
  --color-text-white: rgba(255, 255, 255, 1);
  
  /* text-on-neutral - 中性色主按钮文字（亮色纯白） */
  --color-text-on-neutral: rgba(255, 255, 255, 1);


  /* ========== 背景颜色 ========== */
  /* 页面层级背景色 */

  /* bg-1 - 一级页面背景（纯白） */
  --color-bg-1: rgba(255, 255, 255, 1);
  
  /* bg-2 - 二级页面背景（浅灰） */
  --color-bg-2: rgba(245, 246, 247, 1);
  
  /* bg-3 - 学城首页背景（浅米黄） */
  --color-bg-3: rgba(245, 242, 238, 1);
  
  /* bg-4 - 学城大弹窗背景（特殊场景） */
  --color-bg-4: rgba(245, 242, 238, 1);
  
  /* bg-overlay - 弹窗蒙层背景（30% 透明度黑色） */
  --color-bg-overlay: rgba(0, 0, 0, 0.3);


  /* ========== 容器颜色 - 实色 ========== */
  /* 用于容器填充的实色值 */

  /* fill-1 - 一级容器填充（纯白） */
  --color-fill-1: rgba(255, 255, 255, 1);
  
  /* fill-2 - 二级容器填充（浅灰，3% 透明度） */
  --color-fill-2: rgba(248, 248, 248, 1);
  
  /* fill-3 - 三级容器填充（浅灰，5% 透明度） */
  --color-fill-3: rgba(243, 243, 244, 1);

   /* fill-4 - 中性色主按钮（纯黑） */
   --color-fill-4: rgb(0, 0, 0);

  /* ========== 容器颜色 - 透明度 ========== */
  /* 用于需要透明效果的容器 */

  /* fill-a1 - 一级容器填充（透明度，纯白） */
  --color-fill-a1: rgba(255, 255, 255, 1);
  
  /* fill-a2 - 二级容器填充（透明度，3% 透明度） */
  --color-fill-a2: rgba(17, 25, 37, 0.03);
  
  /* fill-a3 - 三级容器填充（透明度，5% 透明度） */
  --color-fill-a3: rgba(17, 25, 37, 0.05);
  
  /* fill-a4 - 悬浮容器（下拉菜单、弹窗等悬浮场景） */
  --color-fill-a4: rgba(255, 255, 255, 0.9);
  
  /* fill-a5 - 高透悬浮容器（悬浮操作条/最顶层） */
  --color-fill-a5: rgba(255, 255, 255, 0.6);
  
  /* fill-a6 - chat悬浮操作条（特殊场景） */
  --color-fill-a6: rgba(235, 235, 235, 0.7);


  /* ========== 线条颜色 - 实色 ========== */
  /* 用于边框和分割线的实色值 */

  /* border-1 - 描边（主要边框） */
  --color-border-1: rgba(219, 221, 222, 1);
  
  /* border-2 - 弱描边/分割线（次要边框） */
  --color-border-2: rgba(231, 232, 233, 1);


  /* ========== 线条颜色 - 透明度 ========== */
  /* 用于需要透明效果的边框 */

  /* border-a1 - 描边（透明度，15% 透明度） */
  --color-border-a1: rgba(17, 25, 37, 0.15);
  
  /* border-a2 - 弱描边/分割线（透明度，10% 透明度） */
  --color-border-a2: rgba(17, 25, 37, 0.1);
  
  /* border-a3 - 高透悬浮容器描边（特殊场景） */
  --color-border-a3: rgba(255, 255, 255, 0.9);


  /* ========== 主题色 ========== */
  /* 每个主题色包含 7 个层级：B7(最强) -> B6 -> B5 -> B4(标准) -> B3 -> B2 -> B1(最弱) */
  /* B7/B6: 文字色 | B5/B4/B3: 交互色 | B2/B1: 背景色 */


  /* -------- Blue（蓝色） -------- */
  /* B7 - 强化彩色文字 */
  --color-blue-text-strong: rgba(0, 63, 115, 1);
  /* B6 - 彩色文字 */
  --color-blue-text: rgba(0, 91, 166, 1);
  /* B5 - 按下态 */
  --color-blue-active: rgba(0, 119, 217, 1);
  /* B4 - 标准色（主要使用） */
  --color-blue: rgba(0, 140, 255, 1);
  /* B3 - hover态 */
  --color-blue-hover: rgba(38, 157, 255, 1);
  /* B2 - tag 背景/禁用 */
  --color-blue-bg-disabled: rgba(166, 215, 255, 1);
  /* B1 - 列表选中/消息气泡背景 */
  --color-blue-bg-weak: rgba(224, 241, 255, 1);


  /* -------- Red（红色） -------- */
  /* R7 - 强化彩色文字 */
  --color-red-text-strong: rgba(64, 15, 16, 1);
  /* R6 - 彩色文字 */
  --color-red-text: rgba(166, 38, 42, 1);
  /* R5 - 按下态 */
  --color-red-active: rgba(217, 50, 55, 1);
  /* R4 - 标准色（主要使用） */
  --color-red: rgba(255, 59, 65, 1);
  /* R3 - hover态 */
  --color-red-hover: rgba(255, 69, 75, 1);
  /* R2 - tag 背景/禁用 */
  --color-red-bg-disabled: rgba(255, 186, 188, 1);
  /* R1 - 列表选中/弱背景 */
  --color-red-bg-weak: rgba(255, 231, 232, 1);


  /* -------- Orange（橙色） -------- */
  /* O7 - 强化彩色文字 */
  --color-orange-text-strong: rgba(64, 34, 10, 1);
  /* O6 - 彩色文字 */
  --color-orange-text: rgba(166, 89, 26, 1);
  /* O5 - 按下态 */
  --color-orange-active: rgba(217, 116, 34, 1);
  /* O4 - 标准色（主要使用） */
  --color-orange: rgba(255, 137, 40, 1);
  /* O3 - hover态 */
  --color-orange-hover: rgba(255, 155, 72, 1);
  /* O2 - tag 背景/禁用 */
  --color-orange-bg-disabled: rgba(255, 214, 180, 1);
  /* O1 - 列表选中/弱背景 */
  --color-orange-bg-weak: rgba(255, 241, 229, 1);


  /* -------- Yellow（黄色） -------- */
  /* Y7 - 强化彩色文字 */
  --color-yellow-text-strong: rgba(64, 48, 0, 1);
  /* Y6 - 彩色文字 */
  --color-yellow-text: rgba(166, 124, 0, 1);
  /* Y5 - 按下态 */
  --color-yellow-active: rgba(217, 162, 0, 1);
  /* Y4 - 标准色（主要使用） */
  --color-yellow: rgba(255, 191, 0, 1);
  /* Y3 - hover态 */
  --color-yellow-hover: rgba(255, 201, 38, 1);
  /* Y2 - tag 背景/禁用 */
  --color-yellow-bg-disabled: rgba(255, 233, 166, 1);
  /* Y1 - 列表选中/弱背景 */
  --color-yellow-bg-weak: rgba(255, 247, 224, 1);


  /* -------- Green（绿色） -------- */
  /* G7 - 强化彩色文字 */
  --color-green-text-strong: rgba(25, 49, 16, 1);
  /* G6 - 彩色文字 */
  --color-green-text: rgba(65, 126, 41, 1);
  /* G5 - 按下态 */
  --color-green-active: rgba(85, 165, 54, 1);
  /* G4 - 标准色（主要使用） */
  --color-green: rgba(100, 194, 63, 1);
  /* G3 - hover态 */
  --color-green-hover: rgba(123, 203, 92, 1);
  /* G2 - tag 背景/禁用 */
  --color-green-bg-disabled: rgba(201, 234, 188, 1);
  /* G1 - 列表选中/弱背景 */
  --color-green-bg-weak: rgba(236, 248, 232, 1);


  /* -------- Cyan（青色） -------- */
  /* C7 - 强化彩色文字 */
  --color-cyan-text-strong: rgba(0, 50, 52, 1);
  /* C6 - 彩色文字 */
  --color-cyan-text: rgba(0, 129, 136, 1);
  /* C5 - 按下态 */
  --color-cyan-active: rgba(0, 169, 178, 1);
  /* C4 - 标准色（主要使用） */
  --color-cyan: rgba(0, 199, 209, 1);
  /* C3 - hover态 */
  --color-cyan-hover: rgba(38, 207, 216, 1);
  /* C2 - tag 背景/禁用 */
  --color-cyan-bg-disabled: rgba(166, 235, 239, 1);
  /* C1 - 列表选中/弱背景 */
  --color-cyan-bg-weak: rgba(224, 248, 249, 1);


  /* -------- Purple（紫色） -------- */
  /* P7 - 强化彩色文字 */
  --color-purple-text-strong: rgba(38, 18, 64, 1);
  /* P6 - 彩色文字 */
  --color-purple-text: rgba(99, 46, 166, 1);
  /* P5 - 按下态 */
  --color-purple-active: rgba(129, 60, 217, 1);
  /* P4 - 标准色（主要使用） */
  --color-purple: rgba(152, 71, 255, 1);
  /* P3 - hover态 */
  --color-purple-hover: rgba(167, 99, 255, 1);
  /* P2 - tag 背景/禁用 */
  --color-purple-bg-disabled: rgba(219, 191, 255, 1);
  /* P1 - 列表选中/弱背景 */
  --color-purple-bg-weak: rgba(243, 233, 255, 1);


  /* -------- Hot Pink（热粉色） -------- */
  /* H7 - 强化彩色文字 */
  --color-hotpink-text-strong: rgba(57, 16, 48, 1);
  /* H6 - 彩色文字 */
  --color-hotpink-text: rgba(149, 42, 124, 1);
  /* H5 - 按下态 */
  --color-hotpink-active: rgba(195, 54, 162, 1);
  /* H4 - 标准色（主要使用） */
  --color-hotpink: rgba(229, 64, 191, 1);
  /* H3 - hover态 */
  --color-hotpink-hover: rgba(233, 93, 201, 1);
  /* H2 - tag 背景/禁用 */
  --color-hotpink-bg-disabled: rgba(246, 188, 233, 1);
  /* H1 - 列表选中/弱背景 */
  --color-hotpink-bg-weak: rgba(252, 232, 247, 1);


  /* -------- Magenta（品红色） -------- */
  /* M7 - 强化彩色文字 */
  --color-magenta-text-strong: rgba(64, 11, 27, 1);
  /* M6 - 彩色文字 */
  --color-magenta-text: rgba(166, 29, 70, 1);
  /* M5 - 按下态 */
  --color-magenta-active: rgba(217, 38, 92, 1);
  /* M4 - 标准色（主要使用） */
  --color-magenta: rgba(255, 45, 108, 1);
  /* M3 - hover态 */
  --color-magenta-hover: rgba(255, 77, 130, 1);
  /* M2 - tag 背景/禁用 */
  --color-magenta-bg-disabled: rgba(255, 181, 204, 1);
  /* M1 - 列表选中/弱背景 */
  --color-magenta-bg-weak: rgba(255, 230, 237, 1);


  /* -------- Walnut（胡桃色） -------- */
  /* W7 - 强化彩色文字 */
  --color-walnut-text-strong: rgba(43, 31, 24, 1);
  /* W6 - 彩色文字 */
  --color-walnut-text: rgba(112, 81, 61, 1);
  /* W5 - 按下态 */
  --color-walnut-active: rgba(146, 106, 80, 1);
  /* W4 - 标准色（主要使用） */
  --color-walnut: rgba(172, 125, 94, 1);
  /* W3 - hover态 */
  --color-walnut-hover: rgba(184, 144, 118, 1);
  /* W2 - tag 背景/禁用 */
  --color-walnut-bg-disabled: rgba(226, 209, 199, 1);
  /* W1 - 列表选中/弱背景 */
  --color-walnut-bg-weak: rgba(245, 239, 236, 1);
}


/* =======================================================
   Dark 模式
   通过 [data-theme="dark"] 选择器定义，适用于深色主题
   使用方法：在根元素添加 data-theme="dark" 属性
======================================================= */
[data-theme="dark"] {

  /* ========== 文字颜色 ========== */
  /* 文字颜色层级：从最强调到最弱 */

  /* text-black - 反黑文字（黑色，不受模式影响） */
  --color-text-black: rgba(0, 0, 0, 1);
  
  /* text-1 - 一级标题（最重要文字，对应纯黑） */
  --color-text-1: rgba(255, 255, 255, 1);
  
  /* text-2 - 主要文字（对应 111925） */
  --color-text-2: rgba(255, 255, 255, 0.9);
  
  /* text-3 - 次主要文字（对应 85% 透明度） */
  --color-text-3: rgba(255, 255, 255, 0.75);
  
  /* text-4 - 辅助文字（对应 65% 透明度） */
  --color-text-4: rgba(255, 255, 255, 0.6);
  
  /* text-5 - 次辅助文字（对应 45% 透明度） */
  --color-text-5: rgba(255, 255, 255, 0.45);
  
  /* text-6 - 输入提示/禁用文字（对应 30% 透明度） */
  --color-text-6: rgba(255, 255, 255, 0.35);
  
  /* text-white - 反白文字（白色，不受模式影响） */
  --color-text-white: rgba(255, 255, 255, 1);
  
  /* text-on-neutral - 中性色主按钮文字（深色纯黑） */
  --color-text-on-neutral: rgba(0, 0, 0, 1);


  /* ========== 背景颜色 ========== */
  /* 页面层级背景色 */

  /* bg-1 - 一级页面背景（对应纯白） */
  --color-bg-1: rgba(25, 27, 28, 1);
  
  /* bg-2 - 二级页面背景（对应浅灰） */
  --color-bg-2: rgba(18, 19, 20, 1);
  
  /* bg-3 - 学城首页背景（对应浅米黄） */
  --color-bg-3: rgba(18, 19, 20, 1);
  
  /* bg-4 - 学城大弹窗背景（特殊场景） */
  --color-bg-4: rgba(42, 42, 43, 1);
  
  /* bg-overlay - 弹窗蒙层背景（30% 透明度黑色） */
  --color-bg-overlay: rgba(0, 0, 0, 0.3);


  /* ========== 容器颜色 - 实色 ========== */
  /* 用于容器填充的实色值 */

  /* fill-1 - 一级容器填充（对应纯白） */
  --color-fill-1: rgba(33, 34, 36, 1);
  
  /* fill-2 - 二级容器填充（对应 3% 透明度） */
  --color-fill-2: rgba(42, 44, 46, 1);
  
  /* fill-3 - 三级容器填充（对应 5% 透明度） */
  --color-fill-3: rgba(52, 54, 56, 1);

  /* fill-4 - 中性色主按钮（纯白） */
  --color-fill-4: rgb(255, 255, 255);


  /* ========== 容器颜色 - 透明度 ========== */
  /* 用于需要透明效果的容器 */

  /* fill-a1 - 一级容器填充（对应纯白） */
  --color-fill-a1: rgba(255, 255, 255, 0.1);
  
  /* fill-a2 - 二级容器填充（对应 3% 透明度） */
  --color-fill-a2: rgba(255, 255, 255, 0.05);
  
  /* fill-a3 - 三级容器填充（对应 5% 透明度） */
  --color-fill-a3: rgba(255, 255, 255, 0.07);
  
  /* fill-a4 - 悬浮容器（下拉菜单、弹窗等悬浮场景） */
  --color-fill-a4: rgba(44, 45, 46, 0.9);
  
  /* fill-a5 - 高透悬浮容器（悬浮操作条/最顶层） */
  --color-fill-a5: rgba(73, 75, 77, 0.6);
  
  /* fill-a6 - chat悬浮操作条（特殊场景） */
  --color-fill-a6: rgba(99, 99, 99, 0.3);


  /* ========== 线条颜色 - 实色 ========== */
  /* 用于边框和分割线的实色值 */

  /* border-1 - 描边（主要边框） */
  --color-border-1: rgb(64, 66, 67);
  
  /* border-2 - 弱描边/分割线（次要边框） */
  --color-border-2: rgba(53, 54, 55, 1);


  /* ========== 线条颜色 - 透明度 ========== */
  /* 用于需要透明效果的边框 */

  /* border-a1 - 描边（对应 15% 透明度） */
  --color-border-a1: rgba(255, 255, 255, 0.17);
  
  /* border-a2 - 弱描边/分割线（对应 10% 透明度） */
  --color-border-a2: rgba(255, 255, 255, 0.12);
  
  /* border-a3 - 高透悬浮容器描边（特殊场景） */
  --color-border-a3: rgba(255, 255, 255, 0.05);


  /* ========== 主题色 ========== */
  /* 每个主题色包含 7 个层级：B7(最强) -> B6 -> B5 -> B4(标准) -> B3 -> B2 -> B1(最弱) */
  /* B7/B6: 文字色 | B5/B4/B3: 交互色 | B2/B1: 背景色 */


  /* -------- Blue（蓝色） -------- */
  /* B7 - 强化彩色文字 */
  --color-blue-text-strong: rgba(229, 244, 255, 1);
  /* B6 - 彩色文字 */
  --color-blue-text: rgba(166, 218, 255, 1);
  /* B5 - 按下态 */
  --color-blue-active: rgba(38, 165, 255, 1);
  /* B4 - 标准色（主要使用） */
  --color-blue: rgba(0, 149, 255, 1);
  /* B3 - hover态 */
  --color-blue-hover: rgba(0, 127, 217, 1);
  /* B2 - tag 背景/禁用 */
  --color-blue-bg-disabled: rgba(0, 82, 140, 1);
  /* B1 - 列表选中/消息气泡背景 */
  --color-blue-bg-weak: rgba(0, 60, 102, 1);


  /* -------- Red（红色） -------- */
  /* R7 - 强化彩色文字 */
  --color-red-text-strong: rgba(255, 236, 237, 1);
  /* R6 - 彩色文字 */
  --color-red-text: rgba(255, 190, 192, 1);
  /* R5 - 按下态 */
  --color-red-active: rgba(255, 97, 102, 1);
  /* R4 - 标准色（主要使用） */
  --color-red: rgba(255, 69, 75, 1);
  /* R3 - hover态 */
  --color-red-hover: rgba(217, 59, 64, 1);
  /* R2 - tag 背景/禁用 */
  --color-red-bg-disabled: rgba(140, 38, 41, 1);
  /* R1 - 列表选中/弱背景 */
  --color-red-bg-weak: rgba(102, 28, 30, 1);


  /* -------- Orange（橙色） -------- */
  /* O7 - 强化彩色文字 */
  --color-orange-text-strong: rgba(255, 244, 234, 1);
  /* O6 - 彩色文字 */
  --color-orange-text: rgba(255, 215, 183, 1);
  /* O5 - 按下态 */
  --color-orange-active: rgba(255, 158, 79, 1);
  /* O4 - 标准色（主要使用） */
  --color-orange: rgba(255, 141, 48, 1);
  /* O3 - hover态 */
  --color-orange-hover: rgba(217, 120, 41, 1);
  /* O2 - tag 背景/禁用 */
  --color-orange-bg-disabled: rgba(140, 78, 26, 1);
  /* O1 - 列表选中/弱背景 */
  --color-orange-bg-weak: rgba(102, 56, 19, 1);


  /* -------- Yellow（黄色） -------- */
  /* Y7 - 强化彩色文字 */
  --color-yellow-text-strong: rgba(255, 249, 229, 1);
  /* Y6 - 彩色文字 */
  --color-yellow-text: rgba(255, 236, 166, 1);
  /* Y5 - 按下态 */
  --color-yellow-active: rgba(255, 215, 71, 1);
  /* Y4 - 标准色（主要使用） */
  --color-yellow: rgba(255, 200, 0, 1);
  /* Y3 - hover态 */
  --color-yellow-hover: rgba(217, 170, 0, 1);
  /* Y2 - tag 背景/禁用 */
  --color-yellow-bg-disabled: rgba(140, 110, 0, 1);
  /* Y1 - 列表选中/弱背景 */
  --color-yellow-bg-weak: rgba(102, 80, 0, 1);


  /* -------- Green（绿色） -------- */
  /* G7 - 强化彩色文字 */
  --color-green-text-strong: rgba(234, 250, 238, 1);
  /* G6 - 彩色文字 */
  --color-green-text: rgba(183, 239, 197, 1);
  /* G5 - 按下态 */
  --color-green-active: rgba(79, 216, 113, 1);
  /* G4 - 标准色（主要使用） */
  --color-green: rgba(48, 209, 88, 1);
  /* G3 - hover态 */
  --color-green-hover: rgba(41, 178, 75, 1);
  /* G2 - tag 背景/禁用 */
  --color-green-bg-disabled: rgba(26, 115, 48, 1);
  /* G1 - 列表选中/弱背景 */
  --color-green-bg-weak: rgba(19, 84, 35, 1);


  /* -------- Cyan（青色） -------- */
  /* C7 - 强化彩色文字 */
  --color-cyan-text-strong: rgba(229, 251, 252, 1);
  /* C6 - 彩色文字 */
  --color-cyan-text: rgba(166, 240, 244, 1);
  /* C5 - 按下态 */
  --color-cyan-active: rgba(38, 219, 229, 1);
  /* C4 - 标准色（主要使用） */
  --color-cyan: rgba(0, 213, 224, 1);
  /* C3 - hover态 */
  --color-cyan-hover: rgba(0, 181, 190, 1);
  /* C2 - tag 背景/禁用 */
  --color-cyan-bg-disabled: rgba(0, 117, 123, 1);
  /* C1 - 列表选中/弱背景 */
  --color-cyan-bg-weak: rgba(0, 85, 90, 1);


  /* -------- Purple（紫色） -------- */
  /* P7 - 强化彩色文字 */
  --color-purple-text-strong: rgba(246, 239, 255, 1);
  /* P6 - 彩色文字 */
  --color-purple-text: rgba(225, 200, 255, 1);
  /* P5 - 按下态 */
  --color-purple-active: rgba(181, 122, 255, 1);
  /* P4 - 标准色（主要使用） */
  --color-purple: rgba(168, 99, 255, 1);
  /* P3 - hover态 */
  --color-purple-hover: rgba(143, 84, 217, 1);
  /* P2 - tag 背景/禁用 */
  --color-purple-bg-disabled: rgba(92, 54, 140, 1);
  /* P1 - 列表选中/弱背景 */
  --color-purple-bg-weak: rgba(67, 40, 102, 1);


  /* -------- Hot Pink（热粉色） -------- */
  /* H7 - 强化彩色文字 */
  --color-hotpink-text-strong: rgba(253, 236, 249, 1);
  /* H6 - 彩色文字 */
  --color-hotpink-text: rgba(248, 188, 234, 1);
  /* H5 - 按下态 */
  --color-hotpink-active: rgba(238, 92, 204, 1);
  /* H4 - 标准色（主要使用） */
  --color-hotpink: rgba(235, 63, 195, 1);
  /* H3 - hover态 */
  --color-hotpink-hover: rgba(200, 54, 166, 1);
  /* H2 - tag 背景/禁用 */
  --color-hotpink-bg-disabled: rgba(129, 35, 107, 1);
  /* H1 - 列表选中/弱背景 */
  --color-hotpink-bg-weak: rgba(94, 25, 78, 1);


  /* -------- Magenta（品红色） -------- */
  /* M7 - 强化彩色文字 */
  --color-magenta-text-strong: rgba(255, 234, 241, 1);
  /* M6 - 彩色文字 */
  --color-magenta-text: rgba(255, 182, 206, 1);
  /* M5 - 按下态 */
  --color-magenta-active: rgba(255, 77, 137, 1);
  /* M4 - 标准色（主要使用） */
  --color-magenta: rgba(255, 46, 116, 1);
  /* M3 - hover态 */
  --color-magenta-hover: rgba(217, 39, 99, 1);
  /* M2 - tag 背景/禁用 */
  --color-magenta-bg-disabled: rgba(140, 25, 64, 1);
  /* M1 - 列表选中/弱背景 */
  --color-magenta-bg-weak: rgba(102, 18, 46, 1);


  /* -------- Walnut（胡桃色） -------- */
  /* W7 - 强化彩色文字 */
  --color-walnut-text-strong: rgba(248, 243, 240, 1);
  /* W6 - 彩色文字 */
  --color-walnut-text: rgba(230, 215, 201, 1);
  /* W5 - 按下态 */
  --color-walnut-active: rgba(194, 157, 125, 1);
  /* W4 - 标准色（主要使用） */
  --color-walnut: rgba(183, 140, 102, 1);
  /* W3 - hover态 */
  --color-walnut-hover: rgba(156, 119, 87, 1);
  /* W2 - tag 背景/禁用 */
  --color-walnut-bg-disabled: rgba(101, 77, 56, 1);
  /* W1 - 列表选中/弱背景 */
  --color-walnut-bg-weak: rgba(73, 56, 41, 1);
}


/* =======================================================
   全局 Token（不区分深浅模式）
   这些 Token 在 Light 和 Dark 模式下保持一致
======================================================= */
:root {

  /* ========== 字号 & 行高 ========== */
/* 基础字号：1rem = 16px */
font-size: 16px;

  /* 字号层级说明（按使用场景分类，统一使用数字命名）：
     
     【辅助文字】
     10: 10px - 极小文字（标签、提示、角标）
     12: 12px - 小号文字（辅助信息、说明文字）
     
     【正文文字】
     14: 14px - 基础文字（正文，最常用）
     16: 16px - 中等文字（小标题 / 正文）
     
     【标题文字】
     18: 18px - 中大型文字（四级标题）
     20: 20px - 大号文字（三级标题）
     24: 24px - 超大文字（二级标题）
     28: 28px - 二级超大文字（一级标题）
     32: 32px - 三级超大文字（超大标题）
     36: 36px - 四级超大文字（展示标题）
     48: 48px - 五级超大文字（大展示标题）
     56: 56px - 六级超大文字（最大展示标题） */
  
  /* 10 - 10px - 极小文字（标签、提示、角标） */
  --font-size-10: 0.625rem;
  --font-line-height-10: 1rem;
  
  /* 12 - 12px - 小号文字（辅助信息、说明文字） */
  --font-size-12: 0.75rem;
  --font-line-height-12: 1.25rem;
  
  /* 14 - 14px - 基础文字（正文，最常用） */
  --font-size-14: 0.875rem;
  --font-line-height-14: 1.5rem;
  
  /* 16 - 16px - 中等文字（小标题 / 正文） */
  --font-size-16: 1rem;
  --font-line-height-16: 1.625rem;
  
  /* 18 - 18px - 中大型文字（四级标题） */
  --font-size-18: 1.125rem;
  --font-line-height-18: 1.75rem;
  
  /* 20 - 20px - 大号文字（三级标题） */
  --font-size-20: 1.25rem;
  --font-line-height-20: 1.75rem;
  
  /* 24 - 24px - 超大文字（二级标题） */
  --font-size-24: 1.5rem;
  --font-line-height-24: 2rem;
  
  /* 28 - 28px - 二级超大文字（一级标题） */
  --font-size-28: 1.75rem;
  --font-line-height-28: 2.25rem;
  
  /* 32 - 32px - 三级超大文字（超大标题） */
  --font-size-32: 2rem;
  --font-line-height-32: 2.5rem;
  
  /* 36 - 36px - 四级超大文字（展示标题） */
  --font-size-36: 2.25rem;
  --font-line-height-36: 2.75rem;
  
  /* 48 - 48px - 五级超大文字（大展示标题） */
  --font-size-48: 3rem;
  --font-line-height-48: 3.5rem;
  
  /* 56 - 56px - 六级超大文字（最大展示标题） */
  --font-size-56: 3.5rem;
  --font-line-height-56: 4rem;


  /* ========== 圆角 ========== */
  /* 圆角值从 4px 到 36px，以及圆形 */

  /* 4px 圆角 - 小按钮、小卡片 */
--radius-4: 0.25rem;
  
  /* 6px 圆角 - 中等按钮 */
--radius-6: 0.375rem;
  
  /* 8px 圆角 - 标准按钮、卡片（最常用） */
--radius-8: 0.5rem;
  
  /* 10px 圆角 - 大按钮 */
--radius-10: 0.625rem;
  
  /* 12px 圆角 - 大卡片 */
--radius-12: 0.75rem;
  
  /* 16px 圆角 - 超大卡片 */
--radius-16: 1rem;
  
  /* 20px 圆角 */
--radius-20: 1.25rem;
  
  /* 24px 圆角 */
--radius-24: 1.5rem;
  
  /* 28px 圆角 */
--radius-28: 1.75rem;
  
  /* 32px 圆角 */
--radius-32: 2rem;
  
  /* 36px 圆角 */
--radius-36: 2.25rem;
  
  /* 圆形 - 头像、圆形按钮 */
--radius-full: 62.5rem;


  /* ========== 特效样式 ========== */
  /* 阴影和模糊效果，分为 4 个层级 */

  /* 一级特效 - 轻微阴影（卡片悬浮） */
--effect-shadow-level-1-backdrop: blur(30px);
--effect-shadow-level-1-box: 0px 4px 12px 0px rgba(0,0,0,0.06), 0px -1px 2px 0px rgba(0,0,0,0.02);
  
  /* 二级特效 - 中等阴影（弹窗、下拉菜单） */
--effect-shadow-level-2-backdrop: blur(30px);
--effect-shadow-level-2-box: 0px 8px 24px 0px rgba(0,0,0,0.08), 0px -1px 10px 0px rgba(0,0,0,0.02);
  
  /* 三级特效 - 强阴影（模态框） */
--effect-shadow-level-3-backdrop: blur(30px);
--effect-shadow-level-3-box: 0px 16px 36px 0px rgba(0,0,0,0.16), 0px -1px 10px 0px rgba(0,0,0,0.04);
  
  /* 四级特效 - 最强阴影 */
--effect-shadow-level-4-backdrop: blur(30px);
--effect-shadow-level-4-box: 0px 24px 48px 0px rgba(0,0,0,0.32), 0px -1px 10px 0px rgba(0,0,0,0.04);
  
  /* 背景模糊 30px - 毛玻璃效果 */
--effect-backdrop-blur-30: blur(30px);
  
  /* 背景模糊 8px - 轻微模糊 */
--effect-backdrop-blur-4: blur(4px);


  /* ========== 间距 ========== */
  /* 基础间距单位，用于计算其他间距值 */
  --spacing-base: 0.25rem; /* 4px */


  /* ========== 边框粗细 ========== */
  /* 边框宽度值 */

  /* 粗描边 - 加粗边框（2px） */
  --border-thick: 2px;

  /* 中描边 - 标准边框（1px） */
--border-medium: 1px;
  
  /* 细描边 - 精细边框（0.5px，用于高分辨率屏幕） */
--border-thin: 0.5px;
}
`;
const markdownCss = `/* =======================================================
   Markdown 渲染样式
======================================================= */

/* =======================================================
   基础容器样式
======================================================= */
.markdown-body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  font-size: var(--font-size-16, 1rem);
  line-height: var(--line-height-normal, 1.5);
  color: var(--color-text-2, rgba(17, 25, 37, 1));
  background-color: var(--color-bg-1, rgba(255, 255, 255, 1));
  word-wrap: break-word;
  max-width: 800px;
  margin: 0 auto;
}

/* =======================================================
   标题样式
   只支持 ## 和 #### 两个层级
======================================================= */
.markdown-body h2 {
  font-size: var(--font-size-24, 1.5rem);
  font-weight: 600;
  line-height: var(--line-height-tight, 1.25);
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border-2, rgba(231, 232, 233, 1));
  color: var(--color-text-1, rgba(0, 0, 0, 1));
}

.markdown-body h4 {
  font-size: var(--font-size-18, 1.125rem);
  font-weight: 600;
  line-height: var(--line-height-tight, 1.25);
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--color-text-2, rgba(17, 25, 37, 1));
}

/* =======================================================
   段落和文本
======================================================= */
.markdown-body p {
  margin-top: 0;
  margin-bottom: 1rem;
}

.markdown-body strong {
  font-weight: 600;
  color: var(--color-text-1, rgba(0, 0, 0, 1));
}

.markdown-body em {
  font-style: italic;
}

.markdown-body a {
  color: var(--color-blue, rgba(0, 140, 255, 1));
  text-decoration: none;
  transition: color var(--transition-fast, 150ms ease);
}

.markdown-body a:hover {
  color: var(--color-blue-hover, rgba(38, 157, 255, 1));
  text-decoration: underline;
}

/* =======================================================
   列表样式
======================================================= */
.markdown-body ul,
.markdown-body ol {
  margin-top: 0;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.markdown-body li {
  margin-bottom: 0.25rem;
}

.markdown-body li::marker {
  color: var(--color-text-4, rgba(17, 25, 37, 0.65));
}

/* 有序列表序号样式 */
.markdown-body ol {
  list-style: decimal;
  counter-reset: list-counter;
}

.markdown-body ol > li {
  counter-increment: list-counter;
  list-style: decimal;
}

/* =======================================================
   表格样式
======================================================= */
.markdown-body table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: var(--font-size-14, 0.875rem);
  overflow-x: auto;
  display: block;
}

.markdown-body thead {
  background-color: var(--color-fill-2, rgba(248, 248, 248, 1));
}

.markdown-body th {
  padding: 0.75rem 1rem;
  font-weight: 600;
  text-align: left;
  border-bottom: 2px solid var(--color-border-1, rgba(219, 221, 222, 1));
  color: var(--color-text-1, rgba(0, 0, 0, 1));
  white-space: nowrap;
}

.markdown-body td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border-2, rgba(231, 232, 233, 1));
  vertical-align: top;
}

.markdown-body tbody tr:hover {
  background-color: var(--color-fill-a2, rgba(17, 25, 37, 0.03));
}

.markdown-body tbody tr:last-child td {
  border-bottom: none;
}

/* =======================================================
   代码样式
======================================================= */
.markdown-body code {
  font-family: 'SF Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace;
  font-size: 0.875em;
  padding: 0.125rem 0.375rem;
  background-color: var(--color-fill-3, rgba(243, 243, 244, 1));
  border-radius: var(--radius-4, 0.25rem);
  color: var(--color-red-text, rgba(166, 38, 42, 1));
}

.markdown-body pre {
  margin-top: 0;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: var(--color-bg-2, rgba(245, 246, 247, 1));
  border-radius: var(--radius-8, 0.5rem);
  overflow-x: auto;
  font-size: var(--font-size-14, 0.875rem);
  line-height: 1.6;
}

.markdown-body pre code {
  padding: 0;
  background-color: transparent;
  color: var(--color-text-2, rgba(17, 25, 37, 1));
  font-size: inherit;
}

/* =======================================================
   分割线样式
======================================================= */
.markdown-body hr {
  border: none;
  height: 1px;
  background-color: var(--color-border-2, rgba(231, 232, 233, 1));
  margin: 1.5rem 0;
}

/* =======================================================
   引用块样式
======================================================= */
.markdown-body blockquote {
  margin: 0 0 1rem;
  padding: 0.5rem 1rem;
  border-left: 4px solid var(--color-blue, rgba(0, 140, 255, 1));
  background-color: var(--color-blue-bg-weak, rgba(224, 241, 255, 1));
  color: var(--color-text-3, rgba(17, 25, 37, 0.85));
}

.markdown-body blockquote p:last-child {
  margin-bottom: 0;
}

/* =======================================================
   图片样式
======================================================= */
.markdown-body img {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-8, 0.5rem);
  margin: 1rem 0;
}

/* =======================================================
   Dark 模式适配
======================================================= */
[data-theme="dark"] .markdown-body {
  color: var(--color-text-2, rgba(255, 255, 255, 0.9));
  background-color: var(--color-bg-1, rgba(25, 27, 28, 1));
}

[data-theme="dark"] .markdown-body h2 {
  color: var(--color-text-1, rgba(255, 255, 255, 1));
  border-bottom-color: var(--color-border-1, rgb(64, 66, 67));
}

[data-theme="dark"] .markdown-body h4 {
  color: var(--color-text-2, rgba(255, 255, 255, 0.9));
}

[data-theme="dark"] .markdown-body strong {
  color: var(--color-text-1, rgba(255, 255, 255, 1));
}

[data-theme="dark"] .markdown-body a {
  color: var(--color-blue-text, rgba(166, 218, 255, 1));
}

[data-theme="dark"] .markdown-body a:hover {
  color: var(--color-blue-hover, rgba(0, 127, 217, 1));
}

[data-theme="dark"] .markdown-body li::marker {
  color: var(--color-text-4, rgba(255, 255, 255, 0.6));
}

[data-theme="dark"] .markdown-body thead {
  background-color: var(--color-fill-2, rgba(42, 44, 46, 1));
}

[data-theme="dark"] .markdown-body th {
  border-bottom-color: var(--color-border-1, rgb(64, 66, 67));
}

[data-theme="dark"] .markdown-body td {
  border-bottom-color: var(--color-border-2, rgba(53, 54, 55, 1));
}

[data-theme="dark"] .markdown-body tbody tr:hover {
  background-color: var(--color-fill-a2, rgba(255, 255, 255, 0.05));
}

[data-theme="dark"] .markdown-body code {
  background-color: var(--color-fill-3, rgba(52, 54, 56, 1));
  color: var(--color-red-text, rgba(255, 190, 192, 1));
}

[data-theme="dark"] .markdown-body pre {
  background-color: var(--color-bg-2, rgba(18, 19, 20, 1));
}

[data-theme="dark"] .markdown-body pre code {
  color: var(--color-text-2, rgba(255, 255, 255, 0.9));
}

[data-theme="dark"] .markdown-body hr {
  background-color: var(--color-border-2, rgba(53, 54, 55, 1));
}

[data-theme="dark"] .markdown-body blockquote {
  border-left-color: var(--color-blue, rgba(0, 149, 255, 1));
  background-color: var(--color-blue-bg-weak, rgba(0, 60, 102, 1));
  color: var(--color-text-3, rgba(255, 255, 255, 0.75));
}
`;
const promptContent = `/* =======================================================
   🤖 AI 输出格式规范
   
   版本：v1.1.0
   更新日期：2025-03-26
   更新内容：独立出 AI 格式控制提示词
=======================================================

⚠️⚠️⚠️ 重要提示 ⚠️⚠️⚠️
经过这里输出的 Markdown 内容必须严格遵守 markdown.css 和 tokens.css 样式规范！
所有样式必须使用 CSS 变量，禁止写死颜色值、字号值等！

你是一个专业的 AI 助手，输出的内容将在 AI 对话界面中渲染。你的目标是：
1. 输出结构清晰、层次分明的 Markdown 内容
2. 确保表格、列表、标题等元素正确渲染
3. 严格遵循 markdown.css 和 tokens.css 定义的样式规范
4. 使用 CSS 变量（如 var(--color-text-1)）而非硬编码值


一、标题层级规则（必须遵守）
─────────────────────────────────────────────────────

✅ 允许使用的标题级别：
- ## 主标题（必须有 1 个 emoji）
- #### 小节标题（emoji 可选）

❌ 禁止使用的标题级别：
- ### 三级标题（禁止）
- ##### 五级标题（禁止）
- ###### 六级标题（禁止）

❗ 标题格式要求：
- \`#\` 后必须有空格
- ✅ 正确：## 📋 项目背景
- ✅ 正确：#### ⚙️ 配置说明
- ❌ 错误：##📋项目背景（无空格）
- ❌ 错误：####⚙️配置说明（无空格）

📌 Emoji 使用规则：
- ## 主标题：必须有 1 个 emoji
- #### 小节标题：emoji 可选
- emoji 与文字之间要有空格


二、表格规则（必须遵守）
─────────────────────────────────────────────────────

✅ 表格格式要求：
1. 列数必须一致（表头和每行的列数相同）
2. 表头下方必须有分隔行 \`|---|---|\`
3. 禁止在表格内嵌套标题
4. 表格前后必须有空行

❌ 表格后禁止直接跟分割线：
- 表格结束后不要立即添加 \`---\`
- 如需分割，先用普通文字过渡

✅ 正确示例：
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| A   | B   | C   |
| D   | E   | F   |

这里可以添加说明文字。

❌ 错误示例：
| 列1 | 列2 |
|-----|-----|
| A   | B   | C   |  ← 列数不一致

| 列1 | 列2 |
|-----|-----|
| A   | B   |
---                         ← 表格后直接跟分割线（禁止）


三、有序列表规则（必须遵守）
─────────────────────────────────────────────────────

✅ 序号必须递增：
1. 第一步
2. 第二步
3. 第三步

❌ 禁止重复序号：
1. 第一步
1. 第二步  ← 错误：应该是 2.
1. 第三步  ← 错误：应该是 3.


四、分割线规则
─────────────────────────────────────────────────────

- 使用三个或更多 \`---\` 创建分割线
- 分割线前后必须有空行
- 表格后禁止直接跟分割线


五、代码块规则
─────────────────────────────────────────────────────

- 使用三个反引号创建代码块
- 必须指定语言标识
- ✅ 正确：\`\`\`javascript
- ❌ 错误：\`\`\`（无语言标识）


六、样式引用说明
─────────────────────────────────────────────────────

⚠️ 重要：所有输出内容的样式必须严格按照 markdown.css 文件中定义的样式规范。

样式文件位置：
- 远程地址：https://db0cwzml9gxiye.database.sankuai.com/storage/v1/object/public/public-assets/styles/markdown.css
- 本地路径：./styles/markdown.css

必须遵循的样式规范包括：
1. 标题样式：只使用 h2 和 h4 两个层级
2. 段落和文本：使用定义的字体、字号、行高
3. 列表样式：有序列表和无序列表的缩进和标记
4. 表格样式：表头背景、边框、悬停效果
5. 代码样式：行内代码和代码块的背景色、字体
6. 分割线样式：颜色和间距
7. 引用块样式：左边框和背景色
8. 链接样式：颜色和悬停效果

Dark 模式适配：
- 所有样式都支持 dark 模式切换
- 使用 CSS 变量确保主题一致性


七、完整示例
─────────────────────────────────────────────────────

## 📋 项目背景

这是项目背景描述。

#### ⚙️ 技术方案

技术方案的详细说明。

| 组件 | 用途 | 状态 |
|------|------|------|
| CSS | 样式 | 完成 |
| JS | 交互 | 进行中 |

如上表所示，项目进度良好。

1. 第一步：初始化项目
2. 第二步：安装依赖
3. 第三步：启动开发服务器

---

更多信息请参考文档。

=======================================================
*/
`;

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
