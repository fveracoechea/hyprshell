import { Gtk } from "ags/gtk4";
import GTop from "gi://GTop";
import { execAsync } from "ags/process";
import { createPoll } from "ags/time";
import { createComputed } from "ags";

type CpuStats = {
  total: number;
  idle: number;
};

const initialStats: CpuStats = { total: 0, idle: 0 };

export function CPU() {
  const cpuStats = createPoll(initialStats, 5000, (prev: CpuStats) => {
    const stats = new GTop.glibtop_cpu();
    GTop.glibtop_get_cpu(stats);
    return {
      total: stats.total - prev.total,
      idle: stats.idle - prev.idle,
    };
  });

  const tooltip = createComputed((get) => {
    const { total, idle } = get(cpuStats);
    const usage = total > 0 ? ((total - idle) / total) * 100 : 0;
    return `CPU Usage: ${usage.toFixed(1)}%`;
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
