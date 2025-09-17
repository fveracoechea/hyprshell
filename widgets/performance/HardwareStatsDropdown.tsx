import { Gtk } from "ags/gtk4";
import { execAsync } from "ags/process";
import { createPoll } from "ags/time";
import { Accessor, createComputed } from "ags";
import { getCpuTempInfo, readCpuTemp } from "./cpu-temp";
import { getCpuStats, initialCpuStats } from "./cpu-usage";
import { Dropdown } from "../../styles/components/Dropdown";

type StatProps = {
  widthRequest?: number;
  icon: string;
  value: number | Accessor<number>;
  title: string | Accessor<string>;
  label?: string | Accessor<string>;
};

function Stat(props: StatProps) {
  const { value, label = "", title, icon, widthRequest = 350 } = props;
  return (
    <box
      hexpand
      spacing={4}
      class="stats"
      halign={Gtk.Align.START}
      orientation={Gtk.Orientation.VERTICAL}
    >
      <box hexpand spacing={24}>
        <box spacing={12} hexpand halign={Gtk.Align.START}>
          <label label={icon} class="icon" />
          <label class="title" label={title} hexpand halign={Gtk.Align.START} />
        </box>
        <label class="label" label={label} halign={Gtk.Align.END} />
      </box>
      <box spacing={24} hexpand>
        <levelbar
          value={value}
          hexpand
          orientation={Gtk.Orientation.HORIZONTAL}
          halign={Gtk.Align.CENTER}
          widthRequest={widthRequest}
          heightRequest={4}
        />
      </box>
    </box>
  );
}

const interval = 3000;

export function HardwareStatsDropdown() {
  const cpuTemp = createPoll(0, interval, () => readCpuTemp() / 100);

  const cpuStats = createPoll(
    initialCpuStats,
    interval,
    (prev) => getCpuStats(prev.current),
  );

  const cpuUsage = createComputed([cpuStats], ({ current, previous }) => {
    const totalDiff = current.total - previous.total;
    const idleDiff = current.idle - previous.idle;
    return totalDiff > 0 ? (totalDiff - idleDiff) / totalDiff : 0;
  });

  const memory = createPoll("", interval, [
    "sh",
    "-c",
    `free | awk '/^Mem/ {printf("%.2f\\n", ($3/$2) * 100)}'`,
  ]).as(Number);

  return (
    <Dropdown icon="󰓅" name="Performance">
      {() => (
        <box
          hexpand
          spacing={24}
          orientation={Gtk.Orientation.VERTICAL}
        >
          <Stat
            icon=""
            title="CPU Usage"
            value={cpuUsage}
            label={createComputed(
              [cpuUsage],
              (v) => `${(v * 100).toFixed(0)}%`,
            )}
          />
          <Stat
            icon=""
            title="CPU Temperature"
            value={cpuTemp}
            label={createComputed(
              [cpuTemp],
              (t) => `${(t * 100).toFixed(0)}󰔄`,
            )}
          />
          <Stat
            icon=""
            title="Memory"
            value={memory((v) => v / 100)}
            label={memory((v) => `${v.toFixed(0)}%`)}
          />
        </box>
      )}
    </Dropdown>
  );
}
