
import fs from "fs";
import path from "path";

const file = path.join(process.cwd(), "public", "mirror", "index.html");
const html = fs.readFileSync(file, "utf8");

const imgRegex = /<img\b[^>]*?(?:src|data-src)=["']([^"']+)["'][^>]*>/gi;
let match;
let i = 0;

while ((match = imgRegex.exec(html))) {
  i++;
  const src = match[1];
  const alt = (match[0].match(/\balt=["']([^"']*)["']/i) || [,""])[1];
  console.log(`${i}. alt="${alt}"`);
  console.log(src.length > 160 ? src.slice(0, 160) + "..." : src);
  console.log("");
}

console.log(`共找到 ${i} 個 img 標籤。`);
