import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const nodeBin = process.execPath;
const nextBin = path.join(
  projectRoot,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "next.cmd" : "next",
);

const assetWatcher = spawn(nodeBin, [path.join(__dirname, "generate-assets.mjs"), "--watch"], {
  cwd: projectRoot,
  stdio: "inherit",
});

const nextDev = spawn(nextBin, ["dev"], {
  cwd: projectRoot,
  stdio: "inherit",
});

function shutdown(signal) {
  assetWatcher.kill(signal);
  nextDev.kill(signal);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

assetWatcher.on("exit", (code) => {
  if (code && code !== 0) {
    shutdown("SIGTERM");
    process.exit(code);
  }
});

nextDev.on("exit", (code) => {
  assetWatcher.kill("SIGTERM");
  process.exit(code ?? 0);
});
