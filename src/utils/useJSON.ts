import path from "node:path";
import fs from "node:fs"

export const useJSON = <T>(jsonPath: string): T => {
  const filePath = path.resolve(process.cwd(), jsonPath);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}