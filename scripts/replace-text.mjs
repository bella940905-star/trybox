
import fs from "fs";
import path from "path";

const [oldText, newText] = process.argv.slice(2);
if (!oldText || newText === undefined) {
  console.log('用法：node scripts/replace-text.mjs "原文字" "新文字"');
  console.log('例：node scripts/replace-text.mjs "試用獵人" "TryBox"');
  process.exit(1);
}

const file = path.join(process.cwd(), "public", "mirror", "index.html");
if (!fs.existsSync(file)) {
  console.error("找不到 public/mirror/index.html");
  process.exit(1);
}

const html = fs.readFileSync(file, "utf8");
const count = html.split(oldText).length - 1;

if (count === 0) {
  console.log(`找不到文字：${oldText}`);
  process.exit(0);
}

const backup = file + ".backup-" + Date.now();
fs.writeFileSync(backup, html, "utf8");

const next = html.split(oldText).join(newText);
fs.writeFileSync(file, next, "utf8");

console.log(`完成：已替換 ${count} 處`);
console.log("備份檔：", backup);
