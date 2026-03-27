#!/usr/bin/env node

/**
 * 上传 CSS 文件到 Supabase Storage
 * 
 * 使用方法：
 * 1. 配置 SUPABASE_URL 和 SUPABASE_ANON_KEY
 * 2. 运行: node scripts/upload-css-to-supabase.mjs
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =======================================================
// 配置 - 请替换为实际的配置
// =======================================================
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://db0cwzml9gxiye.database.sankuai.com';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
const BUCKET = 'public-assets';

// =======================================================
// 文件配置
// =======================================================
const files = [
  {
    localPath: path.join(__dirname, '../styles/tokens.css'),
    remotePath: 'styles/tokens.css',
    name: 'tokens.css',
    contentType: 'text/css'
  },
  {
    localPath: path.join(__dirname, '../styles/markdown.css'),
    remotePath: 'styles/markdown.css',
    name: 'markdown.css',
    contentType: 'text/css'
  },
  {
    localPath: path.join(__dirname, '../styles/ai-format-prompt.md'),
    remotePath: 'styles/ai-format-prompt.md',
    name: 'ai-format-prompt.md',
    contentType: 'text/markdown'
  }
];

// =======================================================
// 上传函数
// =======================================================
async function uploadFiles() {
  if (!SUPABASE_ANON_KEY) {
    console.error('❌ 错误: 请设置 SUPABASE_ANON_KEY 环境变量');
    console.log('使用方法: SUPABASE_ANON_KEY=your_key node scripts/upload-css-to-supabase.mjs');
    process.exit(1);
  }
  
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  console.log('🚀 开始上传文件到 Supabase Storage...\n');
  
  for (const file of files) {
    console.log(`📤 上传 ${file.name}...`);
    
    try {
      // 读取文件内容
      const content = fs.readFileSync(file.localPath, 'utf-8');
      
      // 提取版本信息
      const versionMatch = content.match(/版本[：:]\s*(v[\d.]+)/);
      const version = versionMatch ? versionMatch[1] : '未知';
      
      // 上传文件
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .upload(file.remotePath, content, {
          contentType: file.contentType || 'text/css',
          upsert: true
        });
      
      if (error) {
        console.error(`   ❌ 失败: ${error.message}`);
      } else {
        console.log(`   ✅ 成功 (${version})`);
        console.log(`   📝 URL: ${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${file.remotePath}\n`);
      }
      
    } catch (error) {
      console.error(`   ❌ 错误: ${error.message}\n`);
    }
  }
  
  console.log('✨ 上传完成！');
}

// =======================================================
// 执行上传
// =======================================================
uploadFiles();
