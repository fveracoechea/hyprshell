import { readFile, readdir } from "fs/promises"
import { createPoll } from "ags/time"
import { createComputed } from "ags"

// Detect and read CPU temperature without classes.
// Exposed helpers:
//  - getCpuTempString(): Promise<string>
//  - createCpuTempPoll(interval?): poll signal returning formatted string
//  - useCpuTempTooltip(interval?): computed for tooltip (mirrors CPU usage pattern)

type SensorPath = {
  input: string
  label?: string
}

async function listHwmon(): Promise<string[]> {
  try {
    const dirs = await readdir("/sys/class/hwmon")
    return dirs.map((d) => `/sys/class/hwmon/${d}`)
  } catch {
    return []
  }
}

async function detectCpuSensor(): Promise<SensorPath | null> {
  const candidates = /k10temp|coretemp|zenpower|acpitz/i
  for (const dir of await listHwmon()) {
    try {
      const name = await readFile(`${dir}/name`, "utf8")
      if (!candidates.test(name)) continue

      const files = await readdir(dir)
      const tempInputs = files.filter((f) => /^temp\d+_input$/.test(f))
      let fallback: SensorPath | null = null
      for (const f of tempInputs) {
        const base = f.replace(/_input$/, "")
        let label: string | undefined
        try {
          label = (await readFile(`${dir}/${base}_label`, "utf8")).trim()
        } catch {}
        if (label && /(tctl|package|cpu)/i.test(label)) {
            return { input: `${dir}/${f}`, label }
        }
        if (!fallback) fallback = { input: `${dir}/${f}`, label }
      }
      if (fallback) return fallback
    } catch {
      continue
    }
  }
  // Fallback thermal zone
  try {
    await readFile("/sys/class/thermal/thermal_zone0/temp", "utf8")
    return { input: "/sys/class/thermal/thermal_zone0/temp" }
  } catch {}
  return null
}

let sensorPromise: Promise<SensorPath | null> | null = null
function getSensor(): Promise<SensorPath | null> {
  if (!sensorPromise) sensorPromise = detectCpuSensor()
  return sensorPromise
}

async function readTempMilliC(path: string): Promise<number | null> {
  try {
    const raw = await readFile(path, "utf8")
    const v = parseInt(raw.trim(), 10)
    return Number.isFinite(v) ? v : null
  } catch {
    return null
  }
}

export async function getCpuTempString(): Promise<string> {
  const sensor = await getSensor()
  if (!sensor) return "CPU Temp: N/A"
  const milli = await readTempMilliC(sensor.input)
  if (milli == null) return "CPU Temp: N/A"
  const c = milli >= 1000 ? milli / 1000 : milli
  return `CPU Temp: ${c.toFixed(1)}°C`
}

export function createCpuTempPoll(interval = 5000) {
  return createPoll("CPU Temp: ...", interval, async () => await getCpuTempString())
}

export function useCpuTempTooltip(interval = 5000) {
  const polled = createCpuTempPoll(interval)
  return createComputed((get) => get(polled))
}
