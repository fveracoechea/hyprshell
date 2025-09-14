import { Gtk } from "ags/gtk4";
import { execAsync } from "ags/process";
import { createPoll } from "ags/time";
import { createComputed } from "ags";
import { getCpuTempInfo } from "./cpu-temp";
import { getCpuStats, initialCpuStats } from "./cpu-usage";

export function CPU() {
  const cpuStats = createPoll(
    initialCpuStats,
    3000,
    (prev) => getCpuStats(prev.current),
  );

  const cpuUsage = createComputed((get) => {
    const { current, previous } = get(cpuStats);
    const totalDiff = current.total - previous.total;
    const idleDiff = current.idle - previous.idle;
    const usage = totalDiff > 0
      ? ((totalDiff - idleDiff) / totalDiff) * 100
      : 0;
    return `Usage: ${usage.toFixed(0)}%`;
  });

  const cpuTemp = createPoll("Temp: Loading", 3000, () => getCpuTempInfo());

  const tooltip = createComputed((get) => {
    const usage = get(cpuUsage);
    const temp = get(cpuTemp);
    return ["CPU", usage, temp].join("\n");
  });

  return (
    <box>
      <button
        class="icon-button"
        tooltipText={tooltip}
        halign={Gtk.Align.CENTER}
        onClicked={() => {
          execAsync("ghostty --class=Btop -e btop");
        }}
      >
        {""}
      </button>
    </box>
  );
}
