import GLib from "gi://GLib";

export function fileExists(path: string) {
  return GLib.file_test(path, GLib.FileTest.EXISTS);
}

/**
 * Normalize a path to the absolute representation of the path
 * Note: This will only expand '~' if present. Path traversal is not supported
 * @param path - The path to normalize
 * @returns The normalized path
 */
export function normalizeToAbsolutePath(path: string): string {
  if (path.charAt(0) === "~") {
    return path.replace("~", GLib.get_home_dir());
  }

  return path;
}
