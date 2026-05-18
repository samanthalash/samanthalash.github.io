declare module "node:fs/promises" {
  export function mkdir(path: string, options?: { recursive?: boolean }): Promise<void>;
  export function readFile(path: string, encoding: string): Promise<string>;
  export function writeFile(
    path: string,
    data: string | Uint8Array,
    encoding?: string,
  ): Promise<void>;
}

declare module "node:path" {
  const path: {
    extname(filePath: string): string;
    join(...paths: string[]): string;
  };
  export default path;
}

declare const Buffer: {
  from(data: string, encoding: string): Uint8Array;
  concat(chunks: Uint8Array[]): { toString(encoding: string): string };
};

declare const process: {
  cwd(): string;
};
