import GLib from "gi://GLib";
import Gio from "gi://Gio";

const PRIORITY_SENSORS = [
  "coretemp", // Intel
  "k10temp", // AMD Ryzen
];

const HWMON_PATH = "/sys/class/hwmon";
const THERMAL_PATH = "/sys/class/thermal";
const THERMAL_FALLBACK = "/sys/class/thermal/thermal_zone0/temp";

/**
 * Checks if a file exists and is readable
 */
function fileExists(path: string): boolean {
  try {
    const file = Gio.File.new_for_path(path);
    return file.query_exists(null);
  } catch {
    return false;
  }
}

/**
 * Reads directory contents
 */
function readDir(path: string): string[] {
  try {
    const file = Gio.File.new_for_path(path);
    const enumerator = file.enumerate_children(
      "standard::name",
      Gio.FileQueryInfoFlags.NONE,
      null,
    );
    const entries: string[] = [];

    let info;
    while ((info = enumerator.next_file(null)) !== null) {
      entries.push(info.get_name());
    }

    enumerator.close(null);
    return entries;
  } catch {
    return [];
  }
}

/**
 * Validates if sensor path exists and is readable
 */
function isValidSensor(path: string): boolean {
  try {
    const [success] = GLib.file_get_contents(path);
    return success;
  } catch {
    return false;
  }
}

/**
 * Reads and returns trimmed file content
 */
function readFileContent(path: string): string | undefined {
  try {
    const [success, bytes] = GLib.file_get_contents(path);
    if (!success || !bytes) return undefined;
    return new TextDecoder("utf-8").decode(bytes).trim();
  } catch {
    return undefined;
  }
}

/**
 * Finds a specific hardware monitor sensor by chip name
 */
function findHwmonSensor(chipName: string): string | undefined {
  if (!fileExists(HWMON_PATH)) return undefined;

  const entries = readDir(HWMON_PATH);

  for (const dirname of entries) {
    const nameFile = `${HWMON_PATH}/${dirname}/name`;
    const name = readFileContent(nameFile);

    if (name === chipName) {
      const tempPath = `${HWMON_PATH}/${dirname}/temp1_input`;
      if (isValidSensor(tempPath)) {
        return tempPath;
      }
    }
  }

  return undefined;
}

/**
 * Auto-discovers the best CPU temperature sensor
 */
export function discoverCpuTempSensor(): string | undefined {
  // Try priority sensors first
  for (const sensorName of PRIORITY_SENSORS) {
    const sensor = findHwmonSensor(sensorName);
    if (sensor && isValidSensor(sensor)) {
      return sensor;
    }
  }

  // Fallback to thermal zone
  if (isValidSensor(THERMAL_FALLBACK)) {
    return THERMAL_FALLBACK;
  }

  return undefined;
}

/**
 * Reads CPU temperature from sensor file
 */
export function readCpuTemp(sensorPath?: string): number {
  const path = sensorPath || discoverCpuTempSensor();
  if (!path) return 0;

  try {
    const [success, tempBytes] = GLib.file_get_contents(path);
    if (!success || !tempBytes) return 0;

    const tempInfo = new TextDecoder("utf-8").decode(tempBytes);
    const tempValueMillidegrees = parseInt(tempInfo.trim(), 10);
    return tempValueMillidegrees / 1000;
  } catch (error) {
    console.error("Error reading CPU temperature:", error);
    return 0;
  }
}

/**
 * Gets detailed CPU temperature info as string
 */
export function getCpuTempInfo(sensorPath?: string): string {
  const resolvedPath = sensorPath || discoverCpuTempSensor();
  const temp = readCpuTemp(resolvedPath);
  if (temp === 0) return "Temperature: N/A";
  return `Temperature: ${temp.toFixed(0)}°C`;
}
