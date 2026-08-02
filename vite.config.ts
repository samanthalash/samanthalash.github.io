import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Plugin } from "vite";

export default defineConfig({
  plugins: [react(), layoutEditorPlugin(), archiveRoutePlugin()],
});

function layoutEditorPlugin(): Plugin {
  const root = process.cwd();
  const archivedPortfolioPath = path.join(root, "src/archive/portfolio");
  const layoutPath = path.join(
    archivedPortfolioPath,
    "data/editableLayout.json",
  );
  const galleryOverridesPath = path.join(
    archivedPortfolioPath,
    "data/galleryOverrides.json",
  );
  const assetDirectory = path.join(root, "public/editor-assets");
  const galleryAssetDirectory = path.join(root, "public/gallery-assets");

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

      server.middlewares.use("/__layout-editor/galleries", async (request, response) => {
        const requestLike = request as unknown as RequestLike;
        try {
          if (requestLike.method === "GET") {
            sendJson(response, await readGalleryOverrides(galleryOverridesPath));
            return;
          }

          if (requestLike.method !== "POST") {
            response.statusCode = 405;
            response.end("Method not allowed.");
            return;
          }

          const payload = JSON.parse(await readRequestBody(requestLike)) as {
            action?: string;
            galleryId?: string;
            imageId?: string;
            assetId?: string;
            alt?: string;
            fileName?: string;
            dataUrl?: string;
          };
          const galleryId = assertGalleryId(payload.galleryId);
          const document = JSON.parse(
            await readGalleryOverrides(galleryOverridesPath),
          ) as GalleryOverrideDocument;
          const override = {
            addedImages: [],
            removedImageIds: [],
            ...document.galleries[galleryId],
          };

          if (payload.action === "upload") {
            if (!payload.fileName || !payload.dataUrl) {
              throw new Error("Missing fileName or dataUrl.");
            }

            const match = payload.dataUrl.match(
              /^data:image\/[a-zA-Z0-9.+-]+;base64,(.+)$/,
            );
            if (!match) {
              throw new Error("Only base64 image data URLs can be uploaded.");
            }

            const extension = path.extname(payload.fileName).toLowerCase() || ".png";
            const safeBaseName = createSafeBaseName(payload.fileName, extension);
            const fileName = `${safeBaseName}-${Date.now()}${extension}`;
            const galleryDirectory = path.join(galleryAssetDirectory, galleryId);
            await mkdir(galleryDirectory, { recursive: true });
            await writeFile(
              path.join(galleryDirectory, fileName),
              Buffer.from(match[1], "base64"),
            );

            override.addedImages = [
              ...override.addedImages,
              {
                id: `gallery-${galleryId}-${fileName}`,
                src: `/gallery-assets/${galleryId}/${fileName}`,
                alt: safeBaseName.replace(/-/g, " "),
              },
            ];
          } else if (payload.action === "addAsset") {
            const assetId = assertInspoAssetId(payload.assetId);
            const safeBaseName = createSafeBaseName(
              payload.alt || assetId.split("/").pop() || assetId,
              path.extname(assetId),
            );

            override.addedImages = [
              ...override.addedImages,
              {
                id: `gallery-${galleryId}-${safeBaseName}-${Date.now()}`,
                assetId,
                alt: payload.alt || safeBaseName.replace(/-/g, " "),
              },
            ];
          } else if (payload.action === "remove") {
            if (!payload.imageId) {
              throw new Error("Missing imageId.");
            }

            override.removedImageIds = Array.from(
              new Set([...override.removedImageIds, payload.imageId]),
            );
          } else {
            throw new Error("Unsupported gallery action.");
          }

          const nextDocument: GalleryOverrideDocument = {
            version: 1,
            galleries: {
              ...document.galleries,
              [galleryId]: override,
            },
          };
          const nextJson = `${JSON.stringify(nextDocument, null, 2)}\n`;
          await writeFile(galleryOverridesPath, nextJson, "utf8");
          sendJson(response, nextJson);
        } catch (error) {
          response.statusCode = 400;
          response.end(error instanceof Error ? error.message : "Gallery edit failed.");
        }
      });
    },
  };
}

function archiveRoutePlugin(): Plugin {
  const root = process.cwd();

  return {
    name: "archive-route-html",
    apply: "build",
    async closeBundle() {
      const distPath = path.join(root, "dist");
      const rootIndexPath = path.join(distPath, "index.html");
      const archivePath = path.join(distPath, "archive");
      const rootIndexHtml = await readFile(rootIndexPath, "utf8");
      const archiveIndexHtml = rootIndexHtml
        .replace(
          'content="Creative direction, brand identity, strategy, and concept portfolio for Samantha Lash."',
          'content="Design portfolio for Samantha Lash, presented as a tactile archival folder."',
        )
        .replace(
          'href="https://samanthalash.com/"',
          'href="https://samanthalash.com/archive/"',
        )
        .replace(
          'property="og:url" content="https://samanthalash.com/"',
          'property="og:url" content="https://samanthalash.com/archive/"',
        )
        .replace(
          'content="Creative direction, brand identity, strategy, and concept portfolio for Samantha Lash."',
          'content="Design portfolio for Samantha Lash, presented as a tactile archival folder."',
        );

      await mkdir(archivePath, { recursive: true });
      await writeFile(
        path.join(archivePath, "index.html"),
        archiveIndexHtml,
        "utf8",
      );
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

interface GalleryOverrideImage {
  id: string;
  src?: string;
  assetId?: string;
  alt: string;
  dedupeKey?: string;
}

interface GalleryOverride {
  addedImages: GalleryOverrideImage[];
  removedImageIds: string[];
}

interface GalleryOverrideDocument {
  version: 1;
  galleries: Record<string, Partial<GalleryOverride>>;
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

async function readGalleryOverrides(filePath: string) {
  let contents: string;
  try {
    contents = await readFile(filePath, "utf8");
  } catch {
    return `${JSON.stringify({ version: 1, galleries: {} }, null, 2)}\n`;
  }

  const parsed = JSON.parse(contents) as unknown;
  assertGalleryOverrideDocument(parsed);
  return contents;
}

function assertGalleryId(value: unknown): string {
  if (typeof value !== "string" || !/^[a-z0-9-]+$/.test(value)) {
    throw new Error("Invalid galleryId.");
  }

  return value;
}

function createSafeBaseName(fileName: string, extension: string) {
  return (
    fileName
      .replace(extension, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 48) || "gallery-image"
  );
}

function assertInspoAssetId(value: unknown): string {
  if (
    typeof value !== "string" ||
    !value.startsWith("inspo/") ||
    value.includes("..") ||
    !/\.(png|jpe?g|webp)$/i.test(value)
  ) {
    throw new Error("Invalid inspo asset id.");
  }

  return value;
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

function assertGalleryOverrideDocument(
  value: unknown,
): asserts value is GalleryOverrideDocument {
  if (!value || typeof value !== "object") {
    throw new Error("Gallery overrides must be an object.");
  }

  const document = value as { version?: unknown; galleries?: unknown };
  if (document.version !== 1 || !document.galleries) {
    throw new Error("Gallery overrides must include version 1 and galleries.");
  }
}
