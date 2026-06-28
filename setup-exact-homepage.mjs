
import fs from "fs";
import path from "path";

const root = process.cwd();
const mirrorFile = path.join(root, "public", "mirror", "index.html");
const pageFile = path.join(root, "app", "page.tsx");

if (!fs.existsSync(mirrorFile)) {
  console.error("找不到 public/mirror/index.html");
  console.error("請確認你的 SingleFile HTML 放在：public/mirror/index.html");
  process.exit(1);
}

if (fs.existsSync(pageFile)) {
  const backup = pageFile + ".backup-" + Date.now();
  fs.copyFileSync(pageFile, backup);
  console.log("已備份原本 app/page.tsx：", backup);
}

const page = `import { redirect } from "next/navigation";

export default function Home() {
  redirect("/mirror/index.html");
}
`;

fs.writeFileSync(pageFile, page, "utf8");
console.log("完成：首頁 / 已設定為跳轉到 /mirror/index.html");
console.log("請執行：npm run dev");
console.log("然後打開：http://localhost:3000");
