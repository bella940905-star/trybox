import fs from 'fs';
import path from 'path';

const project = process.cwd();
const mirrorDir = path.join(project, 'public', 'mirror');
fs.mkdirSync(mirrorDir, { recursive: true });

const srcCandidates = [
  path.join(project, 'index.html'),
  path.join(project, 'public', 'mirror', 'index.html'),
  path.join(project, 'source', 'index.html'),
];
const src = srcCandidates.find((p) => fs.existsSync(p));
if (!src) {
  console.error('找不到 index.html。請先把 SingleFile 匯出的 index.html 放到專案根目錄，或 public/mirror/index.html');
  process.exit(1);
}
const dest = path.join(mirrorDir, 'index.html');
if (src !== dest) fs.copyFileSync(src, dest);

const appDir = path.join(project, 'app');
fs.mkdirSync(appDir, { recursive: true });
fs.writeFileSync(path.join(appDir, 'page.tsx'), `import { redirect } from "next/navigation";\n\nexport default function Home() {\n  redirect("/mirror/index.html");\n}\n`, 'utf8');

const scriptsDir = path.join(project, 'scripts');
fs.mkdirSync(scriptsDir, { recursive: true });
fs.writeFileSync(path.join(scriptsDir, 'replace-text.mjs'), `import fs from 'fs';\nimport path from 'path';\n\nconst [,, from, to] = process.argv;\nif (!from || to === undefined) {\n  console.log('用法: node scripts/replace-text.mjs "原文字" "新文字"');\n  process.exit(1);\n}\nconst file = path.join(process.cwd(), 'public', 'mirror', 'index.html');\nlet html = fs.readFileSync(file, 'utf8');\nconst count = html.split(from).length - 1;\nhtml = html.split(from).join(to);\nfs.writeFileSync(file, html, 'utf8');\nconsole.log('已替換 ' + count + ' 處: ' + from + ' -> ' + to);\n`, 'utf8');

fs.writeFileSync(path.join(scriptsDir, 'find-text.mjs'), `import fs from 'fs';\nimport path from 'path';\n\nconst [,, keyword] = process.argv;\nif (!keyword) {\n  console.log('用法: node scripts/find-text.mjs "要搜尋的文字"');\n  process.exit(1);\n}\nconst file = path.join(process.cwd(), 'public', 'mirror', 'index.html');\nconst html = fs.readFileSync(file, 'utf8');\nlet pos = 0, i = 0;\nwhile ((pos = html.indexOf(keyword, pos)) !== -1 && i < 20) {\n  const start = Math.max(0, pos - 80);\n  const end = Math.min(html.length, pos + keyword.length + 80);\n  console.log('--- match ' + (i + 1) + ' @ ' + pos + ' ---');\n  console.log(html.slice(start, end));\n  pos += keyword.length;\n  i++;\n}\nif (i === 0) console.log('找不到: ' + keyword);\n`, 'utf8');

console.log('完成：首頁會導向 /mirror/index.html，並新增 scripts/find-text.mjs、scripts/replace-text.mjs');
