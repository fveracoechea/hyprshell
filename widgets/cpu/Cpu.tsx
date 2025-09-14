import { Gtk } from "ags/gtk4";
import GTop from "gi://GTop";
import { execAsync } from "ags/process";
import { createPoll } from "ags/time";
import { createComputed } from "ags";
import { useCpuTempTooltip } from "./cputemp";

type CpuStats = {
  current: {
    total: number;
    idle: number;
  };
  previous: {
    total: number;
    idle: number;
  };
};

function useCPUTooltip() {
  const initialStats: CpuStats = {
    current: { total: 0, idle: 0 },
    previous: { total: 0, idle: 0 },
  };

  const cpuStats = createPoll(initialStats, 3000, (prev: CpuStats) => {
    const stats = new GTop.glibtop_cpu();
    GTop.glibtop_get_cpu(stats);
    return {
      current: {
        total: stats.total as number,
        idle: stats.idle as number,
      },
      previous: {
        total: prev.current.total,
        idle: prev.current.idle,
      },
    };
  });

  return createComputed((get) => {
    const { current, previous } = get(cpuStats);
    const totalDiff = current.total - previous.total;
    const idleDiff = current.idle - previous.idle;
    const usage = totalDiff > 0
      ? ((totalDiff - idleDiff) / totalDiff) * 100
      : 0;

    return `CPU Usage: ${usage.toFixed(0)}%`;
  });
}

export function CPU() {
  const usageTooltip = useCPUTooltip();
  const tempTooltip = useCpuTempTooltip();
  const tooltip = createComputed((get) => `${get(usageTooltip)}\n${get(tempTooltip)}`);
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
