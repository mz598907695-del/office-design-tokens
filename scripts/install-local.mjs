#!/usr/bin/env node

/**
 * 安装设计规范到本地项目
 * 
 * 使用方法：
 * node scripts/install-local.mjs <目标目录>
 * 
 * 示例：
 * node scripts/install-local.mjs ~/my-project/styles/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = process.argv[2];

if (!targetDir) {
  console.error('❌ 请指定目标目录');
  console.log('用法: node scripts/install-local.mjs <目标目录>');
  console.log('示例: node scripts/install-local.mjs ~/my-project/styles/');
  process.exit(1);
}

// 解析目标路径
const resolvedTarget = path.resolve(targetDir);

// 确保目标目录存在
if (!fs.existsSync(resolvedTarget)) {
  console.log(`📁 创建目录: ${resolvedTarget}`);
  fs.mkdirSync(resolvedTarget, { recursive: true });
}

// 要复制的文件
const files = [
  { src: '../styles/tokens.css', name: 'tokens.css' },
  { src: '../styles/markdown.css', name: 'markdown.css' },
  { src: '../styles/ai-format-prompt.md', name: 'ai-format-prompt.md' }
];

console.log('🚀 开始安装设计规范文件...\n');

for (const file of files) {
  const srcPath = path.join(__dirname, file.src);
  const destPath = path.join(resolvedTarget, file.name);
  
  try {
    const content = fs.readFileSync(srcPath, 'utf-8');
    fs.writeFileSync(destPath, content, 'utf-8');
    
    // 提取版本信息
    const versionMatch = content.match(/版本[：:]\s*(v[\d.]+)/);
    const version = versionMatch ? versionMatch[1] : '未知';
    
    console.log(`✅ ${file.name} (${version})`);
    console.log(`   📍 ${destPath}`);
  } catch (error) {
    console.error(`❌ ${file.name} 复制失败: ${error.message}`);
  }
}

console.log('\n✨ 安装完成！');
console.log('\n使用方式:');
console.log('  在编码软件中引用以下文件:');
console.log(`  - ${path.join(resolvedTarget, 'tokens.css')}`);
console.log(`  - ${path.join(resolvedTarget, 'markdown.css')}`);
console.log(`  - ${path.join(resolvedTarget, 'ai-format-prompt.md')}`);
