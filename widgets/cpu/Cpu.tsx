import { Gtk } from "ags/gtk4"
import { exec, execAsync } from "ags/process"

// Parse /proc/stat for aggregate and per-core times
function readProcStat(): { total: number; idle: number; perCore: { total: number; idle: number }[] } {
  const lines = exec("cat /proc/stat").split("\n")
  const cpuLine = lines.find(l => l.startsWith("cpu "))
  const coreLines = lines.filter(l => /^cpu\d+ /.test(l))
  const parse = (l: string) => {
    const parts = l.trim().split(/\s+/).slice(1).map(Number)
    const [user, nice, system, idle, iowait, irq, softirq, steal] = parts
    const idleAll = idle + iowait
    const nonIdle = user + nice + system + irq + softirq + steal
    return { total: idleAll + nonIdle, idle: idleAll }
  }
  const agg = cpuLine ? parse(cpuLine) : { total: 0, idle: 0 }
  return {
    total: agg.total,
    idle: agg.idle,
    perCore: coreLines.map(parse),
  }
}

async function readTemps(): Promise<string[]> {
  try {
    const out = await execAsync("sensors 2>/dev/null | grep -E '^(Package id|Tctl|Tdie|Core [0-9]+)'")
    return out
      .split("\n")
      .filter(Boolean)
      .map(l => l.replace(/\s+/g, " ").trim())
  } catch {
    return []
  }
}

function formatPercent(p: number) {
  return p.toFixed(1).padStart(5, " ")
}

function buildTooltip(state: {
  avg: number
  perCore: number[]
  loadAvg: string
  temps: string[]
  freq: string
  topLines: string[]
}) {
  const coreLines = state.perCore
    .map((v, i) => `Core ${i.toString().padStart(2, "0")}: ${formatPercent(v)}%`)
    .join("\n")
  const temps = state.temps.length ? "\nTemps:\n" + state.temps.join("\n") : ""
  const freq = state.freq ? `Freq: ${state.freq}\n` : ""
  const top = state.topLines.length ? "\nTop CPU:\n" + state.topLines.join("\n") : ""
  return `CPU Avg: ${state.avg.toFixed(1)}%\n${freq}LoadAvg: ${state.loadAvg}\n${coreLines}${temps}${top}`
}

export function CPU() {
  let prev = readProcStat()
  let tooltip = "CPU: collecting…"

  const button = (
    <button
      class="icon-button"
      halign={Gtk.Align.CENTER}
      tooltip_text={() => tooltip}
      onClicked={() => {
        execAsync("ghostty --class=Btop -e btop")
      }}
    >
      {""}
    </button>
  )

  const intervalMs = 2000
  let alive = true
  const loop = async () => {
    while (alive) {
      try {
        const cur = readProcStat()
        const totalDiff = cur.total - prev.total
        const idleDiff = cur.idle - prev.idle
        const avg = totalDiff > 0 ? (1 - idleDiff / totalDiff) * 100 : 0
        const perCore = cur.perCore.map((c, idx) => {
          const pPrev = prev.perCore[idx]
          if (!pPrev) return 0
          const tDiff = c.total - pPrev.total
          const iDiff = c.idle - pPrev.idle
          return tDiff > 0 ? (1 - iDiff / tDiff) * 100 : 0
        })

        const loadAvg = exec("cat /proc/loadavg").split(" ").slice(0, 3).join(" ")

        let freq = ""
        try {
          freq = (
            exec("grep 'cpu MHz' /proc/cpuinfo | head -n1 | awk -F: '{print $2}'").trim() +
            " MHz"
          ).trim()
        } catch {}

        let topLines: string[] = []
        try {
          const ps = exec("ps -eo pcpu,comm --no-headers --sort=-pcpu | head -n3")
          topLines = ps
            .split("\n")
            .filter(Boolean)
            .map(l => {
              const [pcpu, ...rest] = l.trim().split(/\s+/)
              return `${pcpu.padStart(5, " ")}% ${rest.join(" ")}`
            })
        } catch {}

        const temps = await readTemps()

        tooltip = buildTooltip({ avg, perCore, loadAvg, temps, freq, topLines })
        prev = cur
      } catch (e) {
        tooltip = "CPU: error"
      }
      await new Promise(r => setTimeout(r, intervalMs))
    }
  }
  loop()

  // @ts-ignore provided by runtime
  onCleanup(() => {
    alive = false
  })

  return <box>{button}</box>
}
