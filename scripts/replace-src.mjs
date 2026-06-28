
import fs from "fs";
import path from "path";

const [oldSrc, newSrc] = process.argv.slice(2);
if (!oldSrc || !newSrc) {
  console.log('用法：node scripts/replace-src.mjs "舊圖片網址或片段" "新圖片網址"');
  console.log('例：node scripts/replace-src.mjs "old.jpg" "/images/new-banner.jpg"');
  process.exit(1);
}

const file = path.join(process.cwd(), "public", "mirror", "index.html");
const html = fs.readFileSync(file, "utf8");
const count = html.split(oldSrc).length - 1;

if (count === 0) {
  console.log("找不到圖片 src 片段：", oldSrc);
  process.exit(0);
}

const backup = file + ".backup-" + Date.now();
fs.writeFileSync(backup, html, "utf8");

fs.writeFileSync(file, html.split(oldSrc).join(newSrc), "utf8");

console.log(`完成：已替換 ${count} 處圖片路徑`);
console.log("備份檔：", backup);
