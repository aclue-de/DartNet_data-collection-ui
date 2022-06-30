import { config } from "dotenv";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

export default function loadServerEnv() {
  const fileName = fileURLToPath(import.meta.url);
  const dirName = dirname(fileName);
  config({
    path: path.resolve(dirName, "../server.env"),
  });
}
