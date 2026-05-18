import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Plugin } from "vite";

export default defineConfig({
  plugins: [react(), layoutEditorPlugin()],
});

function layoutEditorPlugin(): Plugin {
  const root = process.cwd();
  const layoutPath = path.join(root, "src/data/editableLayout.json");
  const assetDirectory = path.join(root, "public/editor-assets");

  return {
    name: "layout-editor-dev-api",
    configureServer(server) {
      server.middlewares.use("/__layout-editor/layout", async (request, response) => {
        const requestLike = request as unknown as RequestLike;
        try {
          if (requestLike.method === "GET") {
            sendJson(response, await readFile(layoutPath, "utf8"));
            return;
          }

          if (requestLike.method === "PUT") {
            const body = await readRequestBody(requestLike);
            const parsed = JSON.parse(body) as unknown;
            assertLayoutDocument(parsed);
            await writeFile(layoutPath, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
            sendJson(response, JSON.stringify({ ok: true }));
            return;
          }

          response.statusCode = 405;
          response.end("Method not allowed.");
        } catch (error) {
          response.statusCode = 400;
          response.end(error instanceof Error ? error.message : "Layout save failed.");
        }
      });

      server.middlewares.use("/__layout-editor/assets", async (request, response) => {
        const requestLike = request as unknown as RequestLike;
        try {
          if (requestLike.method !== "POST") {
            response.statusCode = 405;
            response.end("Method not allowed.");
            return;
          }

          const payload = JSON.parse(await readRequestBody(requestLike)) as {
            fileName?: string;
            dataUrl?: string;
          };
          if (!payload.fileName || !payload.dataUrl) {
            throw new Error("Missing fileName or dataUrl.");
          }

          const match = payload.dataUrl.match(/^data:image\/[a-zA-Z0-9.+-]+;base64,(.+)$/);
          if (!match) {
            throw new Error("Only base64 image data URLs can be uploaded.");
          }

          const extension = path.extname(payload.fileName).toLowerCase() || ".png";
          const safeName = payload.fileName
            .replace(extension, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")
            .slice(0, 48);
          const fileName = `${safeName || "layout-image"}-${Date.now()}${extension}`;
          await mkdir(assetDirectory, { recursive: true });
          await writeFile(
            path.join(assetDirectory, fileName),
            Buffer.from(match[1], "base64"),
          );
          sendJson(response, JSON.stringify({ src: `/editor-assets/${fileName}` }));
        } catch (error) {
          response.statusCode = 400;
          response.end(error instanceof Error ? error.message : "Asset upload failed.");
        }
      });
    },
  };
}

interface RequestLike {
  method?: string;
  on(event: "data", callback: (chunk: Uint8Array) => void): void;
  on(event: "end", callback: () => void): void;
  on(event: "error", callback: (error: Error) => void): void;
}

interface ResponseLike {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(data?: string): void;
}

function readRequestBody(request: RequestLike) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf8"));
    });
    request.on("error", reject);
  });
}

function sendJson(response: ResponseLike, data: string) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(data);
}

function assertLayoutDocument(value: unknown): asserts value is object {
  if (!value || typeof value !== "object") {
    throw new Error("Layout must be an object.");
  }

  const document = value as { version?: unknown; pages?: unknown };
  if (document.version !== 1 || !Array.isArray(document.pages)) {
    throw new Error("Layout must include version 1 and a pages array.");
  }
}
