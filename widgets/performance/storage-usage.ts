import { execAsync } from "ags/process";

export type StorageInfo = {
  used: number;
  total: number;
  percentage: number;
};

export async function getStorageUsage(): Promise<StorageInfo> {
  try {
    // Get storage info for root filesystem using df command
    const output = await execAsync(["sh", "-c", "df / | awk 'NR==2 {print $2, $3, $5}'"]);

    const [totalStr, usedStr, percentageStr] = output.trim().split(/\s+/);

    const total = parseInt(totalStr) * 1024; // Convert from KB to bytes
    const used = parseInt(usedStr) * 1024; // Convert from KB to bytes
    const percentage = parseInt(percentageStr.replace("%", ""));

    return {
      used,
      total,
      percentage,
    };
  } catch (error) {
    console.error("Failed to get storage usage:", error);
    return {
      used: 0,
      total: 0,
      percentage: 0,
    };
  }
}

export function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}
