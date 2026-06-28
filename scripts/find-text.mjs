
import fs from "fs";
import path from "path";

const [keyword] = process.argv.slice(2);
if (!keyword) {
  console.log('用法：node scripts/find-text.mjs "要找的文字"');
  process.exit(1);
}

const file = path.join(process.cwd(), "public", "mirror", "index.html");
const html = fs.readFileSync(file, "utf8");
let pos = 0;
let count = 0;

while ((pos = html.indexOf(keyword, pos)) !== -1) {
  count++;
  const start = Math.max(0, pos - 80);
  const end = Math.min(html.length, pos + keyword.length + 80);
  console.log(`\n--- 第 ${count} 處，位置 ${pos} ---`);
  console.log(html.slice(start, end));
  pos += keyword.length;
  if (count >= 20) {
    console.log("\n只顯示前 20 筆。");
    break;
  }
}

if (count === 0) console.log("找不到：", keyword);
else console.log(`\n共找到至少 ${count} 筆。`);
